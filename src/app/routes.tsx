import { createBrowserRouter } from "react-router";
import {
  AboutPage,
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
  { path: "/researcher/dashboard", element: <WorkspaceDashboard role="researcher" /> },
  ...researcherTools.map((path) => ({
    path: `/researcher/${path}`,
    element: <ToolPage role="researcher" />,
  })),
  { path: "/mission/dashboard", element: <WorkspaceDashboard role="mission" /> },
  ...missionTools.map((path) => ({
    path: `/mission/${path}`,
    element: <ToolPage role="mission" />,
  })),
  { path: "/admin/dashboard", Component: AdminPage },
  { path: "/admin/users", Component: AdminPage },
  { path: "/admin/approvals", Component: AdminPage },
  { path: "/admin/roles", Component: AdminPage },
  { path: "/admin/audit-logs", Component: AdminPage },
  { path: "*", Component: NotFound },
]);
