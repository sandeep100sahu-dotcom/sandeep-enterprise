import type { AppUser, Role } from "@/types/erp";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  // Auth
  currentUser: AppUser | null;
  setCurrentUser: (user: AppUser | null) => void;

  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Theme
  theme: "dark" | "light" | "system";
  setTheme: (theme: "dark" | "light" | "system") => void;

  // Search
  globalSearchQuery: string;
  setGlobalSearchQuery: (q: string) => void;

  // Role guard helper
  hasAccess: (requiredRoles: Role[]) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),

      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      theme: "dark",
      setTheme: (theme) => set({ theme }),

      globalSearchQuery: "",
      setGlobalSearchQuery: (q) => set({ globalSearchQuery: q }),

      hasAccess: (requiredRoles) => {
        const user = get().currentUser;
        if (!user) return false;
        if (user.role === "admin") return true;
        return requiredRoles.includes(user.role);
      },
    }),
    {
      name: "steelstore-app",
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        currentUser: state.currentUser,
      }),
    },
  ),
);
