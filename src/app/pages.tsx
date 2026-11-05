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
                <button className="icon-button">
                  <Target />
                </button>
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
              <button className="active">Globe</button>
              <button>South polar map</button>
            </div>
            <DemoBadge />
          </div>
          <MoonGlobe selected={selected} onSelect={setSelected} />
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
  const filtered = sites.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.region.toLowerCase().includes(query.toLowerCase()),
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
        <button className="filter active">All sites</button>
        <button className="filter">Candidate</button>
        <button className="filter">Historic</button>
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
  return (
    <AppShell role="public">
      <PageHeader
        eyebrow={`${site.type} site · ${site.region}`}
        title={site.name}
        description={site.note}
        actions={
          <>
            <button className="button ghost">
              <Save size={15} />
              Save
            </button>
            <button className="button">
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
    </AppShell>
  );
}

export function WorkspaceDashboard({ role }: { role: "researcher" | "mission" }) {
  const isMission = role === "mission";
  const [selected, setSelected] = useState(0);
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
            <button className="button ghost">
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
              <button className="chip active">Terrain</button>
              <button className="chip">Shadows</button>
              <button className="chip">Sites</button>
            </div>
          </div>
          <MoonGlobe selected={selected} onSelect={setSelected} compact />
        </div>
        <div className="panel scenario-panel">
          <div className="panel-title">
            <span>{isMission ? "Selected mission scenario" : "Selected analysis"}</span>
            <button>•••</button>
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
    </AppShell>
  );
}

export function ToolPage({ role }: { role: "researcher" | "mission" }) {
  const params = location.pathname.split("/").filter(Boolean);
  const key = params[params.length - 1];
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
            <button className="button ghost">
              <Download size={15} />
              Export data
            </button>
            <button className="button">
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
              onClick={() =>
                setList([...list, { ...scenarios[0], name: "New scenario", site: "Nobile Region" }])
              }
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
  return (
    <AppShell role={role}>
      <PageHeader
        title={role === "mission" ? "Scientific Data Center" : "Dataset Explorer"}
        description="Review source coverage, resolution and integration readiness. No live scientific service is queried in this demo."
        actions={
          <button className="button ghost">
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
            <button className="button ghost full">
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
            <input defaultValue="Lunar South Pole Site Assessment" />
          </FormField>
          <FormField label="Selected sites">
            <select>
              <option>Shackleton Rim, Malapert Massif</option>
            </select>
          </FormField>
          <FormField label="Mission window">
            <input defaultValue="18–21 August 2030" />
          </FormField>
          <FormField label="Research notes">
            <textarea defaultValue="Comparison of simulated power and direct-to-Earth geometry for candidate surface operations." />
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
            <h2>
              Lunar South Pole
              <br />
              Site Assessment
            </h2>
            <p>Demonstration report · 18 August 2030</p>
            <div className="report-hero" />
            <h3>Executive summary</h3>
            <p>
              Shackleton Rim and Malapert Massif present distinct power and communication
              trade-offs. All values in this report are simulated.
            </p>
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
  return (
    <AppShell role="researcher">
      <PageHeader
        title="Saved Scenarios"
        description="Return to demonstration analyses and continue your work."
        actions={
          <button className="button">
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
            <button className="table-action">
              Open <ArrowRight size={13} />
            </button>,
          ])}
        />
      </div>
    </AppShell>
  );
}

function SettingsPage({ role }: { role: "researcher" | "mission" }) {
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
          <button className="active">General</button>
          <button>Display & units</button>
          <button>Notifications</button>
          <button>Data attribution</button>
          <button>Access & security</button>
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
            <FormField label="Default units">
              <select>
                <option>Metric · Degrees</option>
                <option>Metric · Radians</option>
              </select>
            </FormField>
          </div>
          <button className="button">Save changes</button>
        </div>
      </div>
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
                <input placeholder="Your full name" />
              </FormField>
              <FormField label="Organization / institution">
                <input placeholder="Organization name" />
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
            <input type="email" placeholder="name@organization.edu" />
          </FormField>
          {mode !== "forgot" && (
            <FormField label="Password">
              <div className="password-field">
                <input type={show ? "text" : "password"} placeholder="••••••••••" />
                <button onClick={() => setShow(!show)}>
                  <Eye />
                </button>
              </div>
            </FormField>
          )}
          {mode === "register" && (
            <FormField label="Confirm password">
              <input type="password" placeholder="••••••••••" />
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
          <button
            className="button full"
            onClick={() => nav(mode === "login" ? "/mission/dashboard" : "/login")}
          >
            {mode === "login"
              ? "Sign in"
              : mode === "register"
                ? "Submit registration"
                : "Send reset link"}
            <ArrowRight />
          </button>
          {mode === "login" && (
            <button className="button ghost full">
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

export function AdminPage() {
  const key = location.pathname.split("/").pop() || "dashboard";
  const [toast, setToast] = useState("");
  const users = [
    ["Maya Chen", "maya@luna.edu", "Lunar Research Lab", "Researcher", "Pending"],
    ["James Okafor", "j.okafor@orbital.space", "Orbital Systems", "Scientist", "Pending"],
    ["Priya Nair", "priya@astro.ac.in", "National Astro Institute", "Researcher", "Approved"],
    ["Noah Williams", "noah@example.com", "—", "Public", "Active"],
  ];
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
          <AdminTable users={users} onAction={setToast} />
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
              <button className="button ghost full">Edit permissions</button>
            </div>
          ))}
        </div>
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
          <input placeholder="Search name, email or institution" />
        </label>
        <button className="filter active">All requests</button>
        <button className="filter">Pending</button>
        <button className="filter">Approved</button>
      </div>
      <div className="panel">
        <AdminTable users={users} onAction={setToast} />
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </AppShell>
  );
}
function AdminTable({ users, onAction }: { users: string[][]; onAction: (x: string) => void }) {
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
          <button onClick={() => onAction(`${u[0]} approved`)}>
            <Check />
          </button>
          <button onClick={() => onAction(`${u[0]} access declined`)}>
            <X />
          </button>
          <button>•••</button>
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
