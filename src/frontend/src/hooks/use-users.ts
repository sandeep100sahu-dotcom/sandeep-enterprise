import { useAppStore } from "@/store/app-store";
import type { AuditLog, CategoryPublic, UserProfilePublic } from "@/types/erp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const SEED_USERS: UserProfilePublic[] = [
  {
    id: "admin-001",
    username: "admin",
    role: "admin",
    isActive: true,
    lastLoginAt: "2025-04-24T07:30:00Z",
  },
  {
    id: "store-001",
    username: "store.user",
    role: "storeUser",
    isActive: true,
    lastLoginAt: "2025-04-24T08:00:00Z",
  },
  {
    id: "purchase-001",
    username: "purchase.user",
    role: "purchaseUser",
    isActive: true,
    lastLoginAt: "2025-04-23T15:45:00Z",
  },
  {
    id: "manager-001",
    username: "manager",
    role: "manager",
    isActive: true,
    lastLoginAt: "2025-04-24T09:00:00Z",
  },
];

const SEED_AUDIT: AuditLog[] = [
  {
    id: "1",
    userId: "admin-001",
    action: "CREATE",
    moduleName: "Item Master",
    entityId: "BRG-0147",
    oldValue: "",
    newValue: "Added item Bearing 6205 ZZ",
    timestamp: "2025-04-20T09:00:00Z",
  },
  {
    id: "2",
    userId: "store-001",
    action: "UPDATE",
    moduleName: "Material Inward",
    entityId: "GRN-2025-0041",
    oldValue: "pending",
    newValue: "approved",
    timestamp: "2025-04-20T09:20:00Z",
  },
  {
    id: "3",
    userId: "store-001",
    action: "CREATE",
    moduleName: "Material Issue",
    entityId: "ISS-2025-0118",
    oldValue: "",
    newValue: "Emergency issue for Rolling Mill",
    timestamp: "2025-04-23T08:45:00Z",
  },
];

export function useCurrentUserProfile() {
  const currentUser = useAppStore((s) => s.currentUser);
  return useQuery<UserProfilePublic | null>({
    queryKey: ["user-profile", currentUser?.principal],
    queryFn: async () => {
      if (!currentUser) return null;
      return (
        SEED_USERS.find((u) => u.username === currentUser.username) ?? null
      );
    },
    enabled: !!currentUser,
  });
}

export function useListUsers() {
  return useQuery<UserProfilePublic[]>({
    queryKey: ["users"],
    queryFn: async () => SEED_USERS,
    placeholderData: [],
  });
}

export function useDeactivateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => userId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useAuditLogs() {
  return useQuery<AuditLog[]>({
    queryKey: ["audit-logs"],
    queryFn: async () => SEED_AUDIT,
    placeholderData: [],
  });
}

export function useListCategories() {
  return useQuery<CategoryPublic[]>({
    queryKey: ["categories-admin"],
    queryFn: async () => [
      {
        id: "1",
        name: "Bearings",
        subcategories: ["Deep Groove", "Taper Roller", "Thrust", "Needle"],
      },
      {
        id: "2",
        name: "Hydraulics",
        subcategories: ["Seals", "Hoses", "Pumps", "Valves"],
      },
      {
        id: "3",
        name: "Electrical",
        subcategories: ["Contactors", "Relays", "Cables", "Motors"],
      },
    ],
    placeholderData: [],
  });
}

export function useAddCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cat: Omit<CategoryPublic, "id">) => ({
      ...cat,
      id: Date.now().toString(),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories-admin"] });
    },
  });
}
