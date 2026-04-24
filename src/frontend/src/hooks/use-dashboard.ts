import type {
  DashboardStats,
  DeptConsumptionStat,
  ItemUsageStat,
  MonthlyConsumption,
} from "@/types/erp";
import { useQuery } from "@tanstack/react-query";

const SEED_STATS: DashboardStats = {
  totalActiveItems: 1284,
  currentStockValue: 3200000,
  lowStockCount: 12,
  todayInwardCount: 3,
  todayIssueCount: 7,
  nonMovingCount: 48,
};

const SEED_MONTHLY: MonthlyConsumption[] = [
  { month: "Nov 2024", totalQty: 142, totalValue: 284000 },
  { month: "Dec 2024", totalQty: 189, totalValue: 378000 },
  { month: "Jan 2025", totalQty: 165, totalValue: 330000 },
  { month: "Feb 2025", totalQty: 210, totalValue: 420000 },
  { month: "Mar 2025", totalQty: 195, totalValue: 390000 },
  { month: "Apr 2025", totalQty: 234, totalValue: 468000 },
];

const SEED_TOP_ITEMS: ItemUsageStat[] = [
  {
    itemId: "1",
    itemCode: "BRG-0147",
    itemName: "Bearing Deep Groove Ball 6205 ZZ",
    totalQty: 84,
  },
  {
    itemId: "3",
    itemCode: "ELC-0089",
    itemName: "Contactor 3-Phase 40A",
    totalQty: 72,
  },
  { itemId: "5", itemCode: "V-BLT-112", itemName: "V-Belt B-58", totalQty: 60 },
  {
    itemId: "4",
    itemCode: "LUB-0055",
    itemName: "Gear Oil EP-90 (20L)",
    totalQty: 55,
  },
  {
    itemId: "2",
    itemCode: "HYD-0231",
    itemName: "Hydraulic Cylinder Seal Kit",
    totalQty: 48,
  },
  {
    itemId: "6",
    itemCode: "HSP-0441",
    itemName: 'High Pressure Hose 3/4" × 1m',
    totalQty: 36,
  },
];

const SEED_DEPT_CONSUMPTION: DeptConsumptionStat[] = [
  { department: "Rolling Mill", totalQty: 312, totalValue: 624000 },
  { department: "Maintenance", totalQty: 248, totalValue: 496000 },
  { department: "Electrical", totalQty: 196, totalValue: 392000 },
  { department: "Hydraulics", totalQty: 164, totalValue: 328000 },
  { department: "Production", totalQty: 128, totalValue: 256000 },
];

export function useDashboardStats(options?: { enabled?: boolean }) {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => SEED_STATS,
    staleTime: 30_000,
    enabled: options?.enabled ?? true,
  });
}

export function useMonthlyConsumption() {
  return useQuery<MonthlyConsumption[]>({
    queryKey: ["dashboard", "monthly-consumption"],
    queryFn: async () => SEED_MONTHLY,
    placeholderData: [],
  });
}

export function useTopUsedItems() {
  return useQuery<ItemUsageStat[]>({
    queryKey: ["dashboard", "top-items"],
    queryFn: async () => SEED_TOP_ITEMS,
    placeholderData: [],
  });
}

export function useDeptConsumption() {
  return useQuery<DeptConsumptionStat[]>({
    queryKey: ["dashboard", "dept-consumption"],
    queryFn: async () => SEED_DEPT_CONSUMPTION,
    placeholderData: [],
  });
}
