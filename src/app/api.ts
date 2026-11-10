/**
 * API client for the CLPS Lunar Landing Site Navigator backend.
 * Connects the React UI to the FastAPI SPICE/DEM service.
 */

export interface BackendSite {
  id: string;
  name: string;
  lat: number;
  lon: number;
  height_km: number;
  source: string;
  has_terrain: boolean;
}

export interface SummaryMetrics {
  longest_darkness_hours: number;
  longest_earth_gap_hours: number;
  mean_vertical_power_factor: number;
  best_vertical_panel_azimuth_deg: number;
  pct_sunlit: number;
  pct_earth_visible: number;
  max_sun_el_deg: number;
  mean_sun_el_when_lit_deg: number;
  mean_horizontal_power_factor: number;
}

export interface QueryPayload {
  site_id?: string;
  lat?: number;
  lon?: number;
  height_km?: number;
  start_utc?: string; // ISO e.g. "2027-03-01T00:00:00"
  hours?: number;
  step_min?: number;
  now_utc?: string;
  use_terrain?: boolean;
}

export interface TimeseriesResponse {
  step_min: number;
  start_utc: string;
  et: number[];
  sun_az: number[];
  sun_el: number[];
  sun_up: boolean[];
  earth_az: number[];
  earth_el: number[];
  earth_up: boolean[];
  summary: SummaryMetrics;
}

export interface VisibilityWindow {
  start: string;
  end: string;
  visible: boolean;
  hours: number;
}

export interface CurrentVisibilityStatus {
  visible: boolean;
  hours_until_change: number;
  open_ended: boolean;
}

export interface WindowsResponse {
  sun: VisibilityWindow[];
  earth: VisibilityWindow[];
  sun_now: CurrentVisibilityStatus;
  earth_now: CurrentVisibilityStatus;
  summary: SummaryMetrics;
}

export interface HorizonResponse {
  site_id?: string;
  lat?: number;
  lon?: number;
  elevation_deg_by_azimuth: number[];
}

export interface ScenarioComparisonResult extends SummaryMetrics {
  site_id?: string;
  lat: number;
  lon: number;
  start_utc: string;
}

export interface SweepQueryPayload extends QueryPayload {
  count?: number;
  step_days?: number;
}

export interface SweepResultItem extends SummaryMetrics {
  start_utc: string;
}

export interface SweepResponse {
  site_id?: string;
  lat: number;
  lon: number;
  results: SweepResultItem[];
}

export interface ChartDataPoint {
  time: string;
  solar: number;
  earth: number;
  illumination: number;
  sun_up: boolean;
  earth_up: boolean;
}

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '/api';

/**
 * Checks if the backend service is reachable.
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/sites`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Fetch catalog sites from backend.
 */
export async function fetchBackendSites(): Promise<BackendSite[]> {
  const res = await fetch(`${API_BASE}/sites`);
  if (!res.ok) throw new Error(`Failed to fetch sites: ${res.statusText}`);
  return res.json();
}

/**
 * Fetch high-resolution time series for a site or coordinates.
 */
export async function fetchTimeseries(payload: QueryPayload): Promise<TimeseriesResponse> {
  const res = await fetch(`${API_BASE}/timeseries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      start_utc: '2027-03-01T00:00:00',
      hours: 72,
      step_min: 15,
      use_terrain: true,
      ...payload,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Timeseries calculation failed');
  }
  return res.json();
}

/**
 * Fetch visibility windows and current rise/set status.
 */
export async function fetchWindows(payload: QueryPayload): Promise<WindowsResponse> {
  const res = await fetch(`${API_BASE}/windows`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      start_utc: '2027-03-01T00:00:00',
      hours: 72,
      step_min: 15,
      use_terrain: true,
      ...payload,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Windows calculation failed');
  }
  return res.json();
}

/**
 * Fetch 360-degree terrain horizon elevations for a site or coordinate.
 */
export async function fetchHorizon(siteId?: string, lat?: number, lon?: number): Promise<HorizonResponse> {
  const url = siteId
    ? `${API_BASE}/horizon/${encodeURIComponent(siteId)}`
    : `${API_BASE}/horizon?lat=${lat}&lon=${lon}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch horizon: ${res.statusText}`);
  return res.json();
}

/**
 * Compare up to 12 scenarios.
 */
export async function compareScenarios(queries: QueryPayload[]): Promise<ScenarioComparisonResult[]> {
  const res = await fetch(`${API_BASE}/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(queries),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Scenario comparison failed');
  }
  return res.json();
}

/**
 * Perform multi-lunar-cycle sweep over a year to evaluate seasonal trends.
 */
export async function fetchSweep(payload: SweepQueryPayload): Promise<SweepResponse> {
  const res = await fetch(`${API_BASE}/sweep`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      start_utc: '2027-01-01T00:00:00',
      count: 12,
      step_days: 29.53,
      hours: 72,
      step_min: 60,
      use_terrain: true,
      ...payload,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Sweep calculation failed');
  }
  return res.json();
}

