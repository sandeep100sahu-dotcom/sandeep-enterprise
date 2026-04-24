import { Layout } from "@/components/layout/Layout";
import { PageSkeleton } from "@/components/ui/LoadingSkeleton";
import LoginPage from "@/pages/LoginPage";
import { useAppStore } from "@/store/app-store";
import {
  Navigate,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-load pages
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ItemsPage = lazy(() => import("@/pages/ItemsPage"));
const InwardPage = lazy(() => import("@/pages/InwardPage"));
const IssuePage = lazy(() => import("@/pages/IssuePage"));
const ReportsPage = lazy(() => import("@/pages/ReportsPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const currentUser = useAppStore((s) => s.currentUser);
  if (!currentUser) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="p-6">
          <PageSkeleton />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

// Root route
const rootRoute = createRootRoute();

// Login route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Redirect from root to dashboard or login
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function IndexPage() {
    const currentUser = useAppStore((s) => s.currentUser);
    if (!currentUser) return <Navigate to="/login" />;
    return (
      <ProtectedLayout>
        <PageWrapper>
          <DashboardPage />
        </PageWrapper>
      </ProtectedLayout>
    );
  },
});

const itemsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/items",
  component: function ItemsRoute() {
    return (
      <ProtectedLayout>
        <PageWrapper>
          <ItemsPage />
        </PageWrapper>
      </ProtectedLayout>
    );
  },
});

const inwardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inward",
  component: function InwardRoute() {
    return (
      <ProtectedLayout>
        <PageWrapper>
          <InwardPage />
        </PageWrapper>
      </ProtectedLayout>
    );
  },
});

const issueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/issue",
  component: function IssueRoute() {
    return (
      <ProtectedLayout>
        <PageWrapper>
          <IssuePage />
        </PageWrapper>
      </ProtectedLayout>
    );
  },
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: function ReportsRoute() {
    return (
      <ProtectedLayout>
        <PageWrapper>
          <ReportsPage />
        </PageWrapper>
      </ProtectedLayout>
    );
  },
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: function SettingsRoute() {
    return (
      <ProtectedLayout>
        <PageWrapper>
          <SettingsPage />
        </PageWrapper>
      </ProtectedLayout>
    );
  },
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  indexRoute,
  itemsRoute,
  inwardRoute,
  issueRoute,
  reportsRoute,
  settingsRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
