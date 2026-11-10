export type Site = {
  id: string;
  backendId?: string;
  name: string;
  region: string;
  type: "Candidate" | "Historic";
  lat: string;
  lng: string;
  numLat?: number;
  numLon?: number;
  solar: number;
  earth: number;
  blackout: number;
  note: string;
  hasTerrain?: boolean;
};

export const sites: Site[] = [
  {
    id: "connecting_ridge",
    backendId: "connecting_ridge",
    name: "Connecting Ridge",
    region: "Shackleton–de Gerlache",
    type: "Candidate",
    lat: "89.44° S",
    lng: "222.90° E",
    numLat: -89.44,
    numLon: 222.9,
    solar: 76.5,
    earth: 51.0,
    blackout: 8.5,
    note: "High point near Shackleton in the 80m LOLA DEM. Extended solar visibility.",
    hasTerrain: true,
  },
  {
    id: "malapert",
    backendId: "malapert",
    name: "Malapert Massif",
    region: "South Pole–Aitken",
    type: "Candidate",
    lat: "85.99° S",
    lng: "0.12° E",
    numLat: -85.99,
    numLon: 0.12,
    solar: 48.1,
    earth: 100.0,
    blackout: 3.8,
    note: "Prominent highland ~4.8 km high with continuous direct line-of-sight to Earth.",
    hasTerrain: true,
  },
  {
    id: "shackleton",
    backendId: "connecting_ridge",
    name: "Shackleton Rim",
    region: "Lunar South Pole",
    type: "Candidate",
    lat: "89.90° S",
    lng: "0.00° E",
    numLat: -89.90,
    numLon: 0.0,
    solar: 82,
    earth: 68,
    blackout: 7.2,
    note: "Elevated rim segments with extended illumination potential.",
    hasTerrain: true,
  },
  {
    id: "ridge",
    backendId: "connecting_ridge",
    name: "Connecting Ridge (Candidate)",
    region: "Shackleton–de Gerlache",
    type: "Candidate",
    lat: "89.45° S",
    lng: "222.69° E",
    numLat: -89.45,
    numLon: 222.69,
    solar: 88,
    earth: 62,
    blackout: 9.1,
    note: "Narrow elevated corridor between major crater systems.",
    hasTerrain: true,
  },
  {
    id: "nobile",
    name: "Nobile Region",
    region: "South Polar Highlands",
    type: "Candidate",
    lat: "85.20° S",
    lng: "45.00° E",
    numLat: -85.20,
    numLon: 45.0,
    solar: 64,
    earth: 73,
    blackout: 11.4,
    note: "Scientifically compelling terrain near permanently shadowed areas.",
    hasTerrain: false,
  },
  {
    id: "apollo11",
    backendId: "apollo11",
    name: "Apollo 11 (Tranquility Base)",
    region: "Mare Tranquillitatis",
    type: "Historic",
    lat: "0.67° N",
    lng: "23.47° E",
    numLat: 0.67416,
    numLon: 23.47314,
    solar: 50.0,
    earth: 98.0,
    blackout: 2.1,
    note: "Historic first crewed lunar landing site, July 1969. NASA NSSDCA sourced coordinates.",
    hasTerrain: false,
  },
  {
    id: "apollo15",
    backendId: "apollo15",
    name: "Apollo 15 (Hadley Rille)",
    region: "Mare Imbrium",
    type: "Historic",
    lat: "26.13° N",
    lng: "3.63° E",
    numLat: 26.13239,
    numLon: 3.6333,
    solar: 50.0,
    earth: 97.0,
    blackout: 2.3,
    note: "First J-mission with Lunar Roving Vehicle near Hadley Rille.",
    hasTerrain: false,
  },
  {
    id: "apollo17",
    backendId: "apollo17",
    name: "Apollo 17 (Taurus–Littrow)",
    region: "Taurus–Littrow",
    type: "Historic",
    lat: "20.19° N",
    lng: "30.77° E",
    numLat: 20.1908,
    numLon: 30.77168,
    solar: 50.0,
    earth: 96.0,
    blackout: 2.7,
    note: "Final Apollo lunar surface mission with extensive geological sampling.",
    hasTerrain: false,
  },
];

export const timeData = Array.from({ length: 13 }, (_, i) => ({
  time: `${String(i * 2).padStart(2, "0")}:00`,
  solar: Math.max(-5, Math.round(18 * Math.sin((i / 12) * Math.PI) + 2)),
  earth: Math.round(11 + 5 * Math.sin((i / 12) * Math.PI * 2 + 0.8)),
  illumination: Math.round(38 + 55 * Math.max(0, Math.sin((i / 12) * Math.PI))),
}));

