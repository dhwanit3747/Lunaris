import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  CircleUserRound,
  Clock3,
  Database,
  Download,
  Earth,
  FileText,
  Gauge,
  Layers3,
  LockKeyhole,
  Menu,
  Moon,
  Orbit,
  PanelLeftClose,
  Play,
  Plus,
  Radio,
  RotateCcw,
  Save,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Telescope,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { navByRole, Role, sites, timeData } from "./data";

export const moonImage =
  "https://images.unsplash.com/photo-1777277539249-34020e857900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=88&w=1800";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="logo" aria-label="Lunaris home">
      <span className="logo-mark">
        <Moon size={19} strokeWidth={1.5} />
        <i />
      </span>
      {!compact && (
        <span>
          <b>LUNARIS</b>
          <small>Lunar intelligence</small>
        </span>
      )}
    </Link>
  );
}

export function DemoBadge() {
  return (
    <span className="demo-badge">
      <span /> Simulated demo
    </span>
  );
}

export function PublicNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="public-nav">
      <Logo />
      <nav className={open ? "nav-links open" : "nav-links"}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/explore">Explore Moon</NavLink>
        <NavLink to="/explore/sites">Landing Sites</NavLink>
        <NavLink to="/learn">Learn</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <div className="nav-actions">
        <Link className="text-link hide-mobile" to="/login">
          Sign in
        </Link>
        <Link className="button small hide-mobile" to="/register">
          Get started <ArrowRight size={14} />
        </Link>
        <button
          className="icon-btn menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

const navIcons = [
  Gauge,
  Telescope,
  BarChart3,
  Sun,
  Database,
  FileText,
  Save,
  CircleUserRound,
  Layers3,
  Earth,
  Clock3,
  Settings2,
];

