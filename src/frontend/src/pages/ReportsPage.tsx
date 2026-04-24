import { TableSkeleton } from "@/components/ui/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useItems } from "@/hooks/use-items";
import {
  useCurrentStockReport,
  useDeadStockReport,
  useDeptConsumptionReport,
  useItemLedgerReport,
  useLowStockReport,
  useMonthlyPurchaseReport,
} from "@/hooks/use-reports";
import { cn } from "@/lib/utils";
import type { DeptConsumptionStat, StockReportItem } from "@/types/erp";
import {
  AlertTriangle,
  Archive,
  BarChart3,
  BookOpen,
  Building2,
  ChevronLeft,
  Clock,
  Download,
  FileText,
  Package,
  Printer,
  Settings2,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { useCallback, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ── Types ────────────────────────────────────────────────────────────────────

type ReportId =
  | "current-stock"
  | "low-stock"
  | "item-ledger"
  | "dept-consumption"
  | "monthly-purchase"
  | "repair-pending"
  | "machine-usage"
  | "dead-stock";

interface ReportCard {
  id: ReportId;
  icon: React.ReactNode;
  title: string;
  description: string;
  phase2?: boolean;
  badgeColor?: string;
}

// ── Constants ────────────────────────────────────────────────────────────────

const REPORT_CARDS: ReportCard[] = [
  {
    id: "current-stock",
    icon: <Package className="w-6 h-6" />,
    title: "Current Stock",
    description:
      "Full inventory snapshot with stock values and status for all items.",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
  },
  {
    id: "low-stock",
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Low Stock Alert",
    description:
      "Items below minimum stock level — needs immediate replenishment.",
    badgeColor: "bg-destructive/10 text-destructive border-destructive/20",
  },
  {
    id: "item-ledger",
    icon: <BookOpen className="w-6 h-6" />,
    title: "Item Ledger",
    description:
      "Complete inward/issue transaction history for any selected item.",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
  },
  {
    id: "dept-consumption",
    icon: <Building2 className="w-6 h-6" />,
    title: "Department Consumption",
    description:
      "Material consumption by department with value and quantity breakdown.",
    badgeColor: "bg-accent/10 text-accent border-accent/20",
  },
  {
    id: "monthly-purchase",
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Monthly Purchase",
    description:
      "Month-wise GRN count, quantity and purchase value for last 12 months.",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
  },
  {
    id: "repair-pending",
    icon: <Wrench className="w-6 h-6" />,
    title: "Repair Pending",
    description:
      "Items sent for repair that are yet to return, with overdue alerts.",
    phase2: true,
  },
  {
    id: "machine-usage",
    icon: <Settings2 className="w-6 h-6" />,
    title: "Machine-wise Usage",
    description:
      "Spare parts and consumables used per machine, with maintenance log.",
    phase2: true,
  },
  {
    id: "dead-stock",
    icon: <Archive className="w-6 h-6" />,
    title: "Dead Stock",
    description:
      "Items with zero movement in the last 90 days — review for disposal.",
    badgeColor: "bg-muted text-muted-foreground border-border",
  },
];

const STATUS_STYLE: Record<StockReportItem["status"], string> = {
  healthy: "alert-green",
  low: "alert-amber",
  critical: "bg-destructive/20 text-destructive border border-destructive/30",
  out: "alert-red",
};
const STATUS_LABEL: Record<StockReportItem["status"], string> = {
  healthy: "OK",
  low: "Low",
  critical: "Critical",
  out: "Out",
};

const PIE_COLORS = [
  "oklch(0.65 0.18 260)",
  "oklch(0.6 0.16 200)",
  "oklch(0.58 0.12 140)",
  "oklch(0.62 0.2 50)",
  "oklch(0.55 0.19 120)",
];

// ── CSV Export ────────────────────────────────────────────────────────────────

function downloadCSV(filename: string, rows: string[][], headers: string[]) {
  const csvContent = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ── Report Header ─────────────────────────────────────────────────────────────

interface ReportHeaderProps {
  title: string;
  filterSummary?: string;
  onBack: () => void;
  onCsvExport: () => void;
  onPrint: () => void;
}

function ReportHeader({
  title,
  filterSummary,
  onBack,
  onCsvExport,
  onPrint,
}: ReportHeaderProps) {
  const now = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="flex flex-col gap-3 print:hidden-controls">
      {/* Back + Title */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-1 h-7 text-xs text-muted-foreground"
          data-ocid="reports.back_button"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> All Reports
        </Button>
        <Separator orientation="vertical" className="h-4" />
        <h2 className="font-display text-xl font-bold text-foreground">
          {title}
        </h2>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Generated: {now}
          </span>
          {filterSummary && (
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {filterSummary}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 no-print">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 h-7 text-xs"
            onClick={onCsvExport}
            data-ocid="reports.download_csv_button"
          >
            <Download className="w-3.5 h-3.5" /> Download CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 h-7 text-xs"
            onClick={onPrint}
            data-ocid="reports.print_button"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Stock Table ────────────────────────────────────────────────────────────────

function StockTable({
  data,
  isLoading,
  showUrgentBadge,
  ocidPrefix,
}: {
  data?: StockReportItem[];
  isLoading?: boolean;
  showUrgentBadge?: boolean;
  ocidPrefix: string;
}) {
  if (isLoading) return <TableSkeleton cols={8} rows={8} />;
  if (!data?.length)
    return (
      <div
        className="py-16 text-center text-sm text-muted-foreground"
        data-ocid={`${ocidPrefix}.empty_state`}
      >
        No data available
      </div>
    );

  const totalValue = data.reduce((sum, item) => sum + item.stockValue, 0);

  return (
    <div className="overflow-x-auto print-table">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border bg-muted/30 sticky top-0">
            <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
              #
            </th>
            <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
              Code
            </th>
            <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
              Item Name
            </th>
            <th className="text-left py-2.5 px-3 text-muted-foreground font-medium hidden md:table-cell">
              Category
            </th>
            <th className="text-left py-2.5 px-3 text-muted-foreground font-medium hidden sm:table-cell">
              Unit
            </th>
            <th className="text-right py-2.5 px-3 text-muted-foreground font-medium">
              Stock
            </th>
            <th className="text-right py-2.5 px-3 text-muted-foreground font-medium hidden sm:table-cell">
              Min
            </th>
            <th className="text-right py-2.5 px-3 text-muted-foreground font-medium hidden lg:table-cell">
              Rate (₹)
            </th>
            <th className="text-right py-2.5 px-3 text-muted-foreground font-medium hidden lg:table-cell">
              Value (₹)
            </th>
            <th className="text-left py-2.5 px-3 text-muted-foreground font-medium hidden md:table-cell">
              Location
            </th>
            <th className="text-center py-2.5 px-3 text-muted-foreground font-medium">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={item.itemId}
              className={cn(
                "border-b border-border/50 hover:bg-muted/20 transition-colors",
                (item.status === "critical" || item.status === "out") &&
                  "bg-destructive/5 hover:bg-destructive/10",
                item.status === "low" && "bg-accent/5 hover:bg-accent/10",
              )}
              data-ocid={`${ocidPrefix}.item.${i + 1}`}
            >
              <td className="py-2.5 px-3 text-muted-foreground">{i + 1}</td>
              <td className="py-2.5 px-3 font-mono text-primary font-semibold">
                {item.itemCode}
              </td>
              <td className="py-2.5 px-3 text-foreground font-medium max-w-[180px]">
                <div className="truncate min-w-0">{item.itemName}</div>
                {showUrgentBadge && (
                  <Badge
                    variant="destructive"
                    className="text-[9px] h-3.5 px-1 mt-0.5"
                  >
                    URGENT
                  </Badge>
                )}
              </td>
              <td className="py-2.5 px-3 hidden md:table-cell text-muted-foreground">
                {item.category}
              </td>
              <td className="py-2.5 px-3 hidden sm:table-cell text-muted-foreground">
                {item.unit}
              </td>
              <td className="py-2.5 px-3 text-right font-mono font-bold text-foreground">
                {item.currentStock}
              </td>
              <td className="py-2.5 px-3 text-right font-mono text-muted-foreground hidden sm:table-cell">
                {item.minimumStock}
              </td>
              <td className="py-2.5 px-3 text-right font-mono hidden lg:table-cell">
                ₹{item.lastPurchaseRate.toLocaleString()}
              </td>
              <td className="py-2.5 px-3 text-right font-mono font-semibold hidden lg:table-cell">
                ₹{item.stockValue.toLocaleString()}
              </td>
              <td className="py-2.5 px-3 font-mono text-muted-foreground hidden md:table-cell">
                {item.rackLocation}
              </td>
              <td className="py-2.5 px-3 text-center">
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-sm text-[10px] font-medium",
                    STATUS_STYLE[item.status],
                  )}
                >
                  {STATUS_LABEL[item.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-border bg-muted/30">
            <td
              colSpan={8}
              className="py-2.5 px-3 text-xs font-semibold text-foreground text-right"
            >
              Total Stock Value:
            </td>
            <td className="py-2.5 px-3 text-right font-mono font-bold text-primary text-sm">
              ₹{totalValue.toLocaleString()}
            </td>
            <td colSpan={2} />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ── Current Stock Report ───────────────────────────────────────────────────────

function CurrentStockReport({ onBack }: { onBack: () => void }) {
  const { data, isLoading } = useCurrentStockReport();
  const handleCsv = useCallback(() => {
    downloadCSV(
      "current-stock.csv",
      (data ?? []).map((i) => [
        i.itemCode,
        i.itemName,
        i.category,
        i.unit,
        String(i.currentStock),
        String(i.minimumStock),
        String(i.lastPurchaseRate),
        String(i.stockValue),
        i.rackLocation,
        i.status,
      ]),
      [
        "Code",
        "Item Name",
        "Category",
        "Unit",
        "Stock",
        "Min Stock",
        "Rate (₹)",
        "Value (₹)",
        "Location",
        "Status",
      ],
    );
  }, [data]);

  return (
    <div className="space-y-4" data-ocid="reports.current_stock.section">
      <ReportHeader
        title="Current Stock Report"
        filterSummary={`${(data ?? []).length} items`}
        onBack={onBack}
        onCsvExport={handleCsv}
        onPrint={() => window.print()}
      />
      <div className="data-card p-0 overflow-hidden">
        <StockTable
          data={data}
          isLoading={isLoading}
          ocidPrefix="reports.current_stock"
        />
      </div>
    </div>
  );
}

// ── Low Stock Report ───────────────────────────────────────────────────────────

function LowStockReport({ onBack }: { onBack: () => void }) {
  const { data, isLoading } = useLowStockReport();
  const handleCsv = useCallback(() => {
    downloadCSV(
      "low-stock-alert.csv",
      (data ?? []).map((i) => [
        i.itemCode,
        i.itemName,
        i.category,
        i.unit,
        String(i.currentStock),
        String(i.minimumStock),
        String(i.stockValue),
        i.status,
      ]),
      [
        "Code",
        "Item Name",
        "Category",
        "Unit",
        "Stock",
        "Min Stock",
        "Value (₹)",
        "Status",
      ],
    );
  }, [data]);

  return (
    <div className="space-y-4" data-ocid="reports.low_stock.section">
      <ReportHeader
        title="Low Stock Alert"
        filterSummary={`${(data ?? []).length} items need attention`}
        onBack={onBack}
        onCsvExport={handleCsv}
        onPrint={() => window.print()}
      />
      {!isLoading && (data ?? []).length === 0 ? (
        <div
          className="data-card py-16 text-center"
          data-ocid="reports.low_stock.empty_state"
        >
          <div className="inline-flex items-center gap-2 alert-green px-5 py-2.5 rounded-md text-sm font-medium">
            All stock levels are healthy — no action needed.
          </div>
        </div>
      ) : (
        <div className="data-card p-0 overflow-hidden">
          <StockTable
            data={data}
            isLoading={isLoading}
            showUrgentBadge
            ocidPrefix="reports.low_stock"
          />
        </div>
      )}
    </div>
  );
}

// ── Item Ledger Report ─────────────────────────────────────────────────────────

function ItemLedgerReport({ onBack }: { onBack: () => void }) {
  const { data: allItems } = useItems();
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const { data: ledgerData, isLoading } = useItemLedgerReport(selectedItemId);

  const transactions = ledgerData?.transactions ?? [];
  const item = ledgerData?.item;

  const handleCsv = useCallback(() => {
    downloadCSV(
      "item-ledger.csv",
      transactions.map((t) => [
        t.date,
        t.type,
        String(t.qty),
        String(t.balance),
        t.refNo,
      ]),
      ["Date", "Type", "Qty", "Balance", "Ref No"],
    );
  }, [transactions]);

  return (
    <div className="space-y-4" data-ocid="reports.item_ledger.section">
      <ReportHeader
        title="Item Ledger"
        filterSummary={
          item ? `${item.itemCode} — ${item.itemName}` : "Select an item"
        }
        onBack={onBack}
        onCsvExport={handleCsv}
        onPrint={() => window.print()}
      />

      <div className="data-card space-y-3">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[240px] space-y-1.5">
            <Label htmlFor="ledger-item" className="text-xs font-medium">
              Select Item
            </Label>
            <Select value={selectedItemId} onValueChange={setSelectedItemId}>
              <SelectTrigger
                id="ledger-item"
                className="h-8 text-xs"
                data-ocid="reports.item_ledger.select"
              >
                <SelectValue placeholder="Choose an item…" />
              </SelectTrigger>
              <SelectContent>
                {(allItems ?? []).map((i) => (
                  <SelectItem key={i.id} value={i.id} className="text-xs">
                    <span className="font-mono text-primary mr-2">
                      {i.code}
                    </span>
                    {i.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {!selectedItemId ? (
        <div
          className="data-card py-16 text-center text-sm text-muted-foreground"
          data-ocid="reports.item_ledger.empty_state"
        >
          Select an item above to view its complete transaction history.
        </div>
      ) : isLoading ? (
        <div className="data-card p-4">
          <TableSkeleton cols={5} rows={6} />
        </div>
      ) : (
        <div className="data-card p-0 overflow-hidden print-table">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                  #
                </th>
                <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                  Date
                </th>
                <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                  Type
                </th>
                <th className="text-right py-2.5 px-3 text-muted-foreground font-medium">
                  Qty
                </th>
                <th className="text-right py-2.5 px-3 text-muted-foreground font-medium">
                  Balance
                </th>
                <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                  Ref No.
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-muted-foreground"
                  >
                    No transactions found for this item.
                  </td>
                </tr>
              ) : (
                transactions.map((txn, i) => (
                  <tr
                    key={`${txn.refNo}-${txn.date}`}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    data-ocid={`reports.item_ledger.item.${i + 1}`}
                  >
                    <td className="py-2.5 px-3 text-muted-foreground">
                      {i + 1}
                    </td>
                    <td className="py-2.5 px-3 font-mono">{txn.date}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={cn(
                          "px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                          txn.type === "Inward" ? "alert-green" : "alert-red",
                        )}
                      >
                        {txn.type === "Inward" ? "IN" : "OUT"}
                      </span>
                    </td>
                    <td
                      className={cn(
                        "py-2.5 px-3 text-right font-mono font-bold",
                        txn.qty > 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-destructive",
                      )}
                    >
                      {txn.qty > 0 ? `+${txn.qty}` : txn.qty}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-foreground">
                      {txn.balance}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-muted-foreground">
                      {txn.refNo}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Department Consumption ─────────────────────────────────────────────────────

function DeptConsumptionReport({ onBack }: { onBack: () => void }) {
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 3);
    return d.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );
  const { data, isLoading } = useDeptConsumptionReport({ fromDate, toDate });

  const filterSummary = `${fromDate} to ${toDate}`;
  const handleCsv = useCallback(() => {
    downloadCSV(
      "dept-consumption.csv",
      (data ?? []).map((d: DeptConsumptionStat) => [
        d.department,
        String(d.totalQty),
        String(d.totalValue),
      ]),
      ["Department", "Total Qty", "Total Value (₹)"],
    );
  }, [data]);

  const maxVal = Math.max(...(data ?? []).map((d) => d.totalValue), 1);

  return (
    <div className="space-y-4" data-ocid="reports.dept_consumption.section">
      <ReportHeader
        title="Department Consumption"
        filterSummary={filterSummary}
        onBack={onBack}
        onCsvExport={handleCsv}
        onPrint={() => window.print()}
      />

      {/* Date filters */}
      <div className="data-card no-print">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">From Date</Label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="h-8 rounded-md border border-input bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
              data-ocid="reports.dept_consumption.from_date"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">To Date</Label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="h-8 rounded-md border border-input bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
              data-ocid="reports.dept_consumption.to_date"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Pie chart */}
        <div className="data-card">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Consumption Share
          </p>
          {isLoading ? (
            <div className="h-48 flex items-center justify-center text-muted-foreground text-xs">
              Loading…
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={data ?? []}
                  dataKey="totalValue"
                  nameKey="department"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({
                    name,
                    percent,
                  }: { name: string; percent: number }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {(data ?? []).map((entry, i) => (
                    <Cell
                      key={entry.department}
                      fill={PIE_COLORS[i % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [
                    `₹${val.toLocaleString()}`,
                    "Value",
                  ]}
                  contentStyle={{
                    background: "oklch(0.16 0.02 260)",
                    border: "1px solid oklch(0.22 0.02 260)",
                    borderRadius: "6px",
                    fontSize: "11px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Table */}
        <div className="data-card p-0 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                  Department
                </th>
                <th className="text-right py-2.5 px-3 text-muted-foreground font-medium">
                  Total Qty
                </th>
                <th className="text-right py-2.5 px-3 text-muted-foreground font-medium">
                  Value (₹)
                </th>
                <th className="text-left py-2.5 px-3 text-muted-foreground font-medium hidden lg:table-cell">
                  Share
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4}>
                    <TableSkeleton cols={4} rows={5} />
                  </td>
                </tr>
              ) : (
                (data ?? []).map((dept, i) => (
                  <tr
                    key={dept.department}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    data-ocid={`reports.dept_consumption.item.${i + 1}`}
                  >
                    <td className="py-2.5 px-3 font-medium text-foreground">
                      {dept.department}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono">
                      {dept.totalQty.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold">
                      ₹{dept.totalValue.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-smooth"
                            style={{
                              width: `${(dept.totalValue / maxVal) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground w-8 text-right">
                          {Math.round((dept.totalValue / maxVal) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Monthly Purchase Report ────────────────────────────────────────────────────

const MONTHLY_SEED = [
  { month: "May 2024", totalGRNs: 4, totalQty: 68, totalValue: 95000 },
  { month: "Jun 2024", totalGRNs: 3, totalQty: 52, totalValue: 72000 },
  { month: "Jul 2024", totalGRNs: 5, totalQty: 84, totalValue: 118000 },
  { month: "Aug 2024", totalGRNs: 2, totalQty: 36, totalValue: 48000 },
  { month: "Sep 2024", totalGRNs: 6, totalQty: 110, totalValue: 156000 },
  { month: "Oct 2024", totalGRNs: 4, totalQty: 75, totalValue: 98000 },
  { month: "Nov 2024", totalGRNs: 3, totalQty: 58, totalValue: 82000 },
  { month: "Dec 2024", totalGRNs: 5, totalQty: 92, totalValue: 131000 },
  { month: "Jan 2025", totalGRNs: 3, totalQty: 61, totalValue: 85000 },
  { month: "Feb 2025", totalGRNs: 2, totalQty: 44, totalValue: 62000 },
  { month: "Mar 2025", totalGRNs: 4, totalQty: 70, totalValue: 45000 },
  { month: "Apr 2025", totalGRNs: 2, totalQty: 38, totalValue: 50000 },
];

function MonthlyPurchaseReport({ onBack }: { onBack: () => void }) {
  const handleCsv = useCallback(() => {
    downloadCSV(
      "monthly-purchase.csv",
      MONTHLY_SEED.map((m) => [
        m.month,
        String(m.totalGRNs),
        String(m.totalQty),
        String(m.totalValue),
      ]),
      ["Month", "Total GRNs", "Total Qty", "Total Value (₹)"],
    );
  }, []);

  return (
    <div className="space-y-4" data-ocid="reports.monthly_purchase.section">
      <ReportHeader
        title="Monthly Purchase (Inward)"
        filterSummary="Last 12 months"
        onBack={onBack}
        onCsvExport={handleCsv}
        onPrint={() => window.print()}
      />

      {/* Bar chart */}
      <div className="data-card">
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Monthly Purchase Value (₹)
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={MONTHLY_SEED}
            margin={{ top: 4, right: 8, bottom: 4, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.88 0.02 0 / 0.4)"
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 9, fill: "oklch(0.48 0.02 0)" }}
              tickFormatter={(v: string) => v.split(" ")[0]}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "oklch(0.48 0.02 0)" }}
              tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(val: number) => [`₹${val.toLocaleString()}`, "Value"]}
              contentStyle={{
                background: "oklch(0.16 0.02 260)",
                border: "1px solid oklch(0.22 0.02 260)",
                borderRadius: "6px",
                fontSize: "11px",
              }}
            />
            <Bar
              dataKey="totalValue"
              fill="oklch(0.45 0.08 260)"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="data-card p-0 overflow-hidden print-table">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                #
              </th>
              <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                Month
              </th>
              <th className="text-right py-2.5 px-3 text-muted-foreground font-medium">
                Total GRNs
              </th>
              <th className="text-right py-2.5 px-3 text-muted-foreground font-medium">
                Total Qty
              </th>
              <th className="text-right py-2.5 px-3 text-muted-foreground font-medium">
                Total Value (₹)
              </th>
            </tr>
          </thead>
          <tbody>
            {MONTHLY_SEED.map((row, i) => (
              <tr
                key={row.month}
                className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                data-ocid={`reports.monthly_purchase.item.${i + 1}`}
              >
                <td className="py-2.5 px-3 text-muted-foreground">{i + 1}</td>
                <td className="py-2.5 px-3 font-medium text-foreground">
                  {row.month}
                </td>
                <td className="py-2.5 px-3 text-right font-mono">
                  {row.totalGRNs}
                </td>
                <td className="py-2.5 px-3 text-right font-mono">
                  {row.totalQty.toLocaleString()}
                </td>
                <td className="py-2.5 px-3 text-right font-mono font-semibold text-primary">
                  ₹{row.totalValue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border bg-muted/30">
              <td
                colSpan={2}
                className="py-2.5 px-3 text-xs font-semibold text-foreground"
              >
                Totals
              </td>
              <td className="py-2.5 px-3 text-right font-mono font-bold">
                {MONTHLY_SEED.reduce((s, r) => s + r.totalGRNs, 0)}
              </td>
              <td className="py-2.5 px-3 text-right font-mono font-bold">
                {MONTHLY_SEED.reduce(
                  (s, r) => s + r.totalQty,
                  0,
                ).toLocaleString()}
              </td>
              <td className="py-2.5 px-3 text-right font-mono font-bold text-primary">
                ₹
                {MONTHLY_SEED.reduce(
                  (s, r) => s + r.totalValue,
                  0,
                ).toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ── Dead Stock Report ──────────────────────────────────────────────────────────

function DeadStockReport({ onBack }: { onBack: () => void }) {
  const { data, isLoading } = useDeadStockReport();
  const handleCsv = useCallback(() => {
    downloadCSV(
      "dead-stock.csv",
      (data ?? []).map((i) => [
        i.itemCode,
        i.itemName,
        i.category,
        i.unit,
        String(i.currentStock),
        String(i.stockValue),
        i.rackLocation,
      ]),
      [
        "Code",
        "Item Name",
        "Category",
        "Unit",
        "Stock",
        "Value (₹)",
        "Location",
      ],
    );
  }, [data]);

  return (
    <div className="space-y-4" data-ocid="reports.dead_stock.section">
      <ReportHeader
        title="Dead Stock Report"
        filterSummary="No movement in 90 days"
        onBack={onBack}
        onCsvExport={handleCsv}
        onPrint={() => window.print()}
      />
      <div className="data-card p-0 overflow-hidden">
        <StockTable
          data={data}
          isLoading={isLoading}
          ocidPrefix="reports.dead_stock"
        />
      </div>
    </div>
  );
}

// ── Report Cards Landing ───────────────────────────────────────────────────────

function ReportLanding({
  onSelect,
  stockData,
  lowStockData,
}: {
  onSelect: (id: ReportId) => void;
  stockData?: StockReportItem[];
  lowStockData?: StockReportItem[];
}) {
  return (
    <div className="space-y-5" data-ocid="reports.landing.section">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Reports
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Inventory analytics, consumption tracking, and operational reports
        </p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="data-card text-center">
          <p className="text-xl font-display font-bold text-foreground">
            {stockData?.length ?? 0}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center justify-center gap-1">
            <Package className="w-3 h-3" /> Total Items
          </p>
        </div>
        <div className="data-card text-center">
          <p className="text-xl font-display font-bold text-foreground">
            ₹
            {(
              (stockData ?? []).reduce((s, i) => s + i.stockValue, 0) / 100000
            ).toFixed(1)}
            L
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Total Stock Value
          </p>
        </div>
        <div className="data-card text-center border-accent/30 bg-accent/5">
          <p className="text-xl font-display font-bold text-accent">
            {lowStockData?.length ?? 0}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3 text-accent" /> Low Stock
          </p>
        </div>
        <div className="data-card text-center border-destructive/30 bg-destructive/5">
          <p className="text-xl font-display font-bold text-destructive">
            {
              (stockData ?? []).filter(
                (i) => i.status === "critical" || i.status === "out",
              ).length
            }
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3 text-destructive" /> Critical
          </p>
        </div>
      </div>

      {/* Report cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {REPORT_CARDS.map((card) => (
          <div
            key={card.id}
            className={cn(
              "data-card flex flex-col gap-3 relative group",
              card.phase2
                ? "opacity-70 cursor-default"
                : "cursor-pointer hover:border-primary/40 hover:shadow-md transition-smooth",
            )}
            onClick={() => !card.phase2 && onSelect(card.id)}
            role={card.phase2 ? undefined : "button"}
            tabIndex={card.phase2 ? -1 : 0}
            onKeyDown={(e) => {
              if (!card.phase2 && (e.key === "Enter" || e.key === " "))
                onSelect(card.id);
            }}
            aria-label={card.phase2 ? undefined : `Open ${card.title} report`}
            data-ocid={`reports.card.${card.id.replace(/-/g, "_")}`}
          >
            {card.phase2 && (
              <span className="absolute top-2.5 right-2.5 bg-muted text-muted-foreground text-[9px] font-semibold px-1.5 py-0.5 rounded-sm border border-border uppercase tracking-wide">
                Phase 2
              </span>
            )}
            <div
              className={cn(
                "w-10 h-10 rounded-md flex items-center justify-center",
                card.phase2
                  ? "bg-muted text-muted-foreground"
                  : card.badgeColor
                    ? card.badgeColor
                    : "bg-primary/10 text-primary",
              )}
            >
              {card.icon}
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-sm text-foreground leading-tight">
                {card.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
            {!card.phase2 && (
              <Button
                size="sm"
                variant="outline"
                className="w-full h-7 text-xs gap-1 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-smooth"
                tabIndex={-1}
                aria-hidden="true"
                data-ocid={`reports.card.${card.id.replace(/-/g, "_")}.view_button`}
              >
                <BarChart3 className="w-3 h-3" /> View Report
              </Button>
            )}
            {card.phase2 && (
              <p className="text-[10px] text-muted-foreground italic">
                Coming in Phase 2
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState<ReportId | null>(null);
  const { data: stockData } = useCurrentStockReport();
  const { data: lowStockData } = useLowStockReport();

  const handleBack = () => setActiveReport(null);

  if (!activeReport) {
    return (
      <ReportLanding
        onSelect={setActiveReport}
        stockData={stockData}
        lowStockData={lowStockData}
      />
    );
  }

  return (
    <div data-ocid="reports.page" className="space-y-4">
      {activeReport === "current-stock" && (
        <CurrentStockReport onBack={handleBack} />
      )}
      {activeReport === "low-stock" && <LowStockReport onBack={handleBack} />}
      {activeReport === "item-ledger" && (
        <ItemLedgerReport onBack={handleBack} />
      )}
      {activeReport === "dept-consumption" && (
        <DeptConsumptionReport onBack={handleBack} />
      )}
      {activeReport === "monthly-purchase" && (
        <MonthlyPurchaseReport onBack={handleBack} />
      )}
      {activeReport === "dead-stock" && <DeadStockReport onBack={handleBack} />}
    </div>
  );
}
