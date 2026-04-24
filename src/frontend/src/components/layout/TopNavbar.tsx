import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/app-store";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Monitor,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useEffect } from "react";

export function TopNavbar() {
  const {
    toggleSidebar,
    theme,
    setTheme,
    currentUser,
    setCurrentUser,
    globalSearchQuery,
    setGlobalSearchQuery,
  } = useAppStore();
  const { clear } = useInternetIdentity();
  const navigate = useNavigate();

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else if (theme === "light") root.classList.remove("dark");
    else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (prefersDark) root.classList.add("dark");
      else root.classList.remove("dark");
    }
  }, [theme]);

  const handleLogout = () => {
    clear();
    setCurrentUser(null);
    navigate({ to: "/login" });
  };

  const ThemeIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const nextTheme =
    theme === "dark" ? "light" : theme === "light" ? "system" : "dark";

  return (
    <header
      className="h-14 flex items-center gap-3 px-4 bg-card border-b border-border shrink-0"
      data-ocid="navbar.panel"
    >
      {/* Hamburger */}
      <button
        type="button"
        className="lg:hidden p-1.5 rounded-sm hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        data-ocid="navbar.hamburger_button"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Brand (mobile) */}
      <div className="lg:hidden flex items-center gap-2 mr-2">
        <span className="font-display text-sm font-bold text-foreground">
          Sandeep Enterprise
        </span>
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          And Co.
        </span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl relative" data-ocid="navbar.search_input">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Search inventory, items, reports…"
          value={globalSearchQuery}
          onChange={(e) => setGlobalSearchQuery(e.target.value)}
          className="pl-9 h-8 bg-muted/50 border-input text-sm"
          data-ocid="navbar.search.input"
        />
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={() => setTheme(nextTheme)}
          className="p-2 rounded-sm hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
          aria-label={`Switch to ${nextTheme} theme`}
          data-ocid="navbar.theme_toggle"
        >
          <ThemeIcon className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 rounded-sm hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
          aria-label="Notifications"
          data-ocid="navbar.notifications_button"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-destructive" />
        </button>

        {/* User dropdown */}
        {currentUser && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 h-8 px-2"
                data-ocid="navbar.user_menu_button"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary uppercase">
                    {currentUser.username.charAt(0)}
                  </span>
                </div>
                <span className="hidden sm:block text-xs font-medium max-w-[100px] truncate">
                  {currentUser.username}
                </span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48"
              data-ocid="navbar.user_dropdown_menu"
            >
              <div className="px-3 py-2">
                <p className="text-xs font-semibold truncate">
                  {currentUser.username}
                </p>
                <p className="text-[10px] text-muted-foreground capitalize mt-0.5">
                  {currentUser.role.replace(/([A-Z])/g, " $1").trim()}
                </p>
                {currentUser.lastLoginAt && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Last:{" "}
                    {new Date(currentUser.lastLoginAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem data-ocid="navbar.profile_button">
                <User className="w-3.5 h-3.5 mr-2" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate({ to: "/settings" })}
                data-ocid="navbar.settings_button"
              >
                <Settings className="w-3.5 h-3.5 mr-2" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={handleLogout}
                data-ocid="navbar.logout_button"
              >
                <LogOut className="w-3.5 h-3.5 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
