import { c as createLucideIcon, O as useQuery, r as reactExports, j as jsxRuntimeExports, g as Package, T as TriangleAlert, i as cn, B as Button, V as ChartColumn, f as useItems, K as Label, w as Select, x as SelectTrigger, y as SelectValue, z as SelectContent, D as SelectItem, E as TableSkeleton, h as Badge } from "./index-B0qZHuNS.js";
import { S as Separator } from "./separator-BQN91TkL.js";
import { R as ResponsiveContainer, P as PieChart, q as Pie, r as Cell, p as Tooltip, B as BarChart, o as CartesianGrid, X as XAxis, Y as YAxis, t as Bar, T as TrendingUp, W as Wrench, F as FileText } from "./PieChart-CiGag3zL.js";
import { B as Building2, D as Download } from "./download-DkJ6Swrc.js";
import { C as Clock } from "./clock-DH_XNXHT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }]
];
const Archive = createLucideIcon("archive", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode);
const STOCK_DATA = [
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
    status: "healthy"
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
    status: "low"
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
    status: "healthy"
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
    status: "critical"
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
    status: "healthy"
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
    status: "out"
  }
];
const DEPT_CONSUMPTION = [
  { department: "Rolling Mill", totalQty: 312, totalValue: 624e3 },
  { department: "Maintenance", totalQty: 248, totalValue: 496e3 },
  { department: "Electrical", totalQty: 196, totalValue: 392e3 },
  { department: "Hydraulics", totalQty: 164, totalValue: 328e3 },
  { department: "Production", totalQty: 128, totalValue: 256e3 }
];
function useCurrentStockReport() {
  return useQuery({
    queryKey: ["reports", "current-stock"],
    queryFn: async () => STOCK_DATA,
    placeholderData: []
  });
}
function useLowStockReport() {
  return useQuery({
    queryKey: ["reports", "low-stock"],
    queryFn: async () => STOCK_DATA.filter(
      (i) => i.status === "low" || i.status === "critical" || i.status === "out"
    ),
    placeholderData: []
  });
}
function useDeptConsumptionReport(params) {
  return useQuery({
    queryKey: ["reports", "dept-consumption", params == null ? void 0 : params.fromDate, params == null ? void 0 : params.toDate],
    queryFn: async () => DEPT_CONSUMPTION,
    placeholderData: []
  });
}
function useDeadStockReport() {
  return useQuery({
    queryKey: ["reports", "dead-stock"],
    queryFn: async () => STOCK_DATA.filter((i) => i.currentStock === 0),
    placeholderData: []
  });
}
function useItemLedgerReport(itemId) {
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
          balance: 45
        },
        {
          date: "2025-04-23",
          type: "Issue",
          refNo: "ISS-2025-0118",
          qty: -2,
          balance: 43
        }
      ]
    }),
    enabled: !!itemId
  });
}
const REPORT_CARDS = [
  {
    id: "current-stock",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-6 h-6" }),
    title: "Current Stock",
    description: "Full inventory snapshot with stock values and status for all items.",
    badgeColor: "bg-primary/10 text-primary border-primary/20"
  },
  {
    id: "low-stock",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-6 h-6" }),
    title: "Low Stock Alert",
    description: "Items below minimum stock level — needs immediate replenishment.",
    badgeColor: "bg-destructive/10 text-destructive border-destructive/20"
  },
  {
    id: "item-ledger",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6" }),
    title: "Item Ledger",
    description: "Complete inward/issue transaction history for any selected item.",
    badgeColor: "bg-primary/10 text-primary border-primary/20"
  },
  {
    id: "dept-consumption",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-6 h-6" }),
    title: "Department Consumption",
    description: "Material consumption by department with value and quantity breakdown.",
    badgeColor: "bg-accent/10 text-accent border-accent/20"
  },
  {
    id: "monthly-purchase",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-6 h-6" }),
    title: "Monthly Purchase",
    description: "Month-wise GRN count, quantity and purchase value for last 12 months.",
    badgeColor: "bg-primary/10 text-primary border-primary/20"
  },
  {
    id: "repair-pending",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-6 h-6" }),
    title: "Repair Pending",
    description: "Items sent for repair that are yet to return, with overdue alerts.",
    phase2: true
  },
  {
    id: "machine-usage",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "w-6 h-6" }),
    title: "Machine-wise Usage",
    description: "Spare parts and consumables used per machine, with maintenance log.",
    phase2: true
  },
  {
    id: "dead-stock",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "w-6 h-6" }),
    title: "Dead Stock",
    description: "Items with zero movement in the last 90 days — review for disposal.",
    badgeColor: "bg-muted text-muted-foreground border-border"
  }
];
const STATUS_STYLE = {
  healthy: "alert-green",
  low: "alert-amber",
  critical: "bg-destructive/20 text-destructive border border-destructive/30",
  out: "alert-red"
};
const STATUS_LABEL = {
  healthy: "OK",
  low: "Low",
  critical: "Critical",
  out: "Out"
};
const PIE_COLORS = [
  "oklch(0.65 0.18 260)",
  "oklch(0.6 0.16 200)",
  "oklch(0.58 0.12 140)",
  "oklch(0.62 0.2 50)",
  "oklch(0.55 0.19 120)"
];
function downloadCSV(filename, rows, headers) {
  const csvContent = [headers, ...rows].map(
    (row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
  ).join("\n");
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
function ReportHeader({
  title,
  filterSummary,
  onBack,
  onCsvExport,
  onPrint
}) {
  const now = (/* @__PURE__ */ new Date()).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 print:hidden-controls", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: onBack,
          className: "gap-1 h-7 text-xs text-muted-foreground",
          "data-ocid": "reports.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-3.5 h-3.5" }),
            " All Reports"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
          "Generated: ",
          now
        ] }),
        filterSummary && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" }),
          filterSummary
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 no-print", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-1.5 h-7 text-xs",
            onClick: onCsvExport,
            "data-ocid": "reports.download_csv_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              " Download CSV"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-1.5 h-7 text-xs",
            onClick: onPrint,
            "data-ocid": "reports.print_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-3.5 h-3.5" }),
              " Print / Save as PDF"
            ]
          }
        )
      ] })
    ] })
  ] });
}
function StockTable({
  data,
  isLoading,
  showUrgentBadge,
  ocidPrefix
}) {
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { cols: 8, rows: 8 });
  if (!(data == null ? void 0 : data.length))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "py-16 text-center text-sm text-muted-foreground",
        "data-ocid": `${ocidPrefix}.empty_state`,
        children: "No data available"
      }
    );
  const totalValue = data.reduce((sum, item) => sum + item.stockValue, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto print-table", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30 sticky top-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "#" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "Code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "Item Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium hidden md:table-cell", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium hidden sm:table-cell", children: "Unit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-3 text-muted-foreground font-medium", children: "Stock" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-3 text-muted-foreground font-medium hidden sm:table-cell", children: "Min" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-3 text-muted-foreground font-medium hidden lg:table-cell", children: "Rate (₹)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-3 text-muted-foreground font-medium hidden lg:table-cell", children: "Value (₹)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium hidden md:table-cell", children: "Location" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-2.5 px-3 text-muted-foreground font-medium", children: "Status" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: cn(
          "border-b border-border/50 hover:bg-muted/20 transition-colors",
          (item.status === "critical" || item.status === "out") && "bg-destructive/5 hover:bg-destructive/10",
          item.status === "low" && "bg-accent/5 hover:bg-accent/10"
        ),
        "data-ocid": `${ocidPrefix}.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground", children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-mono text-primary font-semibold", children: item.itemCode }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-foreground font-medium max-w-[180px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate min-w-0", children: item.itemName }),
            showUrgentBadge && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "destructive",
                className: "text-[9px] h-3.5 px-1 mt-0.5",
                children: "URGENT"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 hidden md:table-cell text-muted-foreground", children: item.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 hidden sm:table-cell text-muted-foreground", children: item.unit }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-mono font-bold text-foreground", children: item.currentStock }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-mono text-muted-foreground hidden sm:table-cell", children: item.minimumStock }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-right font-mono hidden lg:table-cell", children: [
            "₹",
            item.lastPurchaseRate.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-right font-mono font-semibold hidden lg:table-cell", children: [
            "₹",
            item.stockValue.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-mono text-muted-foreground hidden md:table-cell", children: item.rackLocation }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "px-1.5 py-0.5 rounded-sm text-[10px] font-medium",
                STATUS_STYLE[item.status]
              ),
              children: STATUS_LABEL[item.status]
            }
          ) })
        ]
      },
      item.itemId
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t-2 border-border bg-muted/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 8,
          className: "py-2.5 px-3 text-xs font-semibold text-foreground text-right",
          children: "Total Stock Value:"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-right font-mono font-bold text-primary text-sm", children: [
        "₹",
        totalValue.toLocaleString()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 2 })
    ] }) })
  ] }) });
}
function CurrentStockReport({ onBack }) {
  const { data, isLoading } = useCurrentStockReport();
  const handleCsv = reactExports.useCallback(() => {
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
        i.status
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
        "Status"
      ]
    );
  }, [data]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "reports.current_stock.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReportHeader,
      {
        title: "Current Stock Report",
        filterSummary: `${(data ?? []).length} items`,
        onBack,
        onCsvExport: handleCsv,
        onPrint: () => window.print()
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "data-card p-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      StockTable,
      {
        data,
        isLoading,
        ocidPrefix: "reports.current_stock"
      }
    ) })
  ] });
}
function LowStockReport({ onBack }) {
  const { data, isLoading } = useLowStockReport();
  const handleCsv = reactExports.useCallback(() => {
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
        i.status
      ]),
      [
        "Code",
        "Item Name",
        "Category",
        "Unit",
        "Stock",
        "Min Stock",
        "Value (₹)",
        "Status"
      ]
    );
  }, [data]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "reports.low_stock.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReportHeader,
      {
        title: "Low Stock Alert",
        filterSummary: `${(data ?? []).length} items need attention`,
        onBack,
        onCsvExport: handleCsv,
        onPrint: () => window.print()
      }
    ),
    !isLoading && (data ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "data-card py-16 text-center",
        "data-ocid": "reports.low_stock.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-2 alert-green px-5 py-2.5 rounded-md text-sm font-medium", children: "All stock levels are healthy — no action needed." })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "data-card p-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      StockTable,
      {
        data,
        isLoading,
        showUrgentBadge: true,
        ocidPrefix: "reports.low_stock"
      }
    ) })
  ] });
}
function ItemLedgerReport({ onBack }) {
  const { data: allItems } = useItems();
  const [selectedItemId, setSelectedItemId] = reactExports.useState("");
  const { data: ledgerData, isLoading } = useItemLedgerReport(selectedItemId);
  const transactions = (ledgerData == null ? void 0 : ledgerData.transactions) ?? [];
  const item = ledgerData == null ? void 0 : ledgerData.item;
  const handleCsv = reactExports.useCallback(() => {
    downloadCSV(
      "item-ledger.csv",
      transactions.map((t) => [
        t.date,
        t.type,
        String(t.qty),
        String(t.balance),
        t.refNo
      ]),
      ["Date", "Type", "Qty", "Balance", "Ref No"]
    );
  }, [transactions]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "reports.item_ledger.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReportHeader,
      {
        title: "Item Ledger",
        filterSummary: item ? `${item.itemCode} — ${item.itemName}` : "Select an item",
        onBack,
        onCsvExport: handleCsv,
        onPrint: () => window.print()
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "data-card space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-end gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[240px] space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ledger-item", className: "text-xs font-medium", children: "Select Item" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedItemId, onValueChange: setSelectedItemId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            id: "ledger-item",
            className: "h-8 text-xs",
            "data-ocid": "reports.item_ledger.select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose an item…" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (allItems ?? []).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: i.id, className: "text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary mr-2", children: i.code }),
          i.name
        ] }, i.id)) })
      ] })
    ] }) }) }),
    !selectedItemId ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "data-card py-16 text-center text-sm text-muted-foreground",
        "data-ocid": "reports.item_ledger.empty_state",
        children: "Select an item above to view its complete transaction history."
      }
    ) : isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "data-card p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { cols: 5, rows: 6 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "data-card p-0 overflow-hidden print-table", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-3 text-muted-foreground font-medium", children: "Qty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-3 text-muted-foreground font-medium", children: "Balance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "Ref No." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: transactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 6,
          className: "py-12 text-center text-muted-foreground",
          children: "No transactions found for this item."
        }
      ) }) : transactions.map((txn, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
          "data-ocid": `reports.item_ledger.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground", children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-mono", children: txn.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                  txn.type === "Inward" ? "alert-green" : "alert-red"
                ),
                children: txn.type === "Inward" ? "IN" : "OUT"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                className: cn(
                  "py-2.5 px-3 text-right font-mono font-bold",
                  txn.qty > 0 ? "text-green-600 dark:text-green-400" : "text-destructive"
                ),
                children: txn.qty > 0 ? `+${txn.qty}` : txn.qty
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-mono font-semibold text-foreground", children: txn.balance }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-mono text-muted-foreground", children: txn.refNo })
          ]
        },
        `${txn.refNo}-${txn.date}`
      )) })
    ] }) })
  ] });
}
function DeptConsumptionReport({ onBack }) {
  const [fromDate, setFromDate] = reactExports.useState(() => {
    const d = /* @__PURE__ */ new Date();
    d.setMonth(d.getMonth() - 3);
    return d.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = reactExports.useState(
    () => (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  );
  const { data, isLoading } = useDeptConsumptionReport({ fromDate, toDate });
  const filterSummary = `${fromDate} to ${toDate}`;
  const handleCsv = reactExports.useCallback(() => {
    downloadCSV(
      "dept-consumption.csv",
      (data ?? []).map((d) => [
        d.department,
        String(d.totalQty),
        String(d.totalValue)
      ]),
      ["Department", "Total Qty", "Total Value (₹)"]
    );
  }, [data]);
  const maxVal = Math.max(...(data ?? []).map((d) => d.totalValue), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "reports.dept_consumption.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReportHeader,
      {
        title: "Department Consumption",
        filterSummary,
        onBack,
        onCsvExport: handleCsv,
        onPrint: () => window.print()
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "data-card no-print", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "From Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            value: fromDate,
            onChange: (e) => setFromDate(e.target.value),
            className: "h-8 rounded-md border border-input bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
            "data-ocid": "reports.dept_consumption.from_date"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "To Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            value: toDate,
            onChange: (e) => setToDate(e.target.value),
            className: "h-8 rounded-md border border-input bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
            "data-ocid": "reports.dept_consumption.to_date"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "data-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide", children: "Consumption Share" }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 flex items-center justify-center text-muted-foreground text-xs", children: "Loading…" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: data ?? [],
              dataKey: "totalValue",
              nameKey: "department",
              cx: "50%",
              cy: "50%",
              outerRadius: 80,
              label: ({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`,
              labelLine: false,
              children: (data ?? []).map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: PIE_COLORS[i % PIE_COLORS.length]
                },
                entry.department
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              formatter: (val) => [
                `₹${val.toLocaleString()}`,
                "Value"
              ],
              contentStyle: {
                background: "oklch(0.16 0.02 260)",
                border: "1px solid oklch(0.22 0.02 260)",
                borderRadius: "6px",
                fontSize: "11px"
              }
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "data-card p-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "Department" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-3 text-muted-foreground font-medium", children: "Total Qty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-3 text-muted-foreground font-medium", children: "Value (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium hidden lg:table-cell", children: "Share" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { cols: 4, rows: 5 }) }) }) : (data ?? []).map((dept, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
            "data-ocid": `reports.dept_consumption.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-medium text-foreground", children: dept.department }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-mono", children: dept.totalQty.toLocaleString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-right font-mono font-semibold", children: [
                "₹",
                dept.totalValue.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full bg-primary rounded-full transition-smooth",
                    style: {
                      width: `${dept.totalValue / maxVal * 100}%`
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground w-8 text-right", children: [
                  Math.round(dept.totalValue / maxVal * 100),
                  "%"
                ] })
              ] }) })
            ]
          },
          dept.department
        )) })
      ] }) })
    ] })
  ] });
}
const MONTHLY_SEED = [
  { month: "May 2024", totalGRNs: 4, totalQty: 68, totalValue: 95e3 },
  { month: "Jun 2024", totalGRNs: 3, totalQty: 52, totalValue: 72e3 },
  { month: "Jul 2024", totalGRNs: 5, totalQty: 84, totalValue: 118e3 },
  { month: "Aug 2024", totalGRNs: 2, totalQty: 36, totalValue: 48e3 },
  { month: "Sep 2024", totalGRNs: 6, totalQty: 110, totalValue: 156e3 },
  { month: "Oct 2024", totalGRNs: 4, totalQty: 75, totalValue: 98e3 },
  { month: "Nov 2024", totalGRNs: 3, totalQty: 58, totalValue: 82e3 },
  { month: "Dec 2024", totalGRNs: 5, totalQty: 92, totalValue: 131e3 },
  { month: "Jan 2025", totalGRNs: 3, totalQty: 61, totalValue: 85e3 },
  { month: "Feb 2025", totalGRNs: 2, totalQty: 44, totalValue: 62e3 },
  { month: "Mar 2025", totalGRNs: 4, totalQty: 70, totalValue: 45e3 },
  { month: "Apr 2025", totalGRNs: 2, totalQty: 38, totalValue: 5e4 }
];
function MonthlyPurchaseReport({ onBack }) {
  const handleCsv = reactExports.useCallback(() => {
    downloadCSV(
      "monthly-purchase.csv",
      MONTHLY_SEED.map((m) => [
        m.month,
        String(m.totalGRNs),
        String(m.totalQty),
        String(m.totalValue)
      ]),
      ["Month", "Total GRNs", "Total Qty", "Total Value (₹)"]
    );
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "reports.monthly_purchase.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReportHeader,
      {
        title: "Monthly Purchase (Inward)",
        filterSummary: "Last 12 months",
        onBack,
        onCsvExport: handleCsv,
        onPrint: () => window.print()
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "data-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide", children: "Monthly Purchase Value (₹)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        BarChart,
        {
          data: MONTHLY_SEED,
          margin: { top: 4, right: 8, bottom: 4, left: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CartesianGrid,
              {
                strokeDasharray: "3 3",
                stroke: "oklch(0.88 0.02 0 / 0.4)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "month",
                tick: { fontSize: 9, fill: "oklch(0.48 0.02 0)" },
                tickFormatter: (v) => v.split(" ")[0]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                tick: { fontSize: 9, fill: "oklch(0.48 0.02 0)" },
                tickFormatter: (v) => `₹${(v / 1e3).toFixed(0)}k`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                formatter: (val) => [`₹${val.toLocaleString()}`, "Value"],
                contentStyle: {
                  background: "oklch(0.16 0.02 260)",
                  border: "1px solid oklch(0.22 0.02 260)",
                  borderRadius: "6px",
                  fontSize: "11px"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "totalValue",
                fill: "oklch(0.45 0.08 260)",
                radius: [3, 3, 0, 0]
              }
            )
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "data-card p-0 overflow-hidden print-table", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 text-muted-foreground font-medium", children: "Month" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-3 text-muted-foreground font-medium", children: "Total GRNs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-3 text-muted-foreground font-medium", children: "Total Qty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-3 text-muted-foreground font-medium", children: "Total Value (₹)" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: MONTHLY_SEED.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
          "data-ocid": `reports.monthly_purchase.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground", children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-medium text-foreground", children: row.month }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-mono", children: row.totalGRNs }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-mono", children: row.totalQty.toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-right font-mono font-semibold text-primary", children: [
              "₹",
              row.totalValue.toLocaleString()
            ] })
          ]
        },
        row.month
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t-2 border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 2,
            className: "py-2.5 px-3 text-xs font-semibold text-foreground",
            children: "Totals"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-mono font-bold", children: MONTHLY_SEED.reduce((s, r) => s + r.totalGRNs, 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-mono font-bold", children: MONTHLY_SEED.reduce(
          (s, r) => s + r.totalQty,
          0
        ).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-right font-mono font-bold text-primary", children: [
          "₹",
          MONTHLY_SEED.reduce(
            (s, r) => s + r.totalValue,
            0
          ).toLocaleString()
        ] })
      ] }) })
    ] }) })
  ] });
}
function DeadStockReport({ onBack }) {
  const { data, isLoading } = useDeadStockReport();
  const handleCsv = reactExports.useCallback(() => {
    downloadCSV(
      "dead-stock.csv",
      (data ?? []).map((i) => [
        i.itemCode,
        i.itemName,
        i.category,
        i.unit,
        String(i.currentStock),
        String(i.stockValue),
        i.rackLocation
      ]),
      [
        "Code",
        "Item Name",
        "Category",
        "Unit",
        "Stock",
        "Value (₹)",
        "Location"
      ]
    );
  }, [data]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "reports.dead_stock.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReportHeader,
      {
        title: "Dead Stock Report",
        filterSummary: "No movement in 90 days",
        onBack,
        onCsvExport: handleCsv,
        onPrint: () => window.print()
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "data-card p-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      StockTable,
      {
        data,
        isLoading,
        ocidPrefix: "reports.dead_stock"
      }
    ) })
  ] });
}
function ReportLanding({
  onSelect,
  stockData,
  lowStockData
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "reports.landing.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Reports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Inventory analytics, consumption tracking, and operational reports" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "data-card text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground", children: (stockData == null ? void 0 : stockData.length) ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3 h-3" }),
          " Total Items"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "data-card text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-display font-bold text-foreground", children: [
          "₹",
          ((stockData ?? []).reduce((s, i) => s + i.stockValue, 0) / 1e5).toFixed(1),
          "L"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "Total Stock Value" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "data-card text-center border-accent/30 bg-accent/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-accent", children: (lowStockData == null ? void 0 : lowStockData.length) ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 text-accent" }),
          " Low Stock"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "data-card text-center border-destructive/30 bg-destructive/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-destructive", children: (stockData ?? []).filter(
          (i) => i.status === "critical" || i.status === "out"
        ).length }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 text-destructive" }),
          " Critical"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: REPORT_CARDS.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "data-card flex flex-col gap-3 relative group",
          card.phase2 ? "opacity-70 cursor-default" : "cursor-pointer hover:border-primary/40 hover:shadow-md transition-smooth"
        ),
        onClick: () => !card.phase2 && onSelect(card.id),
        role: card.phase2 ? void 0 : "button",
        tabIndex: card.phase2 ? -1 : 0,
        onKeyDown: (e) => {
          if (!card.phase2 && (e.key === "Enter" || e.key === " "))
            onSelect(card.id);
        },
        "aria-label": card.phase2 ? void 0 : `Open ${card.title} report`,
        "data-ocid": `reports.card.${card.id.replace(/-/g, "_")}`,
        children: [
          card.phase2 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2.5 right-2.5 bg-muted text-muted-foreground text-[9px] font-semibold px-1.5 py-0.5 rounded-sm border border-border uppercase tracking-wide", children: "Phase 2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "w-10 h-10 rounded-md flex items-center justify-center",
                card.phase2 ? "bg-muted text-muted-foreground" : card.badgeColor ? card.badgeColor : "bg-primary/10 text-primary"
              ),
              children: card.icon
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground leading-tight", children: card.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: card.description })
          ] }),
          !card.phase2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "w-full h-7 text-xs gap-1 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-smooth",
              tabIndex: -1,
              "aria-hidden": "true",
              "data-ocid": `reports.card.${card.id.replace(/-/g, "_")}.view_button`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-3 h-3" }),
                " View Report"
              ]
            }
          ),
          card.phase2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground italic", children: "Coming in Phase 2" })
        ]
      },
      card.id
    )) })
  ] });
}
function ReportsPage() {
  const [activeReport, setActiveReport] = reactExports.useState(null);
  const { data: stockData } = useCurrentStockReport();
  const { data: lowStockData } = useLowStockReport();
  const handleBack = () => setActiveReport(null);
  if (!activeReport) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReportLanding,
      {
        onSelect: setActiveReport,
        stockData,
        lowStockData
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "reports.page", className: "space-y-4", children: [
    activeReport === "current-stock" && /* @__PURE__ */ jsxRuntimeExports.jsx(CurrentStockReport, { onBack: handleBack }),
    activeReport === "low-stock" && /* @__PURE__ */ jsxRuntimeExports.jsx(LowStockReport, { onBack: handleBack }),
    activeReport === "item-ledger" && /* @__PURE__ */ jsxRuntimeExports.jsx(ItemLedgerReport, { onBack: handleBack }),
    activeReport === "dept-consumption" && /* @__PURE__ */ jsxRuntimeExports.jsx(DeptConsumptionReport, { onBack: handleBack }),
    activeReport === "monthly-purchase" && /* @__PURE__ */ jsxRuntimeExports.jsx(MonthlyPurchaseReport, { onBack: handleBack }),
    activeReport === "dead-stock" && /* @__PURE__ */ jsxRuntimeExports.jsx(DeadStockReport, { onBack: handleBack })
  ] });
}
export {
  ReportsPage as default
};
