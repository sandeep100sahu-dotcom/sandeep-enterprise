import type {
  DeptConsumptionStat,
  GRNEntryPublic,
  PurchaseReportItem,
  StockReportItem,
} from "@/types/erp";
import { useQuery } from "@tanstack/react-query";

const STOCK_DATA: StockReportItem[] = [
  {
    itemId: "1",
    itemCode: "BRG-0147",
    itemName: "Bearing Deep Groove Ball 6205 ZZ",
    category: "Bearings",
    unit: "PCS",
    currentStock: 45,
    minimumStock: 10,
    lastPurchaseRate: 850,
    stockValue: 38250,
    rackLocation: "A-01-03",
    status: "healthy",
  },
  {
    itemId: "2",
    itemCode: "HYD-0231",
    itemName: "Hydraulic Cylinder Seal Kit",
    category: "Hydraulics",
    unit: "SET",
    currentStock: 3,
    minimumStock: 5,
    lastPurchaseRate: 2200,
    stockValue: 6600,
    rackLocation: "B-02-07",
    status: "low",
  },
  {
    itemId: "3",
    itemCode: "ELC-0089",
    itemName: "Contactor 3-Phase 40A",
    category: "Electrical",
    unit: "PCS",
    currentStock: 8,
    minimumStock: 4,
    lastPurchaseRate: 3450,
    stockValue: 27600,
    rackLocation: "C-04-02",
    status: "healthy",
  },
  {
    itemId: "4",
    itemCode: "LUB-0055",
    itemName: "Gear Oil EP-90 (20L)",
    category: "Lubricants",
    unit: "CAN",
    currentStock: 2,
    minimumStock: 8,
    lastPurchaseRate: 1850,
    stockValue: 3700,
    rackLocation: "D-01-01",
    status: "critical",
  },
  {
    itemId: "5",
    itemCode: "V-BLT-112",
    itemName: "V-Belt B-58",
    category: "Transmission",
    unit: "PCS",
    currentStock: 12,
    minimumStock: 6,
    lastPurchaseRate: 320,
    stockValue: 3840,
    rackLocation: "A-03-06",
    status: "healthy",
  },
  {
    itemId: "6",
    itemCode: "HSP-0441",
    itemName: 'High Pressure Hose 3/4" × 1m',
    category: "Hydraulics",
    unit: "PCS",
    currentStock: 0,
    minimumStock: 6,
    lastPurchaseRate: 1400,
    stockValue: 0,
    rackLocation: "B-03-04",
    status: "out",
  },
];

const DEPT_CONSUMPTION: DeptConsumptionStat[] = [
  { department: "Rolling Mill", totalQty: 312, totalValue: 624000 },
  { department: "Maintenance", totalQty: 248, totalValue: 496000 },
  { department: "Electrical", totalQty: 196, totalValue: 392000 },
  { department: "Hydraulics", totalQty: 164, totalValue: 328000 },
  { department: "Production", totalQty: 128, totalValue: 256000 },
];

const PURCHASE_REPORT: PurchaseReportItem[] = [
  {
    month: "Jan 2025",
    supplierId: "sup1",
    supplierName: "SKF Distributors",
    totalOrders: 3,
    totalValue: 85000,
  },
  {
    month: "Feb 2025",
    supplierId: "sup2",
    supplierName: "Parker Hannifin India",
    totalOrders: 2,
    totalValue: 62000,
  },
  {
    month: "Mar 2025",
    supplierId: "sup3",
    supplierName: "Gates Distributors",
    totalOrders: 4,
    totalValue: 45000,
  },
  {
    month: "Apr 2025",
    supplierId: "sup1",
    supplierName: "SKF Distributors",
    totalOrders: 2,
    totalValue: 50000,
  },
];

export function useCurrentStockReport() {
  return useQuery<StockReportItem[]>({
    queryKey: ["reports", "current-stock"],
    queryFn: async () => STOCK_DATA,
    placeholderData: [],
  });
}

export function useLowStockReport() {
  return useQuery<StockReportItem[]>({
    queryKey: ["reports", "low-stock"],
    queryFn: async () =>
      STOCK_DATA.filter(
        (i) =>
          i.status === "low" || i.status === "critical" || i.status === "out",
      ),
    placeholderData: [],
  });
}

export function useDeptConsumptionReport(params?: {
  fromDate?: string;
  toDate?: string;
}) {
  return useQuery<DeptConsumptionStat[]>({
    queryKey: ["reports", "dept-consumption", params?.fromDate, params?.toDate],
    queryFn: async () => DEPT_CONSUMPTION,
    placeholderData: [],
  });
}

export function useMonthlyPurchaseReport() {
  return useQuery<PurchaseReportItem[]>({
    queryKey: ["reports", "monthly-purchase"],
    queryFn: async () => PURCHASE_REPORT,
    placeholderData: [],
  });
}

export function useDeadStockReport() {
  return useQuery<StockReportItem[]>({
    queryKey: ["reports", "dead-stock"],
    queryFn: async () => STOCK_DATA.filter((i) => i.currentStock === 0),
    placeholderData: [],
  });
}

export function useItemLedgerReport(itemId: string) {
  return useQuery({
    queryKey: ["reports", "item-ledger", itemId],
    queryFn: async () => ({
      item: STOCK_DATA.find((i) => i.itemId === itemId),
      transactions: [
        {
          date: "2025-04-20",
          type: "Inward",
          refNo: "GRN-2025-0041",
          qty: 20,
          balance: 45,
        },
        {
          date: "2025-04-23",
          type: "Issue",
          refNo: "ISS-2025-0118",
          qty: -2,
          balance: 43,
        },
      ],
    }),
    enabled: !!itemId,
  });
}
