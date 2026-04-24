// ERP Type Definitions - Sandeep Enterprise And Co.
// Maps to backend contract types

export type Role = "admin" | "storeUser" | "purchaseUser" | "manager";

export type IssueType = "normal" | "emergencyBreakdown" | "directConsumable";

export type QCStatus = "pending" | "approved" | "rejected";

export interface DashboardStats {
  totalActiveItems: number;
  currentStockValue: number;
  lowStockCount: number;
  todayInwardCount: number;
  todayIssueCount: number;
  nonMovingCount: number;
}

export interface MonthlyConsumption {
  month: string;
  totalQty: number;
  totalValue: number;
}

export interface ItemUsageStat {
  itemId: string;
  itemCode: string;
  itemName: string;
  totalQty: number;
}

export interface DeptConsumptionStat {
  department: string;
  totalQty: number;
  totalValue: number;
}

export interface ItemPublic {
  id: string;
  code: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  unit: string;
  brand: string;
  size: string;
  rackLocation: string;
  minimumStock: number;
  preferredSupplier: string;
  gstHsn: string;
  photo: string;
  currentStock: number;
  lastPurchaseRate: number;
  isActive: boolean;
}

export interface SupplierPublic {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  gstin: string;
  ledgerBalance: number;
}

export interface GRNItem {
  itemId: string;
  itemCode: string;
  itemName: string;
  qty: number;
  rate: number;
  gst: number;
  total: number;
}

export interface GRNEntryPublic {
  id: string;
  grnNo: string;
  supplierId: string;
  supplierName: string;
  invoiceNo: string;
  challanNo: string;
  date: string;
  items: GRNItem[];
  qcStatus: QCStatus;
  createdBy: string;
  createdAt: string;
}

export interface IssueItem {
  itemId: string;
  itemCode: string;
  itemName: string;
  qty: number;
}

export interface IssueEntryPublic {
  id: string;
  issueSlipNo: string;
  date: string;
  department: string;
  machineName: string;
  issueType: IssueType;
  items: IssueItem[];
  requestedBy: string;
  issuedBy: string;
  purpose: string;
  status: string;
  createdAt: string;
}

export interface StockTransaction {
  id: string;
  itemId: string;
  transactionType: string;
  refId: string;
  qty: number;
  balanceAfter: number;
  createdAt: string;
}

export interface UserProfilePublic {
  id: string; // Principal as string
  username: string;
  role: Role;
  isActive: boolean;
  lastLoginAt: string | null;
}

export interface CategoryPublic {
  id: string;
  name: string;
  subcategories: string[];
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  moduleName: string;
  entityId: string;
  oldValue: string;
  newValue: string;
  timestamp: string;
}

// Report types
export interface StockReportItem {
  itemId: string;
  itemCode: string;
  itemName: string;
  category: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  lastPurchaseRate: number;
  stockValue: number;
  rackLocation: string;
  status: "healthy" | "low" | "critical" | "out";
}

export interface PurchaseReportItem {
  month: string;
  supplierId: string;
  supplierName: string;
  totalOrders: number;
  totalValue: number;
}

// App store types
export interface AppUser {
  principal: string;
  username: string;
  role: Role;
  lastLoginAt: string | null;
}