export function AppShell({ role, children }: { role: Role; children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [utility, setUtility] = useState<"search" | "notifications" | null>(null);
  const location = useLocation();
  const roleName = role === "mission" ? "Mission Control" : role[0].toUpperCase() + role.slice(1);
  return (
    <div className={collapsed ? "app-shell collapsed" : "app-shell"}>
      <aside className="sidebar">
        <div className="side-head">
          <Logo compact={collapsed} />
          <button onClick={() => setCollapsed(!collapsed)}>
            <PanelLeftClose size={18} />
          </button>
        </div>
        <div className="side-context">
          {!collapsed && (
            <>
              <small>WORKSPACE</small>
              <strong>{roleName}</strong>
            </>
          )}
        </div>
        <nav>
          {navByRole[role].map(([label, path], i) => {
            const Icon = navIcons[i % navIcons.length];
            return (
              <NavLink
                key={path + label}
                to={path}
                className={location.pathname === path ? "active" : ""}
              >
                <Icon size={17} />
                <span>{label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="side-bottom">
          <div className="user-avatar">AR</div>
          {!collapsed && (
            <div>
              <strong>Alex Rivera</strong>
              <small>{roleName}</small>
            </div>
          )}
          {!collapsed && <ChevronDown size={14} />}
        </div>
      </aside>
      <div className="app-main">
        <header className="app-topbar">
          <div>
            <span className="online-dot" /> Systems nominal <span className="divider" /> 18 AUG 2030
            · 14:32 UTC
          </div>
          <div>
            <DemoBadge />
            <button
              className="icon-btn"
              onClick={() => setUtility(utility === "search" ? null : "search")}
              aria-label="Search workspace"
            >
              <Search size={17} />
            </button>
            <button
              className="icon-btn"
              onClick={() => setUtility(utility === "notifications" ? null : "notifications")}
              aria-label="Open notifications"
            >
              <Bell size={17} />
            </button>
          </div>
        </header>
        <main>{children}</main>
      </div>
      <nav className="mobile-bottom">
        {navByRole[role].slice(0, 4).map(([label, path], i) => {
          const Icon = navIcons[i];
          return (
            <NavLink to={path} key={path}>
              <Icon />
              <span>{label.split(" ")[0]}</span>
            </NavLink>
          );
        })}
      </nav>
      {utility && (
        <div className="utility-popover">
          <div className="panel-title">
            <span>{utility === "search" ? "Workspace search" : "Notifications"}</span>
            <button onClick={() => setUtility(null)} aria-label="Close">
              <X size={15} />
            </button>
          </div>
          {utility === "search" ? (
            <label className="utility-search">
              <Search size={15} />
              <input autoFocus placeholder="Search sites, scenarios, datasets…" />
            </label>
          ) : (
            <div className="notification-list">
              <span>
                <i className="good" />
                <b>Scenario calculation complete</b>
                Ares Prime is ready for review.
              </span>
              <span>
                <i />
                <b>Dataset status updated</b>
                LOLA reference layer is available.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function PageHeader({
  eyebrow = "Mission intelligence",
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </div>
  );
}

export function MoonGlobe({
  selected = 0,
  onSelect,
  compact = false,
}: {
  selected?: number;
  onSelect?: (n: number) => void;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "moon-viz compact" : "moon-viz"}>
      <div className="viz-grid" />
      <div className="sun-beam">
        <Sun size={17} />
        <span>Sun vector</span>
      </div>
      <div className="earth-point">
        <Earth size={18} />
        <span>Earth +11.2°</span>
      </div>
      <div className="moon-sphere" style={{ backgroundImage: `url("${moonImage}")` }}>
        <div className="pole-ring" />
        {sites.slice(0, 4).map((site, i) => (
          <button
            key={site.id}
            onClick={() => onSelect?.(i)}
            aria-label={`Select ${site.name}`}
            className={`site-marker m${i} ${selected === i ? "selected" : ""}`}
          >
            <span>{i + 1}</span>
            <i>{site.name}</i>
          </button>
        ))}
      </div>
      <div className="viz-legend">
        <span>
          <i className="gold" /> Solar direction
        </span>
        <span>
          <i className="cyan" /> Earth vector
        </span>
        <span>
          <i className="green" /> Candidate site
        </span>
      </div>
      <div className="coordinates">
        89.90° S<br />
        0.00° E
      </div>
    </div>
  );
}

export function MetricCard({
  label,
  value,
  detail,
  tone = "cyan",
  icon: Icon = Activity,
}: {
  label: string;
  value: string;
  detail: string;
  tone?: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="metric-card">
      <div className={`metric-icon ${tone}`}>
        <Icon />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
    </div>
  );
}

export function ScienceChart({
  type = "solar",
  title,
  height = 250,
}: {
  type?: "solar" | "earth" | "illumination";
  title?: string;
  height?: number;
}) {
  const color = type === "solar" ? "#f2bd5a" : type === "earth" ? "#4ed8ee" : "#71d59a";
  const Chart = type === "illumination" ? AreaChart : LineChart;
  return (
    <div className="chart-wrap">
      <div className="chart-head">
        <div>
          <span className={`data-dot ${type}`} />
          {title || (type === "solar" ? "Solar elevation" : "Earth elevation")}
        </div>
        <div className="chart-actions">
          24H <SlidersHorizontal size={14} />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <Chart data={timeData} margin={{ top: 16, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${type}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity=".28" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#213044" vertical={false} strokeDasharray="3 4" />
          <XAxis dataKey="time" stroke="#637189" tickLine={false} axisLine={false} fontSize={10} />
          <YAxis
            stroke="#637189"
            tickLine={false}
            axisLine={false}
            fontSize={10}
            unit={type === "illumination" ? "%" : "°"}
          />
          <Tooltip
            contentStyle={{ background: "#101a27", border: "1px solid #29384c", borderRadius: 8 }}
          />
          {type === "illumination" ? (
            <Area
              dataKey="illumination"
              stroke={color}
              fill={`url(#grad-${type})`}
              strokeWidth={2}
            />
          ) : (
            <Line
              type="monotone"
              dataKey={type}
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
            />
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const cls = /available|connected|favorable|approved|visible|active/i.test(status)
    ? "good"
    : /review|pending|limited/i.test(status)
      ? "warn"
      : "neutral";
  return (
    <span className={`status-pill ${cls}`}>
      <i />
      {status}
    </span>
  );
}

export function TimeControl() {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(42);
  return (
    <div className="time-control">
      <button className="play-btn" onClick={() => setPlaying(!playing)}>
        {playing ? <span className="pause">Ⅱ</span> : <Play size={15} fill="currentColor" />}
      </button>
      <span>18 AUG</span>
      <input
        type="range"
        min="0"
        max="100"
        value={time}
        onChange={(e) => setTime(+e.target.value)}
      />
      <strong>{String(Math.round(time / 4.17)).padStart(2, "0")}:00 UTC</strong>
      <select>
        <option>1×</option>
        <option>4×</option>
        <option>12×</option>
      </select>
    </div>
  );
}

export function SiteDetail({ index = 0 }: { index?: number }) {
  const site = sites[index];
  return (
    <div className="site-detail panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">{site.type} site</span>
          <h3>{site.name}</h3>
        </div>
        <StatusPill status="Earth visible" />
      </div>
      <p>{site.note}</p>
      <div className="coordinate-row">
        <span>
          LAT <b>{site.lat}</b>
        </span>
        <span>
          LON <b>{site.lng}</b>
        </span>
      </div>
      <div className="conditions">
        <div>
          <Sun />
          <span>
            Solar condition<strong>{site.solar > 75 ? "Good sunlight" : "Limited sunlight"}</strong>
          </span>
        </div>
        <div>
          <Earth />
          <span>
            Earth visibility<strong>{site.earth}% window</strong>
          </span>
        </div>
        <div>
          <Radio />
          <span>
            Communication<strong>Nominal · Demo</strong>
          </span>
        </div>
      </div>
      <Link to={`/explore/site/${site.id}`} className="button ghost full">
        Open full site analysis <ArrowRight size={14} />
      </Link>
    </div>
  );
}

export function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="form-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export function MissionPlannerForm() {
  const [calculated, setCalculated] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();
  return (
    <div className="planner-grid">
      <div className="panel form-panel" key={formKey}>
        <div className="panel-title">
          <Orbit /> Scenario configuration <DemoBadge />
        </div>
        <div className="form-grid">
          <FormField label="Mission name">
            <input defaultValue="Artemis Surface Window A" />
          </FormField>
          <FormField label="Target landing site">
            <select>
              <option>Shackleton Rim</option>
              <option>Malapert Massif</option>
              <option>Custom coordinates</option>
            </select>
          </FormField>
          <FormField label="Latitude">
            <input defaultValue="-89.9000" />
          </FormField>
          <FormField label="Longitude">
            <input defaultValue="0.0000" />
          </FormField>
          <FormField label="Landing date">
            <input type="date" defaultValue="2030-08-18" />
          </FormField>
          <FormField label="Landing time (UTC)">
            <input type="time" defaultValue="14:30" />
          </FormField>
          <FormField label="Mission duration">
            <select>
              <option>72 hours</option>
              <option>7 days</option>
              <option>14 days</option>
            </select>
          </FormField>
          <FormField label="Solar array">
            <select>
              <option>Tracking array · 8 kW</option>
              <option>Fixed array · 5 kW</option>
            </select>
          </FormField>
          <FormField label="Minimum solar elevation">
            <input defaultValue="8°" />
          </FormField>
          <FormField label="Max communication blackout">
            <input defaultValue="8 hours" />
          </FormField>
        </div>
        <div className="form-actions">
          <button
            className="button ghost"
            onClick={() => {
              setFormKey((key) => key + 1);
              setCalculated(false);
              setToast("Scenario form reset");
            }}
          >
            <RotateCcw size={15} />
            Reset
          </button>
          <button
            className="button ghost"
            onClick={() => {
              localStorage.setItem("lunaris-saved-scenario", "Artemis Surface Window A");
              setToast("Scenario saved locally in demo mode");
            }}
          >
            <Save size={15} />
            Save scenario
          </button>
          <button className="button" onClick={() => setCalculated(true)}>
            <Activity size={15} />
            Calculate scenario
          </button>
        </div>
      </div>
      <div className="panel result-panel">
        <span className="eyebrow">Scenario result</span>
        {calculated ? (
          <>
            <div className="result-orbit">
              <div>
                <Check />
              </div>
            </div>
            <h3>Constraints appear compatible</h3>
            <p>
              Simulated geometry indicates favorable solar availability with one extended
              communication gap.
            </p>
            <div className="result-list">
              <span>
                Solar threshold <b>Passed</b>
              </span>
              <span>
                Communication limit <b>Passed</b>
              </span>
              <span>
                Terrain confidence <b>Medium</b>
              </span>
            </div>
            <button className="button full" onClick={() => navigate("/mission/compare")}>
              Compare scenario
            </button>
          </>
        ) : (
          <div className="empty-result">
            <Orbit />
            <h3>Ready to calculate</h3>
            <p>Configure the mission constraints, then calculate a demonstration scenario.</p>
          </div>
        )}
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}

export function DataTable({
  rows,
  headers,
}: {
  rows: Array<Array<string | React.ReactNode>>;
  headers: string[];
}) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast">
      <Check size={17} />
      <span>{message}</span>
      <button onClick={onClose}>
        <X size={15} />
      </button>
    </div>
  );
}
