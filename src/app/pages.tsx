import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Database,
  Download,
  Earth,
  ExternalLink,
  Eye,
  FileText,
  Gauge,
  Globe2,
  Layers3,
  LockKeyhole,
  Mail,
  Map,
  Menu,
  Moon,
  Mountain,
  Orbit,
  Play,
  Plus,
  Radio,
  Save,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Target,
  Telescope,
  Trash2,
  UserCheck,
  Users,
  Wifi,
  X,
} from "lucide-react";
import {
  AppShell,
  DataTable,
  DemoBadge,
  FormField,
  Logo,
  MetricCard,
  MissionPlannerForm,
  MoonGlobe,
  moonImage,
  PageHeader,
  PublicNav,
  ScienceChart,
  SiteDetail,
  StatusPill,
  TimeControl,
  Toast,
} from "./components";
import { datasets, pageMeta, scenarios, sites, Role } from "./data";

const ButtonLink = ({
  to,
  children,
  ghost = false,
}: {
  to: string;
  children: React.ReactNode;
  ghost?: boolean;
}) => (
  <Link to={to} className={`button ${ghost ? "ghost" : ""}`}>
    {children}
  </Link>
);

export function LandingPage() {
  return (
    <div className="public-page">
      <PublicNav />
      <section
        className="hero"
        style={{ "--hero-image": `url("${moonImage}")` } as React.CSSProperties}
      >
        <div className="stars" />
        <div className="hero-orbit" />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mission-label">
            <span /> Lunar south pole <i /> Mission intelligence
          </div>
          <h1>
            The next giant leap
            <br />
            starts with the <em>right landing site.</em>
          </h1>
          <p>
            Explore the Moon’s south pole. Understand sunlight, map communication windows, and
            discover the best conditions for tomorrow’s lunar missions.
          </p>
          <div className="hero-actions">
            <ButtonLink to="/explore">
              Explore the Moon <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink to="/mission/dashboard" ghost>
              Discover mission intelligence
            </ButtonLink>
          </div>
        </motion.div>
        <div className="hero-values">
          {[
            [Sun, "Solar illumination", "Analyze light across time"],
            [Earth, "Earth visibility", "Map direct line-of-sight"],
            [BarChart3, "Multi-site comparison", "Understand every trade-off"],
          ].map(([Icon, t, d]) => (
            <div key={String(t)}>
              <Icon />
              <span>
                <b>{t as string}</b>
                <small>{d as string}</small>
              </span>
            </div>
          ))}
        </div>
        <div className="scroll-cue">
          SCROLL TO EXPLORE <span />
        </div>
      </section>

      <section className="section intelligence">
        <SectionIntro
          number="01"
          label="Live mission intelligence"
          title="See the south pole as a mission environment."
          body="Move beyond coordinates. Inspect sunlight, terrain and Earth geometry together in one coherent operational view."
        />
        <div className="preview-shell">
          <div className="preview-bar">
            <span>
              <i /> LIVE ENVIRONMENT · SHACKLETON REGION
            </span>
            <DemoBadge />
          </div>
          <div className="preview-grid">
            <MoonGlobe />
            <div className="preview-data">
              <div className="panel-head">
                <div>
                  <span className="eyebrow">Selected region</span>
                  <h3>Shackleton Rim A</h3>
                </div>
                <Link className="icon-button" to="/explore" aria-label="Open selected region">
                  <Target />
                </Link>
              </div>
              <div className="data-reading solar">
                <Sun />
                <span>
                  Solar elevation<small>Above local horizon</small>
                </span>
                <strong>+18.4°</strong>
              </div>
              <div className="meter">
                <span style={{ width: "76%" }} />
              </div>
              <div className="data-reading earth">
                <Earth />
                <span>
                  Earth elevation<small>Direct line-of-sight</small>
                </span>
                <strong>+11.2°</strong>
              </div>
              <div className="meter cyan">
                <span style={{ width: "68%" }} />
              </div>
              <div className="mini-window">
                <span>
                  <i className="good" />
                  Visible
                </span>
                <span>
                  <i className="bad" />
                  Obstructed
                </span>
                <div>
                  <b style={{ width: "62%" }} />
                </div>
              </div>
              <ButtonLink to="/explore">
                Open interactive explorer <ArrowRight size={15} />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section challenge">
        <SectionIntro
          number="02"
          label="Why the south pole"
          title="A landscape defined by extremes."
          body="Near the lunar south pole, minor changes in position can transform the operational environment."
        />
        <div className="three-cards">
          {[
            [
              Sun,
              "01",
              "Extreme lighting",
              "Low-angle sunlight stretches shadows across cratered terrain, creating sharp transitions between power opportunity and prolonged darkness.",
            ],
            [
              Radio,
              "02",
              "Communication challenges",
              "Earth can sit low on the local horizon. Ridges, crater walls and antenna geometry shape every direct-to-Earth window.",
            ],
            [
              Orbit,
              "03",
              "Mission complexity",
              "Coordinates, dates and duration interact. A location that works for one arrival window may fail another constraint.",
            ],
          ].map(([Icon, n, t, d]) => (
            <article className="insight-card" key={String(t)}>
              <div>
                <span>{n as string}</span>
                <Icon />
              </div>
              <h3>{t as string}</h3>
              <p>{d as string}</p>
              <span className="line-arrow">
                Learn the science <ArrowRight size={14} />
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="section sites-section">
        <SectionIntro
          number="03"
          label="Featured locations"
          title="Six sites. Different mission realities."
          body="Compare candidate south polar regions with historic Apollo sites. All conditions shown are simulated demonstration data."
        />
        <div className="site-cards">
          {sites.map((site, i) => (
            <article className="site-card" key={site.id}>
              <div
                className="site-image"
                style={{
                  backgroundImage: `url("${moonImage}")`,
                  backgroundPosition: `${20 + i * 12}% ${30 + i * 8}%`,
                }}
              >
                <span className={site.type === "Historic" ? "historic" : ""}>{site.type}</span>
                <div className="site-number">0{i + 1}</div>
              </div>
              <div className="site-copy">
                <small>{site.region}</small>
                <h3>{site.name}</h3>
                <div className="site-coords">
                  <span>{site.lat}</span>
                  <span>{site.lng}</span>
                </div>
                <p>{site.note}</p>
                <Link to={`/explore/site/${site.id}`}>
                  Explore site <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section process">
        <SectionIntro
          number="04"
          label="How Lunaris works"
          title="From location to mission clarity."
          body="A structured workflow turns complex environmental conditions into understandable planning intelligence."
        />
        <div className="steps">
          {[
            ["01", "Select a location", "Choose a candidate site or define custom coordinates."],
            ["02", "Set mission time", "Select landing date, time and surface duration."],
            ["03", "Analyze geometry", "Inspect simulated Sun and Earth conditions over time."],
            ["04", "Compare constraints", "Understand power and communication trade-offs."],
          ].map(([n, t, d], i) => (
            <div className="step" key={n}>
              <b>{n}</b>
              <div className="step-icon">
                {[Target, Clock3, Orbit, BarChart3].map((Icon, j) =>
                  j === i ? <Icon key={j} /> : null,
                )}
              </div>
              <h3>{t}</h3>
              <p>{d}</p>
              {i < 3 && <ChevronRight />}
            </div>
          ))}
        </div>
      </section>

      <section className="section access">
        <div className="access-intro">
          <span className="eyebrow">Built for every perspective</span>
          <h2>
            One Moon.
            <br />
            Three levels of clarity.
          </h2>
          <p>
            From first-time explorers to mission professionals, LUNARIS adapts complexity without
            losing scientific context.
          </p>
        </div>
        <div className="access-cards">
          {[
            [
              Globe2,
              "Public explorer",
              "Discover the Moon through approachable interactive visualizations.",
              "/explore",
            ],
            [
              BookOpen,
              "Researcher workspace",
              "Access deeper analysis, datasets and four-way comparison.",
              "/researcher/dashboard",
            ],
            [
              ShieldCheck,
              "Mission control",
              "Evaluate feasibility with advanced engineering constraints.",
              "/mission/dashboard",
            ],
          ].map(([Icon, t, d, to], i) => (
            <article className={i === 2 ? "featured" : ""} key={String(t)}>
              <Icon />
              <small>0{i + 1}</small>
              <h3>{t as string}</h3>
              <p>{d as string}</p>
              <Link to={to as string}>
                Enter workspace <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="education-strip">
        <div>
          <span className="eyebrow">Learn the environment</span>
          <h2>
            Five concepts.
            <br />
            One connected system.
          </h2>
        </div>
        <div className="concepts">
          {[
            "Solar elevation",
            "Lunar illumination",
            "Earth visibility",
            "Direct-to-Earth",
            "Terrain horizon",
          ].map((x, i) => (
            <Link to="/learn" key={x}>
              <span>0{i + 1}</span>
              {x}
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}

function SectionIntro({
  number,
  label,
  title,
  body,
}: {
  number: string;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="section-intro">
      <div className="section-index">{number}</div>
      <div>
        <span className="eyebrow">{label}</span>
        <h2>{title}</h2>
      </div>
      <p>{body}</p>
    </div>
  );
}

function PublicFooter() {
  return (
    <footer>
      <div className="footer-lead">
        <Moon />
        <div>
          <strong>LUNARIS</strong>
          <span>Lunar Site Intelligence & Mission Planning Platform</span>
        </div>
        <h2>
          Plan beyond
          <br />
          the horizon.
        </h2>
      </div>
      <div className="footer-links">
        <p>
          LUNARIS is an independent hackathon demonstration. It is not an official NASA product and
          does not imply NASA or JPL endorsement.
        </p>
        {[
          ["Explore", "Moon Explorer", "Landing Sites", "Learn"],
          ["Research", "Workspace", "Datasets", "Reports"],
          ["Product", "About", "Contact", "Documentation"],
        ].map((g) => (
          <div key={g[0]}>
            <b>{g[0]}</b>
            {g.slice(1).map((x) => (
              <Link to="/about" key={x}>
                {x}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2030 LUNARIS · Demonstration interface</span>
        <span>Data references: NASA/JPL Horizons · LROC · LOLA · PDS</span>
      </div>
    </footer>
  );
}

export function ExplorePage() {
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState<"globe" | "map">("globe");
  return (
    <AppShell role="public">
      <PageHeader
        eyebrow="Public explorer"
        title="Explore the Lunar South Pole"
        description="Select a site and move through time to understand simulated sunlight and Earth visibility."
        actions={
          <ButtonLink to="/learn" ghost>
            <BookOpen size={15} />
            Explorer guide
          </ButtonLink>
        }
      />
      <div className="explorer-grid">
        <div className="panel viz-panel">
          <div className="panel-toolbar">
            <div>
              <button className={view === "globe" ? "active" : ""} onClick={() => setView("globe")}>
                Globe
              </button>
              <button className={view === "map" ? "active" : ""} onClick={() => setView("map")}>
                South polar map
              </button>
            </div>
            <DemoBadge />
          </div>
          <div className={view === "map" ? "map-view" : ""}>
            <MoonGlobe selected={selected} onSelect={setSelected} />
            {view === "map" && (
              <div className="map-mode-label">
                <Map size={14} />
                Polar stereographic demonstration view
              </div>
            )}
          </div>
          <TimeControl />
        </div>
        <SiteDetail index={selected} />
      </div>
      <div className="metric-grid">
        <MetricCard
          label="Solar elevation"
          value="+18.4°"
          detail="Above geometric horizon"
          tone="gold"
          icon={Sun}
        />
        <MetricCard
          label="Earth elevation"
          value="+11.2°"
          detail="Earth currently visible"
          icon={Earth}
        />
        <MetricCard
          label="Next darkness"
          value="06h 42m"
          detail="Simulated estimate"
          tone="purple"
          icon={Clock3}
        />
        <MetricCard
          label="Communication"
          value="Nominal"
          detail="Geometry only · Demo"
          tone="green"
          icon={Radio}
        />
      </div>
    </AppShell>
  );
}

export function SitesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "Candidate" | "Historic">("All");
  const filtered = sites.filter(
    (s) =>
      (s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.region.toLowerCase().includes(query.toLowerCase())) &&
      (filter === "All" || s.type === filter),
  );
  return (
    <AppShell role="public">
      <PageHeader
        eyebrow="Site catalog"
        title="Landing Sites"
        description="Explore candidate regions and historic locations through a consistent analytical lens."
      />
      <div className="filter-row">
        <label>
          <Search />
          <input
            placeholder="Search sites or regions"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        {(["All", "Candidate", "Historic"] as const).map((option) => (
          <button
            key={option}
            className={`filter ${filter === option ? "active" : ""}`}
            onClick={() => setFilter(option)}
          >
            {option === "All" ? "All sites" : option}
          </button>
        ))}
      </div>
      <div className="catalog-grid">
        {filtered.map((site, i) => (
          <Link to={`/explore/site/${site.id}`} className="catalog-card panel" key={site.id}>
            <div className="catalog-map">
              <div className="mini-moon" />
              <Target />
            </div>
            <div>
              <StatusPill status={site.type} />
              <h3>{site.name}</h3>
              <p>{site.note}</p>
              <div className="site-coords">
                <span>{site.lat}</span>
                <span>{site.lng}</span>
              </div>
              <div className="catalog-stats">
                <span>
                  <Sun />
                  {site.solar}% solar
                </span>
                <span>
                  <Earth />
                  {site.earth}% Earth
                </span>
              </div>
            </div>
            <ArrowRight className="catalog-arrow" />
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="panel empty-state compact-empty">
          <Search />
          <h2>No landing sites found</h2>
          <p>Try another search term or clear the selected site category.</p>
          <button
            className="button ghost"
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </AppShell>
  );
}

export function SitePage() {
  const { id } = useParams();
  const index = Math.max(
    0,
    sites.findIndex((s) => s.id === id),
  );
  const site = sites[index];
  const [toast, setToast] = useState("");
  const navigate = useNavigate();
  return (
    <AppShell role="public">
      <PageHeader
        eyebrow={`${site.type} site · ${site.region}`}
        title={site.name}
        description={site.note}
        actions={
          <>
            <button
              className="button ghost"
              onClick={() => {
                localStorage.setItem("lunaris-saved-site", site.id);
                setToast(`${site.name} saved to your demo workspace`);
              }}
            >
              <Save size={15} />
              Save
            </button>
            <button
              className="button"
              onClick={() => {
                localStorage.setItem("lunaris-compare-site", site.id);
                navigate("/researcher/compare");
              }}
            >
              <Plus size={15} />
              Compare
            </button>
          </>
        }
      />
      <div className="analysis-grid">
        <div className="panel">
          <MoonGlobe selected={index % 4} compact />
          <TimeControl />
        </div>
        <SiteDetail index={index} />
      </div>
      <div className="two-charts">
        <div className="panel">
          <ScienceChart type="solar" title="Simulated solar elevation" />
        </div>
        <div className="panel">
          <ScienceChart type="earth" title="Simulated Earth elevation" />
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </AppShell>
  );
}

export function WorkspaceDashboard({ role }: { role: "researcher" | "mission" }) {
  const isMission = role === "mission";
  const [selected, setSelected] = useState(0);
  const [layer, setLayer] = useState("Terrain");
  const [toast, setToast] = useState("");
  return (
    <AppShell role={role}>
      <PageHeader
        eyebrow={isMission ? "Mission control · Environment 04" : "Researcher workspace"}
        title={isMission ? "Mission Overview" : "Research Intelligence"}
        description={
          isMission
            ? "Integrated surface conditions for active candidate scenarios."
            : "Review sites, datasets and saved scientific analyses."
        }
        actions={
          <>
            <button
              className="button ghost"
              onClick={() => setToast("Demo mission brief generated with simulation disclaimer")}
            >
              <FileText size={15} />
              Generate brief
            </button>
            <ButtonLink to={isMission ? "/mission/planner" : "/researcher/explorer"}>
              <Plus size={15} />
              {isMission ? "New scenario" : "New analysis"}
            </ButtonLink>
          </>
        }
      />
      <div className="metric-grid five">
        <MetricCard
          label={isMission ? "Active scenarios" : "Landing sites"}
          value={isMission ? "06" : "24"}
          detail="+2 this week"
          icon={Orbit}
        />
        <MetricCard
          label={isMission ? "Candidate sites" : "Saved scenarios"}
          value={isMission ? "12" : "08"}
          detail="4 south polar"
          tone="purple"
          icon={Target}
        />
        <MetricCard
          label="Solar availability"
          value="82%"
          detail="Selected window"
          tone="gold"
          icon={Sun}
        />
        <MetricCard label="Earth visibility" value="68%" detail="Geometry only" icon={Earth} />
        <MetricCard
          label={isMission ? "Constraints" : "Datasets"}
          value={isMission ? "02" : "14"}
          detail={isMission ? "Require review" : "3 connected"}
          tone="red"
          icon={AlertTriangle}
        />
      </div>
      <div className="command-grid">
        <div className="panel viz-panel">
          <div className="panel-title">
            <span>South polar operations map</span>
            <div>
              {["Terrain", "Shadows", "Sites"].map((option) => (
                <button
                  key={option}
                  className={`chip ${layer === option ? "active" : ""}`}
                  onClick={() => setLayer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <MoonGlobe selected={selected} onSelect={setSelected} compact />
        </div>
        <div className="panel scenario-panel">
          <div className="panel-title">
            <span>{isMission ? "Selected mission scenario" : "Selected analysis"}</span>
            <button
              onClick={() => setToast("Scenario actions: duplicate, archive, and export are ready")}
              aria-label="Scenario actions"
            >
              •••
            </button>
          </div>
          <span className="eyebrow">Scenario 04</span>
          <h2>Ares Prime</h2>
          <p>72-hour surface mission at Shackleton Rim A.</p>
          <div className="scenario-status">
            <StatusPill status="Favorable" />
            <DemoBadge />
          </div>
          <div className="result-list">
            <span>
              Target site <b>{sites[selected].name}</b>
            </span>
            <span>
              Landing date <b>18 Aug 2030</b>
            </span>
            <span>
              Mission duration <b>72 hours</b>
            </span>
            <span>
              Solar availability <b>82%</b>
            </span>
            <span>
              DTE visibility <b>68%</b>
            </span>
          </div>
          <div className="constraint-note">
            <AlertTriangle />
            <span>
              <b>Constraint notice</b>One 7.2 h communication blackout exceeds preferred target.
            </span>
          </div>
          <ButtonLink to={isMission ? "/mission/site-analysis" : "/researcher/analytics"}>
            Open full analysis <ArrowRight size={14} />
          </ButtonLink>
        </div>
      </div>
      <div className="two-charts">
        <div className="panel">
          <ScienceChart type="solar" />
        </div>
        <div className="panel">
          <ScienceChart type="earth" />
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </AppShell>
  );
}

export function ToolPage({ role }: { role: "researcher" | "mission" }) {
  const params = location.pathname.split("/").filter(Boolean);
  const key = params[params.length - 1];
  const [toast, setToast] = useState("");
  const meta = pageMeta[key] || { title: "Workspace", kicker: "Mission planning intelligence." };
  if (key === "planner")
    return (
      <AppShell role="mission">
        <PageHeader title={meta.title} description={meta.kicker} />
        <MissionPlannerForm />
      </AppShell>
    );
  if (key === "compare") return <ComparisonPage role={role} />;
  if (key === "datasets" || key === "data-center") return <DataCenter role={role} />;
  if (key === "optimization") return <OptimizationPage />;
  if (key === "timeline") return <TimelinePage />;
  if (key === "reports") return <ReportsPage role={role} />;
  if (key === "saved-scenarios") return <SavedScenarios />;
  if (key === "profile" || key === "settings") return <SettingsPage role={role} />;
  const type =
    key === "communications"
      ? "earth"
      : key === "illumination" || key === "analytics"
        ? "solar"
        : "illumination";
  return (
    <AppShell role={role}>
      <PageHeader
        title={meta.title}
        description={meta.kicker}
        actions={
          <>
            <button
              className="button ghost"
              onClick={() => setToast(`${meta.title} demonstration data exported as CSV`)}
            >
              <Download size={15} />
              Export data
            </button>
            <button
              className="button"
              onClick={() => {
                localStorage.setItem(`lunaris-analysis-${key}`, new Date().toISOString());
                setToast(`${meta.title} saved locally`);
              }}
            >
              <Save size={15} />
              Save analysis
            </button>
          </>
        }
      />
      <div className="analysis-grid">
        <div className="panel viz-panel">
          <div className="panel-title">
            <span>{key === "terrain" ? "Digital terrain model" : "Local environment view"}</span>
            <DemoBadge />
          </div>
          <MoonGlobe compact />
          <div className="horizon-profile">
            <span>Local horizon profile</span>
            <svg viewBox="0 0 600 90" preserveAspectRatio="none">
              <path d="M0 75 L50 55 L90 62 L145 28 L190 48 L240 42 L300 68 L345 22 L400 50 L455 38 L520 64 L600 30 L600 90 L0 90Z" />
              <line x1="0" y1="60" x2="600" y2="60" />
            </svg>
          </div>
        </div>
        <div className="stack-metrics">
          <MetricCard
            label={type === "earth" ? "Earth elevation" : "Maximum solar elevation"}
            value={type === "earth" ? "+11.2°" : "+18.4°"}
            detail="Geometric calculation"
            icon={type === "earth" ? Earth : Sun}
            tone={type === "earth" ? "cyan" : "gold"}
          />
          <MetricCard
            label="Terrain obstruction"
            value="3.7°"
            detail="Modeled local horizon"
            icon={Mountain}
            tone="purple"
          />
          <MetricCard
            label={type === "earth" ? "Longest blackout" : "Sunlight duration"}
            value={type === "earth" ? "7.2 h" : "19.6 h"}
            detail="Within selected window"
            icon={Clock3}
            tone="red"
          />
        </div>
      </div>
      <div className="two-charts">
        <div className="panel">
          <ScienceChart
            type={type as "solar" | "earth" | "illumination"}
            title={meta.title + " over time"}
          />
        </div>
        <div className="panel timeline-card">
          <div className="panel-title">
            Visibility timeline <DemoBadge />
          </div>
          <VisibilityBands type={type} />
          <div className="science-note">
            <AlertTriangle />
            <span>
              <b>Interpretation note</b>
              {type === "earth"
                ? "Geometric Earth visibility does not guarantee communications. Antenna limits, terrain and link budget remain required."
                : "Geometric solar elevation and terrain illumination are modeled separately."}
            </span>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </AppShell>
  );
}

function VisibilityBands({ type = "solar" }: { type?: string }) {
  return (
    <div className="bands">
      {[
        ["00:00", "06:00"],
        ["06:00", "12:00"],
        ["12:00", "18:00"],
        ["18:00", "24:00"],
      ].map((x, i) => (
        <div key={i}>
          <span>{x[0]}</span>
          <i
            className={
              i === 1 ? "blocked" : i === 3 ? "limited" : type === "earth" ? "earth" : "sun"
            }
          />
          <small>{i === 1 ? "Obstructed" : i === 3 ? "Below horizon" : "Available"}</small>
        </div>
      ))}
    </div>
  );
}

function ComparisonPage({ role }: { role: "researcher" | "mission" }) {
  const [list, setList] = useState(scenarios);
  const [toast, setToast] = useState("");
  return (
    <AppShell role={role}>
      <PageHeader
        title="Scenario Comparison"
        description="Evaluate environmental trade-offs using transparent underlying constraints."
        actions={
          <>
            <button className="button ghost" onClick={() => setToast("Comparison exported as CSV")}>
              <Download size={15} />
              Export
            </button>
            <button
              className="button"
              disabled={list.length >= 4}
              title={list.length >= 4 ? "A maximum of four scenarios can be compared" : ""}
              onClick={() => {
                if (list.length >= 4) {
                  setToast("Comparison limit reached: remove a scenario before adding another");
                  return;
                }
                setList([
                  ...list,
                  { ...scenarios[0], name: `Scenario ${list.length + 1}`, site: "Nobile Region" },
                ]);
              }}
            >
              <Plus size={15} />
              Add scenario
            </button>
          </>
        }
      />
      <div className="comparison-cards">
        {list.map((s, i) => (
          <div className="panel comparison-card" key={i}>
            <div>
              <span>0{i + 1}</span>
              <button onClick={() => setList(list.filter((_, j) => j !== i))}>
                <X />
              </button>
            </div>
            <small>{s.name}</small>
            <h3>{s.site}</h3>
            <p>{s.date} · 72 hours</p>
            <div className="compare-rings">
              <div style={{ "--p": `${78 - i * 8}%` } as React.CSSProperties}>
                <b>{78 - i * 8}%</b>
                <span>Solar</span>
              </div>
              <div style={{ "--p": `${68 + i * 9}%` } as React.CSSProperties}>
                <b>{68 + i * 9}%</b>
                <span>Earth</span>
              </div>
            </div>
            <StatusPill status={s.status} />
          </div>
        ))}
      </div>
      <div className="panel">
        <div className="panel-title">
          <span>Constraint comparison</span>
          <small>No unexplained aggregate scoring</small>
        </div>
        <DataTable
          headers={[
            "Scenario",
            "Site",
            "Max solar",
            "Sunlight",
            "Earth visibility",
            "Longest blackout",
            "Terrain",
            "Assessment",
          ]}
          rows={list.map((s) => [
            s.name,
            s.site,
            s.solar,
            s.light,
            s.earth,
            s.blackout,
            s.terrain,
            <StatusPill status={s.status} />,
          ])}
        />
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </AppShell>
  );
}

function DataCenter({ role }: { role: "researcher" | "mission" }) {
  const [selectedDataset, setSelectedDataset] = useState<(typeof datasets)[number] | null>(null);
  const [toast, setToast] = useState("");
  return (
    <AppShell role={role}>
      <PageHeader
        title={role === "mission" ? "Scientific Data Center" : "Dataset Explorer"}
        description="Review source coverage, resolution and integration readiness. No live scientific service is queried in this demo."
        actions={
          <button
            className="button ghost"
            onClick={() =>
              setToast("Integration guide opened in demo mode; live credentials are not configured")
            }
          >
            <Database size={15} />
            Integration guide
          </button>
        }
      />
      <div className="source-grid">
        {datasets.map((d, i) => (
          <div className="panel source-card" key={d[0]}>
            <div>
              <span className="source-icon">
                {[Orbit, Moon, Map, Layers3, Database].map((I, j) =>
                  i === j ? <I key={j} /> : null,
                )}
              </span>
              <StatusPill status={d[4]} />
            </div>
            <h3>{d[0]}</h3>
            <p>{d[1]}</p>
            <dl>
              <div>
                <dt>Coverage</dt>
                <dd>{d[2]}</dd>
              </div>
              <div>
                <dt>Resolution</dt>
                <dd>{d[3]}</dd>
              </div>
              <div>
                <dt>Updated</dt>
                <dd>Reference only</dd>
              </div>
            </dl>
            <button className="button ghost full" onClick={() => setSelectedDataset(d)}>
              View dataset <ExternalLink size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="science-note wide">
        <ShieldCheck />
        <span>
          <b>Data integrity</b>Dataset names and descriptions are references. Availability
          indicators and analytical outputs are simulated until live integrations are validated.
        </span>
      </div>
      {selectedDataset && (
        <div className="modal-backdrop" onClick={() => setSelectedDataset(null)}>
          <div className="modal panel" onClick={(event) => event.stopPropagation()}>
            <div className="panel-title">
              <span>Dataset reference</span>
              <button onClick={() => setSelectedDataset(null)}>
                <X size={15} />
              </button>
            </div>
            <div className="modal-content">
              <DemoBadge />
              <h2>{selectedDataset[0]}</h2>
              <p>{selectedDataset[1]}</p>
              <div className="result-list">
                <span>
                  Coverage <b>{selectedDataset[2]}</b>
                </span>
                <span>
                  Resolution <b>{selectedDataset[3]}</b>
                </span>
                <span>
                  Integration <b>{selectedDataset[4]}</b>
                </span>
              </div>
              <div className="science-note">
                <AlertTriangle />
                <span>
                  <b>Reference only</b>No live data is downloaded by this demonstration.
                </span>
              </div>
              <button
                className="button full"
                onClick={() => {
                  setSelectedDataset(null);
                  setToast(`${selectedDataset[0]} added to the demo data queue`);
                }}
              >
                Add reference to workspace
              </button>
            </div>
          </div>
        </div>
      )}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </AppShell>
  );
}

function OptimizationPage() {
  const [run, setRun] = useState(false);
  return (
    <AppShell role="mission">
      <PageHeader
        title="Optimization Engine"
        description="Rank candidate windows against explicit mission requirements."
      />
      <div className="optimization-grid">
        <div className="panel form-panel">
          <div className="panel-title">
            Mission constraints <DemoBadge />
          </div>
          <div className="form-grid one">
            <FormField label="Preferred region">
              <select>
                <option>South polar highlands</option>
                <option>Shackleton region</option>
              </select>
            </FormField>
            <FormField label="Landing date range">
              <input defaultValue="18 Aug – 30 Sep 2030" />
            </FormField>
            <FormField label="Minimum solar availability">
              <input type="range" defaultValue="72" />
            </FormField>
            <FormField label="Minimum communication window">
              <select>
                <option>16 hours / day</option>
                <option>12 hours / day</option>
              </select>
            </FormField>
            <FormField label="Maximum slope">
              <select>
                <option>≤ 12 degrees</option>
                <option>≤ 8 degrees</option>
              </select>
            </FormField>
          </div>
          <button className="button full" onClick={() => setRun(true)}>
            <Activity size={15} />
            Run demonstration optimization
          </button>
        </div>
        <div className="ranked-list">
          {run ? (
            sites.slice(0, 4).map((s, i) => (
              <div className="panel rank-card" key={s.id}>
                <b>0{i + 1}</b>
                <div>
                  <span className="eyebrow">
                    {i === 0 ? "Recommended candidate" : "Alternative scenario"}
                  </span>
                  <h3>{s.name}</h3>
                  <p>
                    {i === 0
                      ? "Best balance of selected solar and communication constraints."
                      : "Viable when weighting or date range changes."}
                  </p>
                  <div>
                    <span>
                      <Sun />
                      Solar {s.solar}%
                    </span>
                    <span>
                      <Earth />
                      Earth {s.earth}%
                    </span>
                    <span>
                      <Layers3 />
                      Confidence {i < 2 ? "Medium" : "Low"}
                    </span>
                  </div>
                </div>
                <DemoBadge />
              </div>
            ))
          ) : (
            <div className="panel empty-state">
              <SlidersHorizontal />
              <h2>Define mission requirements</h2>
              <p>
                Results will show candidate scenarios and the constraint-based reason for each
                recommendation.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function TimelinePage() {
  const [play, setPlay] = useState(false);
  return (
    <AppShell role="mission">
      <PageHeader
        title="Mission Timeline"
        description="Synchronize environment conditions, mission events and surface activities."
        actions={
          <button className="button" onClick={() => setPlay(!play)}>
            <Play size={15} />
            {play ? "Pause timeline" : "Play timeline"}
          </button>
        }
      />
      <div className="panel mission-timeline">
        <div className="timeline-ruler">
          {Array.from({ length: 13 }, (_, i) => (
            <span key={i}>{String(i * 2).padStart(2, "0")}:00</span>
          ))}
        </div>
        {[
          ["Solar availability", "sun"],
          ["Earth visibility", "earth"],
          ["Communication", "comm"],
          ["Surface activity", "activity"],
        ].map(([label, cls]) => (
          <div className="timeline-row" key={label}>
            <b>{label}</b>
            <div>
              <i className={cls} />
              <i className={`${cls} second`} />
              {cls === "activity" && (
                <>
                  <em style={{ left: "18%", width: "21%" }}>EVA 01</em>
                  <em style={{ left: "58%", width: "29%" }}>SCIENCE OPS</em>
                </>
              )}
            </div>
          </div>
        ))}
        <TimeControl />
      </div>
      <div className="two-charts">
        <div className="panel">
          <ScienceChart type="solar" />
        </div>
        <div className="panel">
          <ScienceChart type="earth" />
        </div>
      </div>
    </AppShell>
  );
}

function ReportsPage({ role }: { role: "researcher" | "mission" }) {
  const [toast, setToast] = useState("");
  const [title, setTitle] = useState("Lunar South Pole Site Assessment");
  const [window, setWindow] = useState("18–21 August 2030");
  const [notes, setNotes] = useState(
    "Comparison of simulated power and direct-to-Earth geometry for candidate surface operations.",
  );
  return (
    <AppShell role={role}>
      <PageHeader
        title={role === "mission" ? "Mission Reports" : "Research Reports"}
        description="Assemble attributable intelligence into a review-ready report."
        actions={
          <button className="button" onClick={() => setToast("Demo report prepared for export")}>
            <Download size={15} />
            Export PDF
          </button>
        }
      />
      <div className="report-builder">
        <div className="panel report-form">
          <FormField label="Report title">
            <input value={title} onChange={(event) => setTitle(event.target.value)} />
          </FormField>
          <FormField label="Selected sites">
            <select>
              <option>Shackleton Rim, Malapert Massif</option>
            </select>
          </FormField>
          <FormField label="Mission window">
            <input value={window} onChange={(event) => setWindow(event.target.value)} />
          </FormField>
          <FormField label="Research notes">
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
          </FormField>
          <label className="check-row">
            <input type="checkbox" defaultChecked />
            Include source attribution
          </label>
          <label className="check-row">
            <input type="checkbox" defaultChecked />
            Include simulation disclaimer
          </label>
        </div>
        <div className="report-preview panel">
          <div className="report-paper">
            <span>LUNARIS · MISSION INTELLIGENCE</span>
            <h2>{title || "Untitled mission report"}</h2>
            <p>Demonstration report · {window}</p>
            <div className="report-hero" />
            <h3>Executive summary</h3>
            <p>{notes || "Add research notes to complete this demonstration report."}</p>
            <div className="report-chart">
              <ScienceChart type="solar" height={150} />
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </AppShell>
  );
}

function SavedScenarios() {
  const navigate = useNavigate();
  return (
    <AppShell role="researcher">
      <PageHeader
        title="Saved Scenarios"
        description="Return to demonstration analyses and continue your work."
        actions={
          <button className="button" onClick={() => navigate("/researcher/explorer")}>
            <Plus size={15} />
            New analysis
          </button>
        }
      />
      <div className="panel">
        <DataTable
          headers={["Scenario", "Site", "Date", "Updated", "Status", "Action"]}
          rows={scenarios.map((s) => [
            s.name,
            s.site,
            s.date,
            "2 hours ago",
            <StatusPill status={s.status} />,
            <button className="table-action" onClick={() => navigate("/researcher/analytics")}>
              Open <ArrowRight size={13} />
            </button>,
          ])}
        />
      </div>
    </AppShell>
  );
}

function SettingsPage({ role }: { role: "researcher" | "mission" }) {
  const [tab, setTab] = useState("General");
  const [toast, setToast] = useState("");
  const tabs = [
    "General",
    "Display & units",
    "Notifications",
    "Data attribution",
    "Access & security",
  ];
  return (
    <AppShell role={role}>
      <PageHeader
        title={role === "mission" ? "Mission Settings" : "Researcher Profile"}
        description={
          role === "mission"
            ? "Configure workspace conventions and analytical defaults."
            : "Manage institution details and access status."
        }
      />
      <div className="settings-grid">
        <div className="panel settings-nav">
          {tabs.map((option) => (
            <button
              key={option}
              className={tab === option ? "active" : ""}
              onClick={() => setTab(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="panel form-panel">
          <div className="profile-head">
            <div className="user-avatar large">AR</div>
            <div>
              <h3>Alex Rivera</h3>
              <StatusPill
                status={role === "mission" ? "Scientist access" : "Researcher approved"}
              />
            </div>
          </div>
          {tab === "General" && (
            <div className="form-grid">
              <FormField label="Full name">
                <input defaultValue="Alex Rivera" />
              </FormField>
              <FormField label="Institution">
                <input defaultValue="Selene Research Institute" />
              </FormField>
              <FormField label="Work email">
                <input defaultValue="alex@selene.edu" />
              </FormField>
              <FormField label="Default workspace">
                <select>
                  <option>{role === "mission" ? "Mission Overview" : "Research Dashboard"}</option>
                  <option>Site Explorer</option>
                </select>
              </FormField>
            </div>
          )}
          {tab === "Display & units" && (
            <div className="form-grid">
              <FormField label="Angular units">
                <select>
                  <option>Degrees</option>
                  <option>Radians</option>
                </select>
              </FormField>
              <FormField label="Time standard">
                <select>
                  <option>UTC</option>
                  <option>Local mission elapsed time</option>
                </select>
              </FormField>
              <FormField label="Coordinate precision">
                <select>
                  <option>4 decimal places</option>
                  <option>6 decimal places</option>
                </select>
              </FormField>
            </div>
          )}
          {tab === "Notifications" && (
            <div className="setting-options">
              {[
                "Scenario calculation completed",
                "Dataset integration status",
                "Report export ready",
              ].map((label) => (
                <label key={label}>
                  <span>
                    <b>{label}</b>Email and in-app notification
                  </span>
                  <input type="checkbox" defaultChecked />
                </label>
              ))}
            </div>
          )}
          {tab === "Data attribution" && (
            <div className="settings-copy">
              <ShieldCheck />
              <h3>Attribution is always preserved</h3>
              <p>
                Reports include referenced source names, simulation status, and the independent
                project disclaimer by default.
              </p>
            </div>
          )}
          {tab === "Access & security" && (
            <div className="setting-options">
              <label>
                <span>
                  <b>Account role</b>
                  {role === "mission" ? "Scientist / Mission Professional" : "Researcher"}
                </span>
                <StatusPill status="Approved" />
              </label>
              <label>
                <span>
                  <b>Two-step verification</b>Recommended for restricted workspaces
                </span>
                <button
                  className="button ghost"
                  onClick={() => setToast("Verification setup opened")}
                >
                  Configure
                </button>
              </label>
            </div>
          )}
          <button
            className="button"
            onClick={() => {
              localStorage.setItem("lunaris-settings-tab", tab);
              setToast(`${tab} preferences saved locally`);
            }}
          >
            Save changes
          </button>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </AppShell>
  );
}

export function LearnPage() {
  return (
    <div className="public-page light-public">
      <PublicNav />
      <section className="public-title">
        <span className="eyebrow">Lunar field guide</span>
        <h1>
          Understand the environment
          <br />
          before reading the data.
        </h1>
        <p>Five foundational concepts make south polar mission conditions easier to interpret.</p>
      </section>
      <section className="learning-grid">
        {[
          [
            "01",
            Sun,
            "Solar elevation",
            "The angle of the Sun above the geometric local horizon. Positive elevation does not always mean terrain is illuminated.",
          ],
          [
            "02",
            Moon,
            "Lunar illumination",
            "Whether direct sunlight reaches a surface point after accounting for local terrain and obstruction.",
          ],
          [
            "03",
            Earth,
            "Earth visibility",
            "The Earth’s position relative to the local geometric and terrain horizon.",
          ],
          [
            "04",
            Radio,
            "Direct-to-Earth",
            "A potential communication path that still depends on antennas, terrain and link budget.",
          ],
          [
            "05",
            Mountain,
            "Terrain horizon",
            "The obstruction angle created by nearby ridges, crater rims and local relief.",
          ],
        ].map(([n, Icon, t, d]) => (
          <article key={String(n)}>
            <span>{n as string}</span>
            <Icon />
            <h2>{t as string}</h2>
            <p>{d as string}</p>
            <div className="concept-diagram">
              <i />
              <b />
            </div>
          </article>
        ))}
      </section>
      <PublicFooter />
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="public-page light-public">
      <PublicNav />
      <section className="public-title">
        <span className="eyebrow">About Lunaris</span>
        <h1>
          Make complex lunar planning
          <br />
          understandable and actionable.
        </h1>
        <p>
          LUNARIS is an independent hackathon demonstration exploring how mission environment data
          could become clearer, comparable and more useful.
        </p>
      </section>
      <section className="about-content">
        <div>
          <span className="eyebrow">Our premise</span>
          <h2>Decision support, not a black box.</h2>
        </div>
        <div>
          <p>
            Landing site feasibility is not one score. It is a conversation between terrain, time,
            solar geometry, Earth visibility and operational constraints.
          </p>
          <p>
            This frontend uses realistic but simulated values to demonstrate an interface
            architecture ready for validated scientific data services.
          </p>
          <div className="science-note">
            <ShieldCheck />
            <span>
              <b>Independent project</b>Not affiliated with, sponsored by, or endorsed by NASA or
              JPL.
            </span>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}

export function AuthPage({ mode }: { mode: "login" | "register" | "forgot" }) {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("Public Explorer");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const title =
    mode === "login"
      ? "Welcome back"
      : mode === "register"
        ? "Request access"
        : "Reset your password";
  return (
    <div className="auth-page">
      <div
        className="auth-visual"
        style={{
          backgroundImage: `linear-gradient(180deg,rgba(2,6,13,.05),#050912),url("${moonImage}")`,
        }}
      >
        <Logo />
        <div>
          <span className="eyebrow">Plan beyond the horizon</span>
          <h1>Mission clarity begins with context.</h1>
          <p>
            Explore, compare and communicate the conditions that shape lunar surface operations.
          </p>
        </div>
        <small>Independent demonstration · Not an official NASA product</small>
      </div>
      <div className="auth-form">
        <Link to="/" className="auth-back">
          ← Back to Lunaris
        </Link>
        <div className="auth-box">
          <span className="eyebrow">Lunaris access</span>
          <h2>{title}</h2>
          <p>
            {mode === "login"
              ? "Enter your credentials to open your workspace."
              : mode === "register"
                ? "Create a profile or submit a request for restricted access."
                : "We will send a demonstration reset link."}
          </p>
          {mode === "register" && (
            <>
              <FormField label="Full name">
                <input
                  placeholder="Your full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </FormField>
              <FormField label="Organization / institution">
                <input
                  placeholder="Organization name"
                  value={organization}
                  onChange={(event) => setOrganization(event.target.value)}
                />
              </FormField>
              <FormField label="Intended user category">
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option>Public Explorer</option>
                  <option>Researcher</option>
                  <option>Scientist / Mission Professional</option>
                </select>
              </FormField>
            </>
          )}
          <FormField
            label={mode === "register" ? "Institutional or personal email" : "Email address"}
          >
            <input
              type="email"
              placeholder="name@organization.edu"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormField>
          {mode !== "forgot" && (
            <FormField label="Password">
              <div className="password-field">
                <input
                  type={show ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button onClick={() => setShow(!show)}>
                  <Eye />
                </button>
              </div>
            </FormField>
          )}
          {mode === "register" && (
            <FormField label="Confirm password">
              <input
                type="password"
                placeholder="••••••••••"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
              />
            </FormField>
          )}
          {mode === "login" && (
            <FormField label="Demo workspace">
              <select value={role} onChange={(event) => setRole(event.target.value)}>
                <option>Public Explorer</option>
                <option>Researcher</option>
                <option>Scientist / Mission Professional</option>
                <option>Administrator</option>
              </select>
            </FormField>
          )}
          {mode === "login" && (
            <div className="form-options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          )}
          {mode === "register" && role !== "Public Explorer" && (
            <div className="access-notice">
              <LockKeyhole />
              <span>
                <b>Approval required</b>
                {role.includes("Researcher")
                  ? "Institutional email verification and administrator review are required."
                  : "Professional details and administrator approval are required."}
              </span>
            </div>
          )}
          {error && (
            <div className="form-error">
              <AlertTriangle />
              {error}
            </div>
          )}
          <button
            className="button full"
            onClick={() => {
              setError("");
              if (!email.includes("@")) {
                setError("Enter a valid email address to continue.");
                return;
              }
              if (mode !== "forgot" && password.length < 6) {
                setError("Use at least six characters for this demonstration.");
                return;
              }
              if (mode === "register" && (!name || !organization)) {
                setError("Add your name and organization before submitting.");
                return;
              }
              if (mode === "register" && password !== confirm) {
                setError("Passwords do not match.");
                return;
              }
              if (mode === "forgot") {
                nav("/access-status/email-verification");
                return;
              }
              if (mode === "register") {
                localStorage.setItem("lunaris-requested-role", role);
                nav(
                  role === "Public Explorer"
                    ? "/access-status/access-granted"
                    : role === "Researcher"
                      ? "/access-status/application-submitted"
                      : "/access-status/pending-approval",
                );
                return;
              }
              const destinations: Record<string, string> = {
                "Public Explorer": "/explore",
                Researcher: "/researcher/dashboard",
                "Scientist / Mission Professional": "/mission/dashboard",
                Administrator: "/admin/dashboard",
              };
              localStorage.setItem("lunaris-demo-role", role);
              nav(destinations[role]);
            }}
          >
            {mode === "login"
              ? "Sign in"
              : mode === "register"
                ? "Submit registration"
                : "Send reset link"}
            <ArrowRight />
          </button>
          {mode === "login" && (
            <button
              className="button ghost full"
              onClick={() => setError("Google sign-in is unavailable in this local demonstration.")}
            >
              <Globe2 />
              Continue with Google <small>Placeholder</small>
            </button>
          )}
          <div className="auth-switch">
            {mode === "login" ? (
              <>
                New to Lunaris? <Link to="/register">Create account</Link>
              </>
            ) : (
              <>
                Already registered? <Link to="/login">Sign in</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccessStatusPage() {
  const { state = "pending-approval" } = useParams();
  const content: Record<
    string,
    { icon: React.ElementType; eyebrow: string; title: string; body: string; status: string }
  > = {
    "email-verification": {
      icon: Mail,
      eyebrow: "Verification required",
      title: "Check your inbox",
      body: "A demonstration verification message has been prepared. No real email is sent by this frontend.",
      status: "Email verification",
    },
    "application-submitted": {
      icon: FileText,
      eyebrow: "Application submitted",
      title: "Your research access request is in review",
      body: "Institutional context must be reviewed by an administrator before researcher permissions are granted.",
      status: "Pending review",
    },
    "pending-approval": {
      icon: Clock3,
      eyebrow: "Administrator approval",
      title: "Mission access is restricted for now",
      body: "Scientist permissions require professional details and explicit administrator approval.",
      status: "Pending approval",
    },
    "access-granted": {
      icon: UserCheck,
      eyebrow: "Access granted",
      title: "Your explorer workspace is ready",
      body: "You can begin exploring simulated lunar environments and public educational content.",
      status: "Active",
    },
    "access-denied": {
      icon: X,
      eyebrow: "Access decision",
      title: "This request was not approved",
      body: "Contact an administrator with updated institution or mission affiliation details.",
      status: "Access denied",
    },
    suspended: {
      icon: LockKeyhole,
      eyebrow: "Account suspended",
      title: "Workspace access is temporarily unavailable",
      body: "An administrator must review this account before access can be restored.",
      status: "Suspended",
    },
  };
  const item = content[state] || content["pending-approval"];
  const Icon = item.icon;
  return (
    <div className="status-page">
      <Logo />
      <div className="status-card panel">
        <div className="status-orbit">
          <Icon />
        </div>
        <span className="eyebrow">{item.eyebrow}</span>
        <h1>{item.title}</h1>
        <p>{item.body}</p>
        <StatusPill status={item.status} />
        <div className="status-actions">
          <Link className="button ghost" to="/login">
            Return to sign in
          </Link>
          {state === "access-granted" && (
            <Link className="button" to="/explore">
              Open explorer <ArrowRight size={14} />
            </Link>
          )}
        </div>
        <small>SIMULATED ACCESS FLOW · NO ACCOUNT OR EMAIL WAS CREATED</small>
      </div>
    </div>
  );
}

export function AccessBoundary({
  role,
  children,
}: {
  role: "Researcher" | "Scientist / Mission Professional" | "Administrator";
  children: React.ReactNode;
}) {
  const [demoAccess, setDemoAccess] = useState(
    () => localStorage.getItem("lunaris-demo-role") === role,
  );
  if (demoAccess) return <>{children}</>;
  const label =
    role === "Scientist / Mission Professional"
      ? "Mission Control"
      : role === "Administrator"
        ? "Administration"
        : "Researcher Workspace";
  return (
    <div className="status-page restricted-page">
      <Logo />
      <div className="status-card panel">
        <div className="status-orbit">
          <LockKeyhole />
        </div>
        <span className="eyebrow">Role-protected workspace</span>
        <h1>{label} requires approved access</h1>
        <p>
          In production, this route requires a verified account with the matching role. You can
          enter a clearly labeled local demonstration session without creating an account.
        </p>
        <StatusPill status="Access restricted" />
        <div className="status-actions">
          <Link className="button ghost" to="/login">
            Sign in with a role
          </Link>
          <button
            className="button"
            onClick={() => {
              localStorage.setItem("lunaris-demo-role", role);
              setDemoAccess(true);
            }}
          >
            Enter demo workspace <ArrowRight size={14} />
          </button>
        </div>
        <small>FRONTEND ROLE AUTHORIZATION · DEMONSTRATION SESSION ONLY</small>
      </div>
    </div>
  );
}

export function AdminPage() {
  const key = location.pathname.split("/").pop() || "dashboard";
  const [toast, setToast] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [users, setUsers] = useState([
    ["Maya Chen", "maya@luna.edu", "Lunar Research Lab", "Researcher", "Pending"],
    ["James Okafor", "j.okafor@orbital.space", "Orbital Systems", "Scientist", "Pending"],
    ["Priya Nair", "priya@astro.ac.in", "National Astro Institute", "Researcher", "Approved"],
    ["Noah Williams", "noah@example.com", "—", "Public", "Active"],
  ]);
  const handleUserAction = (message: string, email?: string, status?: string) => {
    if (email && status) {
      setUsers((current) =>
        current.map((user) => (user[1] === email ? [...user.slice(0, 4), status] : user)),
      );
    }
    setToast(message);
  };
  if (key === "dashboard")
    return (
      <AppShell role="admin">
        <PageHeader
          eyebrow="Administration"
          title="Access Operations"
          description="Review platform access, approvals and account health."
        />
        <div className="metric-grid five">
          <MetricCard label="Registered users" value="1,248" detail="+42 this month" icon={Users} />
          <MetricCard label="Public users" value="986" detail="79% of accounts" icon={Globe2} />
          <MetricCard
            label="Pending approvals"
            value="18"
            detail="Requires action"
            tone="gold"
            icon={Clock3}
          />
          <MetricCard
            label="Approved research"
            value="227"
            detail="Verified users"
            tone="green"
            icon={UserCheck}
          />
          <MetricCard
            label="Suspended"
            value="03"
            detail="Security review"
            tone="red"
            icon={LockKeyhole}
          />
        </div>
        <div className="panel">
          <div className="panel-title">
            <span>Recent access requests</span>
            <Link to="/admin/approvals">
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <AdminTable users={users} onAction={handleUserAction} />
        </div>
        {toast && <Toast message={toast} onClose={() => setToast("")} />}
      </AppShell>
    );
  if (key === "roles")
    return (
      <AppShell role="admin">
        <PageHeader
          title="Roles & Permissions"
          description="Control workspace capabilities without relying on email domain alone."
        />
        <div className="roles-grid">
          {["Public", "Researcher", "Scientist", "Administrator"].map((r, i) => (
            <div className="panel role-card" key={r}>
              <ShieldCheck />
              <h3>{r}</h3>
              <p>{[986, 184, 43, 5][i]} accounts</p>
              {[
                "Site access",
                "Dataset access",
                "Export permissions",
                "Custom coordinates",
                "Advanced analysis",
              ].map((p, j) => (
                <label key={p}>
                  <input type="checkbox" defaultChecked={j < i + 2} />
                  {p}
                </label>
              ))}
              <button
                className="button ghost full"
                onClick={() => setToast(`${r} permissions saved for this demo session`)}
              >
                Save permissions
              </button>
            </div>
          ))}
        </div>
        {toast && <Toast message={toast} onClose={() => setToast("")} />}
      </AppShell>
    );
  if (key === "audit-logs")
    return (
      <AppShell role="admin">
        <PageHeader
          title="Audit Logs"
          description="Trace important access and administrative actions."
        />
        <div className="panel">
          <DataTable
            headers={["Timestamp", "Administrator", "Action", "Account", "Result"]}
            rows={users.map((u, i) => [
              `2030-08-18 ${14 - i}:2${i} UTC`,
              "Admin Ops",
              i % 2 ? "Access approved" : "Application reviewed",
              u[0],
              <StatusPill status="Complete" />,
            ])}
          />
        </div>
      </AppShell>
    );
  return (
    <AppShell role="admin">
      <PageHeader
        title={key === "approvals" ? "Access Approvals" : "User Management"}
        description={
          key === "approvals"
            ? "Verify institutional context before granting restricted privileges."
            : "Search, review and manage user access."
        }
      />
      <div className="filter-row">
        <label>
          <Search />
          <input
            placeholder="Search name, email or institution"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        {["All", "Pending", "Approved"].map((option) => (
          <button
            key={option}
            className={`filter ${statusFilter === option ? "active" : ""}`}
            onClick={() => setStatusFilter(option)}
          >
            {option === "All" ? "All requests" : option}
          </button>
        ))}
      </div>
      <div className="panel">
        <AdminTable
          users={users.filter(
            (user) =>
              user.some((value) => value.toLowerCase().includes(query.toLowerCase())) &&
              (statusFilter === "All" || user[4] === statusFilter),
          )}
          onAction={handleUserAction}
        />
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </AppShell>
  );
}
function AdminTable({
  users,
  onAction,
}: {
  users: string[][];
  onAction: (message: string, email?: string, status?: string) => void;
}) {
  return (
    <DataTable
      headers={["User", "Email", "Institution", "Requested role", "Status", "Actions"]}
      rows={users.map((u) => [
        u[0],
        u[1],
        u[2],
        u[3],
        <StatusPill status={u[4]} />,
        <div className="table-buttons">
          <button onClick={() => onAction(`${u[0]} approved`, u[1], "Approved")}>
            <Check />
          </button>
          <button onClick={() => onAction(`${u[0]} access declined`, u[1], "Denied")}>
            <X />
          </button>
          <button onClick={() => onAction(`${u[0]} account details opened`)}>•••</button>
        </div>,
      ])}
    />
  );
}

export function NotFound() {
  return (
    <div className="not-found">
      <Logo />
      <Orbit />
      <span>404 · SIGNAL LOST</span>
      <h1>This trajectory leads beyond the mapped workspace.</h1>
      <ButtonLink to="/">Return to mission home</ButtonLink>
    </div>
  );
}
