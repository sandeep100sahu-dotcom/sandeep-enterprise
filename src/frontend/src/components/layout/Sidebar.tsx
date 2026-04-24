import { Badge } from "@/components/ui/badge";
import { useDashboardStats } from "@/hooks/use-dashboard";
import { useLowStockItems } from "@/hooks/use-items";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import type { Role } from "@/types/erp";
import { Link, useLocation } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowDownToLine,
  BarChart3,
  ChevronRight,
  LayoutDashboard,
  Package,
  PackageOpen,
  Settings,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  allowedRoles: Role[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    allowedRoles: ["admin", "manager", "storeUser", "purchaseUser"],
  },
  {
    label: "Item Master",
    path: "/items",
    icon: Package,
    allowedRoles: ["admin", "manager", "storeUser"],
  },
  {
    label: "Material Inward",
    path: "/inward",
    icon: ArrowDownToLine,
    allowedRoles: ["admin", "manager", "storeUser"],
  },
  {
    label: "Material Issue",
    path: "/issue",
    icon: PackageOpen,
    allowedRoles: ["admin", "manager", "storeUser"],
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
    allowedRoles: ["admin", "manager", "storeUser", "purchaseUser"],
  },
  {
    label: "Admin Settings",
    path: "/settings",
    icon: Settings,
    allowedRoles: ["admin", "purchaseUser"],
  },
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen, currentUser } = useAppStore((s) => ({
    sidebarOpen: s.sidebarOpen,
    setSidebarOpen: s.setSidebarOpen,
    currentUser: s.currentUser,
  }));
  const location = useLocation();
  const isAuthenticated = !!currentUser;
  const { data: lowStockItems } = useLowStockItems({
    enabled: isAuthenticated,
  });
  const { data: stats } = useDashboardStats({ enabled: isAuthenticated });
  const lowStockCount = lowStockItems?.length ?? 0;
  const todayActivity =
    (stats?.todayInwardCount ?? 0) + (stats?.todayIssueCount ?? 0);
  const userRole = currentUser?.role ?? "storeUser";
  const visibleItems = NAV_ITEMS.filter((item) =>
    item.allowedRoles.includes(userRole),
  );

  const getBadge = (item: NavItem) => {
    if (item.path === "/items" && lowStockCount > 0)
      return { count: lowStockCount, variant: "destructive" as const };
    if (
      (item.path === "/inward" || item.path === "/issue") &&
      todayActivity > 0
    )
      return { count: todayActivity, variant: "default" as const };
    return null;
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden"
          role="button"
          tabIndex={0}
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 flex flex-col",
          "bg-sidebar border-r border-sidebar-border",
          "transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:z-auto lg:flex",
        )}
        data-ocid="sidebar.panel"
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-sidebar-border shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-sidebar-primary shrink-0">
              <Package className="w-4 h-4 text-sidebar-primary-foreground" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-sm font-bold text-sidebar-foreground leading-none">
                Sandeep Enterprise
              </p>
              <p className="text-[10px] text-sidebar-foreground/50 uppercase tracking-widest leading-none mt-0.5">
                And Co.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="lg:hidden rounded-sm p-1 hover:bg-sidebar-accent/20 text-sidebar-foreground/60 transition-smooth"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User badge */}
        {currentUser && (
          <div className="px-4 pt-3 pb-1">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-sm bg-sidebar-accent/20 border border-sidebar-border/50">
              <div className="w-6 h-6 rounded-full bg-sidebar-primary/20 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-sidebar-primary uppercase">
                  {currentUser.username.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-sidebar-foreground truncate">
                  {currentUser.username}
                </p>
                <p className="text-[10px] text-sidebar-foreground/50 capitalize">
                  {currentUser.role.replace(/([A-Z])/g, " $1").trim()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav
          className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5"
          data-ocid="sidebar.nav"
        >
          {visibleItems.map((item) => {
            const badge = getBadge(item);
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "sidebar-item flex items-center gap-3 w-full text-sm",
                  isActive
                    ? "sidebar-item-active font-medium"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground",
                )}
                data-ocid={`sidebar.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
                {badge && (
                  <Badge
                    variant={badge.variant}
                    className="h-4 min-w-[1.25rem] text-[10px] px-1"
                  >
                    {badge.count}
                  </Badge>
                )}
                {isActive && !badge && (
                  <ChevronRight className="w-3 h-3 opacity-50 shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {lowStockCount > 0 && (
          <div className="px-3 pb-3">
            <div className="alert-amber rounded-sm px-3 py-2 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span className="text-xs">
                {lowStockCount} item{lowStockCount !== 1 ? "s" : ""} below
                minimum
              </span>
            </div>
          </div>
        )}
        <div className="h-4 shrink-0" />
      </aside>
    </>
  );
}