export const scenarios = [
  {
    name: "Ares Prime",
    site: "Shackleton Rim",
    date: "2030-08-18",
    solar: "18.4°",
    light: "19.6 h",
    earth: "16.8 h",
    blackout: "7.2 h",
    terrain: "Moderate",
    status: "Favorable",
  },
  {
    name: "Highland Relay",
    site: "Malapert Massif",
    date: "2030-08-21",
    solar: "15.7°",
    light: "17.2 h",
    earth: "21.8 h",
    blackout: "3.8 h",
    terrain: "Low",
    status: "Favorable",
  },
  {
    name: "Ridge Traverse",
    site: "Connecting Ridge",
    date: "2030-08-19",
    solar: "20.1°",
    light: "21.1 h",
    earth: "14.9 h",
    blackout: "9.1 h",
    terrain: "High",
    status: "Review",
  },
];

export const datasets = [
  ["JPL Horizons", "Solar system ephemerides", "Global / temporal", "Vectors, CSV", "Available"],
  ["NASA Moon Trek", "Lunar terrain and imagery layers", "Global", "Variable", "Connected"],
  ["LROC QuickMap", "High-resolution lunar imagery", "Global", "0.5–100 m/px", "Available"],
  ["LOLA Elevation", "Laser altimeter terrain model", "Global", "118 m/px", "Connected"],
  ["PDS Geosciences", "Planetary science archives", "Mission-specific", "Mixed", "Available"],
];

export type Role = "public" | "researcher" | "mission" | "admin";

export const navByRole: Record<Role, Array<[string, string]>> = {
  public: [
    ["Overview", "/explore"],
    ["Moon Explorer", "/explore/sites"],
    ["Landing Sites", "/explore/sites"],
    ["Compare Sites", "/researcher/compare"],
    ["Learn", "/learn"],
  ],
  researcher: [
    ["Dashboard", "/researcher/dashboard"],
    ["Site Explorer", "/researcher/explorer"],
    ["Scenario Comparison", "/researcher/compare"],
    ["Illumination Analysis", "/researcher/analytics"],
    ["Data Explorer", "/researcher/datasets"],
    ["Research Reports", "/researcher/reports"],
    ["Saved Scenarios", "/researcher/saved-scenarios"],
    ["Profile", "/researcher/profile"],
  ],
  mission: [
    ["Mission Overview", "/mission/dashboard"],
    ["Mission Planner", "/mission/planner"],
    ["Site Analysis", "/mission/site-analysis"],
    ["Site Comparison", "/mission/compare"],
    ["Terrain & Horizon", "/mission/terrain"],
    ["Solar Illumination", "/mission/illumination"],
    ["Earth Communications", "/mission/communications"],
    ["Mission Timeline", "/mission/timeline"],
    ["Optimization Engine", "/mission/optimization"],
    ["Scientific Data Center", "/mission/data-center"],
    ["Reports", "/mission/reports"],
    ["Settings", "/mission/settings"],
  ],
  admin: [
    ["Admin Overview", "/admin/dashboard"],
    ["User Management", "/admin/users"],
    ["Approvals", "/admin/approvals"],
    ["Roles & Permissions", "/admin/roles"],
    ["Audit Logs", "/admin/audit-logs"],
  ],
};

export const pageMeta: Record<string, { title: string; kicker: string }> = {
  planner: {
    title: "Advanced Mission Planner",
    kicker: "Configure mission constraints and evaluate a modeled preview scenario.",
  },
  "site-analysis": {
    title: "Site Analysis",
    kicker: "Local terrain, horizon geometry and visibility conditions.",
  },
  terrain: {
    title: "Terrain & Horizon",
    kicker: "Inspect slope, elevation and terrain-obstructed horizon profiles.",
  },
  illumination: {
    title: "Solar Illumination",
    kicker: "Separate geometric solar elevation from modeled terrain illumination.",
  },
  communications: {
    title: "Earth Communications",
    kicker: "Evaluate geometric Earth visibility and communication constraints.",
  },
  timeline: {
    title: "Mission Timeline",
    kicker: "Synchronize environmental conditions with operational activity.",
  },
  optimization: {
    title: "Optimization Engine",
    kicker: "Rank candidate conditions against mission constraints.",
  },
  "data-center": {
    title: "Scientific Data Center",
    kicker: "Monitor datasets and future scientific integrations.",
  },
  reports: { title: "Reports", kicker: "Build clear, attributable mission intelligence briefs." },
  settings: {
    title: "Mission Settings",
    kicker: "Units, display conventions and analytical defaults.",
  },
  explorer: {
    title: "Site Explorer",
    kicker: "Investigate south polar regions with research controls.",
  },
  compare: {
    title: "Scenario Comparison",
    kicker: "Compare underlying constraints, not a black-box score.",
  },
  analytics: {
    title: "Illumination Analysis",
    kicker: "Analyze modeled Sun and Earth geometry over time.",
  },
  datasets: {
    title: "Dataset Explorer",
    kicker: "Review coverage, resolution and integration readiness.",
  },
  "saved-scenarios": {
    title: "Saved Scenarios",
    kicker: "Return to your stored preview analyses.",
  },
  profile: { title: "Researcher Profile", kicker: "Manage institution details and access status." },
};
