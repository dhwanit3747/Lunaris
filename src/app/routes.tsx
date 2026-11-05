import { createBrowserRouter } from "react-router";
import {
  AboutPage,
  AccessBoundary,
  AccessStatusPage,
  AdminPage,
  AuthPage,
  ExplorePage,
  LandingPage,
  LearnPage,
  NotFound,
  SitePage,
  SitesPage,
  ToolPage,
  WorkspaceDashboard,
} from "./pages";

const researcherTools = [
  "explorer",
  "compare",
  "analytics",
  "datasets",
  "reports",
  "saved-scenarios",
  "profile",
];
const missionTools = [
  "planner",
  "site-analysis",
  "compare",
  "terrain",
  "illumination",
  "communications",
  "timeline",
  "optimization",
  "data-center",
  "reports",
  "settings",
];

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  { path: "/explore", Component: ExplorePage },
  { path: "/explore/sites", Component: SitesPage },
  { path: "/explore/site/:id", Component: SitePage },
  { path: "/learn", Component: LearnPage },
  { path: "/about", Component: AboutPage },
  { path: "/login", element: <AuthPage mode="login" /> },
  { path: "/register", element: <AuthPage mode="register" /> },
  { path: "/forgot-password", element: <AuthPage mode="forgot" /> },
  { path: "/access-status/:state", Component: AccessStatusPage },
  {
    path: "/researcher/dashboard",
    element: (
      <AccessBoundary role="Researcher">
        <WorkspaceDashboard role="researcher" />
      </AccessBoundary>
    ),
  },
  ...researcherTools.map((path) => ({
    path: `/researcher/${path}`,
    element: (
      <AccessBoundary role="Researcher">
        <ToolPage role="researcher" />
      </AccessBoundary>
    ),
  })),
  {
    path: "/mission/dashboard",
    element: (
      <AccessBoundary role="Scientist / Mission Professional">
        <WorkspaceDashboard role="mission" />
      </AccessBoundary>
    ),
  },
  ...missionTools.map((path) => ({
    path: `/mission/${path}`,
    element: (
      <AccessBoundary role="Scientist / Mission Professional">
        <ToolPage role="mission" />
      </AccessBoundary>
    ),
  })),
  ...["dashboard", "users", "approvals", "roles", "audit-logs"].map((path) => ({
    path: `/admin/${path}`,
    element: (
      <AccessBoundary role="Administrator">
        <AdminPage />
      </AccessBoundary>
    ),
  })),
  { path: "*", Component: NotFound },
]);