/**
 * Converts backend TimeseriesResponse into chart data points suitable for Recharts.
 */
export function timeseriesToChartData(ts: TimeseriesResponse, maxPoints = 50): ChartDataPoint[] {
  const total = ts.sun_el.length;
  if (!total) return [];

  const step = Math.max(1, Math.floor(total / maxPoints));
  const points: ChartDataPoint[] = [];

  const baseDate = new Date(ts.start_utc.replace('Z', ''));

  for (let i = 0; i < total; i += step) {
    const elapsedMinutes = i * ts.step_min;
    const pointDate = new Date(baseDate.getTime() + elapsedMinutes * 60000);
    const dayStr = `D${Math.floor(elapsedMinutes / (24 * 60)) + 1}`;
    const hours = String(pointDate.getUTCHours()).padStart(2, '0');
    const mins = String(pointDate.getUTCMinutes()).padStart(2, '0');
    const timeLabel = `${dayStr} ${hours}:${mins}`;

    const solarEl = Math.round(ts.sun_el[i] * 10) / 10;
    const earthEl = Math.round(ts.earth_el[i] * 10) / 10;
    // Illumination factor roughly between 0% and 100% when sun_up
    const illumination = ts.sun_up[i] ? Math.min(100, Math.round(Math.max(10, solarEl * 5 + 40))) : 0;

    points.push({
      time: timeLabel,
      solar: solarEl,
      earth: earthEl,
      illumination,
      sun_up: ts.sun_up[i],
      earth_up: ts.earth_up[i],
    });
  }

  return points;
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: 'public' | 'researcher' | 'mission' | 'admin';
  organization?: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export interface SavedScenarioItem {
  id: number;
  name: string;
  site_id: string;
  lat?: number;
  lon?: number;
  start_utc: string;
  hours: number;
  summary?: SummaryMetrics;
  notes?: string;
  created_at: string;
}

export function getAuthToken(): string | null {
  return localStorage.getItem('lunaris_jwt_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('lunaris_jwt_token', token);
}

export function getStoredUser(): UserProfile | null {
  const u = localStorage.getItem('lunaris_auth_user');
  return u ? JSON.parse(u) : null;
}

export function setStoredUser(user: UserProfile) {
  localStorage.setItem('lunaris_auth_user', JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem('lunaris_jwt_token');
  localStorage.removeItem('lunaris_auth_user');
}

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
  role: string;
  organization?: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Registration failed');
  }
  const auth = await res.json();
  setAuthToken(auth.token);
  setStoredUser(auth.user);
  return auth;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Invalid email or password');
  }
  const auth = await res.json();
  setAuthToken(auth.token);
  setStoredUser(auth.user);
  return auth;
}

export async function fetchCurrentUser(): Promise<UserProfile | null> {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      clearAuth();
      return null;
    }
    const data = await res.json();
    const user: UserProfile = {
      id: Number(data.sub),
      email: data.email,
      name: data.name,
      role: data.role,
      organization: data.organization,
    };
    setStoredUser(user);
    return user;
  } catch {
    return getStoredUser();
  }
}

export async function saveBackendScenario(data: {
  name: string;
  site_id: string;
  lat?: number;
  lon?: number;
  start_utc: string;
  hours: number;
  summary?: any;
  notes?: string;
}): Promise<{ id: number }> {
  const token = getAuthToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/scenarios`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Failed to save scenario');
  }
  return res.json();
}

export async function fetchBackendScenarios(): Promise<SavedScenarioItem[]> {
  const token = getAuthToken();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/scenarios`, { headers });
  if (!res.ok) throw new Error('Failed to fetch scenarios');
  return res.json();
}

export async function deleteBackendScenario(id: number): Promise<void> {
  const token = getAuthToken();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/scenarios/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!res.ok) throw new Error('Failed to delete scenario');
}

/**
 * Downloads a real CSV file from TimeseriesResponse.
 */
export function downloadTimeseriesCsv(ts: TimeseriesResponse, siteName = 'lunar_site') {
  const headers = [
    'step_index',
    'elapsed_minutes',
    'utc_estimated',
    'sun_azimuth_deg',
    'sun_elevation_deg',
    'sun_visible',
    'earth_azimuth_deg',
    'earth_elevation_deg',
    'earth_visible',
  ];

  const baseDate = new Date(ts.start_utc.replace('Z', ''));
  const rows = ts.sun_el.map((_, i) => {
    const elapsedMinutes = i * ts.step_min;
    const dateStr = new Date(baseDate.getTime() + elapsedMinutes * 60000).toISOString();
    return [
      i,
      elapsedMinutes,
      dateStr,
      ts.sun_az[i].toFixed(3),
      ts.sun_el[i].toFixed(3),
      ts.sun_up[i] ? 1 : 0,
      ts.earth_az[i].toFixed(3),
      ts.earth_el[i].toFixed(3),
      ts.earth_up[i] ? 1 : 0,
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${siteName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_ephemeris.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

