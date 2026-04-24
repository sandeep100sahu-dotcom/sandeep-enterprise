import type { CategoryPublic, ItemPublic } from "@/types/erp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBackend } from "./use-backend";

// ── Seed Data (used when backend has no items yet) ──────────────────────────
const SEED_ITEMS: ItemPublic[] = [
  {
    id: "1",
    code: "BRG-0147",
    name: "Bearing Deep Groove Ball 6205 ZZ",
    category: "Bearings",
    subcategory: "Deep Groove",
    description: "SKF Deep Groove Ball Bearing 6205 ZZ, 25×52×15mm",
    unit: "PCS",
    brand: "SKF",
    size: "25x52x15mm",
    rackLocation: "A-01-03",
    minimumStock: 10,
    preferredSupplier: "SKF Distributors",
    gstHsn: "84821011",
    photo: "",
    currentStock: 45,
    lastPurchaseRate: 850,
    isActive: true,
  },
  {
    id: "2",
    code: "HYD-0231",
    name: "Hydraulic Cylinder Seal Kit",
    category: "Hydraulics",
    subcategory: "Seals",
    description:
      "80mm bore hydraulic cylinder seal kit with O-ring and wiper seal",
    unit: "SET",
    brand: "Parker",
    size: "80mm bore",
    rackLocation: "B-02-07",
    minimumStock: 5,
    preferredSupplier: "Parker Hannifin India",
    gstHsn: "84841000",
    photo: "",
    currentStock: 3,
    lastPurchaseRate: 2200,
    isActive: true,
  },
  {
    id: "3",
    code: "ELC-0089",
    name: "Contactor 3-Phase 40A",
    category: "Electrical",
    subcategory: "Contactors",
    description: "L&T MK-5 3-phase AC contactor 40A 415V coil 240V",
    unit: "PCS",
    brand: "L&T",
    size: "40A",
    rackLocation: "C-04-02",
    minimumStock: 4,
    preferredSupplier: "L&T Authorized Dealer",
    gstHsn: "85364900",
    photo: "",
    currentStock: 8,
    lastPurchaseRate: 3450,
    isActive: true,
  },
  {
    id: "4",
    code: "LUB-0055",
    name: "Gear Oil EP-90 (20L)",
    category: "Lubricants",
    subcategory: "Gear Oil",
    description: "Servo Gear EP-90 extreme pressure gear oil, 20 litre can",
    unit: "CAN",
    brand: "Servo",
    size: "20L",
    rackLocation: "D-01-01",
    minimumStock: 8,
    preferredSupplier: "IOC Distributor",
    gstHsn: "27101990",
    photo: "",
    currentStock: 2,
    lastPurchaseRate: 1850,
    isActive: true,
  },
  {
    id: "5",
    code: "V-BLT-112",
    name: "V-Belt B-58",
    category: "Transmission",
    subcategory: "V-Belts",
    description: "Gates B-58 classical V-belt for conveyor drive pulley",
    unit: "PCS",
    brand: "Gates",
    size: "B-58",
    rackLocation: "A-03-06",
    minimumStock: 6,
    preferredSupplier: "Gates Distributors",
    gstHsn: "40103900",
    photo: "",
    currentStock: 12,
    lastPurchaseRate: 320,
    isActive: true,
  },
  {
    id: "6",
    code: "HSP-0441",
    name: 'High Pressure Hose 3/4" × 1m',
    category: "Hydraulics",
    subcategory: "Hoses",
    description: "SAE 100R2AT hydraulic hose 3/4 inch × 1 meter with fittings",
    unit: "PCS",
    brand: "Alfagomma",
    size: '3/4" × 1m',
    rackLocation: "B-03-04",
    minimumStock: 6,
    preferredSupplier: "Alfagomma India",
    gstHsn: "40094200",
    photo: "",
    currentStock: 0,
    lastPurchaseRate: 1400,
    isActive: true,
  },
];

const SEED_CATEGORIES: CategoryPublic[] = [
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
  {
    id: "4",
    name: "Lubricants",
    subcategories: ["Gear Oil", "Grease", "Coolant", "Hydraulic Oil"],
  },
  {
    id: "5",
    name: "Transmission",
    subcategories: ["V-Belts", "Couplings", "Gearboxes", "Chains"],
  },
];

export function useItems(search?: string) {
  return useQuery<ItemPublic[]>({
    queryKey: ["items", search],
    queryFn: async () =>
      SEED_ITEMS.filter(
        (item) =>
          !search ||
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.code.toLowerCase().includes(search.toLowerCase()),
      ),
    placeholderData: [],
  });
}

export function useItem(id: string) {
  return useQuery<ItemPublic | null>({
    queryKey: ["item", id],
    queryFn: async () => SEED_ITEMS.find((i) => i.id === id) ?? null,
    enabled: !!id,
  });
}

export function useLowStockItems(options?: { enabled?: boolean }) {
  return useQuery<ItemPublic[]>({
    queryKey: ["items", "low-stock"],
    queryFn: async () =>
      SEED_ITEMS.filter((i) => i.currentStock <= i.minimumStock),
    placeholderData: [],
    enabled: options?.enabled ?? true,
  });
}

export function useCategories() {
  return useQuery<CategoryPublic[]>({
    queryKey: ["categories"],
    queryFn: async () => SEED_CATEGORIES,
    placeholderData: [],
  });
}

export function useAddItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      item: Omit<ItemPublic, "id" | "currentStock" | "lastPurchaseRate">,
    ) => {
      return {
        ...item,
        id: Date.now().toString(),
        currentStock: 0,
        lastPurchaseRate: 0,
      } as ItemPublic;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: ItemPublic) => item,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useDeactivateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => id,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

// Re-export useBackend for convenience
export { useBackend };
export { SEED_CATEGORIES };
