import { ErrorState } from "@/components/ui/ErrorBoundary";
import { CardSkeleton } from "@/components/ui/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useDashboardStats,
  useDeptConsumption,
  useMonthlyConsumption,
  useTopUsedItems,
} from "@/hooks/use-dashboard";
import { useIssues } from "@/hooks/use-inventory";
import { useItems } from "@/hooks/use-items";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowDownToLine,
  BarChart2,
  FileText,
  Package,
  PackageOpen,
  Settings,
  TrendingDown,
  TrendingUp,
  Wrench,
  ZapOff,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ── Chart color palette (inline OKLCH for Recharts) ──────────────────────────
const CHART_COLORS = [
  "oklch(0.65 0.18 260)",
  "oklch(0.60 0.16 200)",
  "oklch(0.58 0.12 140)",
  "oklch(0.62 0.20 50)",
  "oklch(0.55 0.19 120)",
  "oklch(0.60 0.22 28)",
  "oklch(0.50 0.15 300)",
];

const TOOLTIP_STYLE = {
  background: "oklch(0.16 0.02 260)",
  border: "1px solid oklch(0.22 0.02 260)",
  borderRadius: "4px",
  fontSize: "11px",
  color: "oklch(0.92 0.01 0)",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatINR(value: number): string {
  if (value >= 10_00_000) return `₹${(value / 10_00_000).toFixed(2)}L`;
  if (value >= 1_000) return `₹${(value / 1_000).toFixed(1)}K`;
  return `₹${value.toLocaleString("en-IN")}`;
}

// ── KPI Card ─────────────────────────────────────────────────────────────────
type KPIVariant = "default" | "blue" | "amber" | "red" | "green";

function KPICard({
  label,
  value,
  sub,
  icon: Icon,
  variant = "default",
  badge,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: KPIVariant;
  badge?: React.ReactNode;
}) {
  const cardClass: Record<KPIVariant, string> = {
    default: "border-border",
    blue: "border-primary/25 bg-primary/5",
    amber: "border-accent/35 bg-accent/8",
    red: "border-destructive/35 bg-destructive/8",
    green: "border-green-500/30 bg-green-500/8",
  };
  const iconClass: Record<KPIVariant, string> = {
    default: "text-muted-foreground bg-muted",
    blue: "text-primary bg-primary/15",
    amber: "text-accent bg-accent/20",
    red: "text-destructive bg-destructive/15",
    green: "text-green-600 dark:text-green-400 bg-green-500/15",
  };
  return (
    <div
      className={cn(
        "data-card flex flex-col gap-3 hover:shadow-md transition-smooth",
        cardClass[variant],
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground leading-tight">
          {label}
        </p>
        <div className={cn("p-2 rounded-md shrink-0", iconClass[variant])}>
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="font-display text-2xl font-bold text-foreground leading-none">
            {value}
          </p>
          <p className="text-[10px] text-muted-foreground mt-1.5 truncate">
            {sub}
          </p>
        </div>
        {badge && <div className="shrink-0">{badge}</div>}
      </div>
    </div>
  );
}

// ── Stock Status ──────────────────────────────────────────────────────────────
function StockStatus({ stock, min }: { stock: number; min: number }) {
  if (stock === 0)
    return (
      <span className="text-[10px] font-semibold text-destructive">● Out</span>
    );
  if (stock <= min)
    return <span className="text-[10px] font-semibold text-accent">● Low</span>;
  return (
    <span className="text-[10px] font-semibold text-green-500 dark:text-green-400">
      ● OK
    </span>
  );
}

// ── Custom Pie Label ──────────────────────────────────────────────────────────
function PieLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) {
  if (percent < 0.06) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="oklch(0.97 0 0)"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={10}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useDashboardStats();
  const { data: monthly, isLoading: monthlyLoading } = useMonthlyConsumption();
  const { data: topItems, isLoading: topItemsLoading } = useTopUsedItems();
  const { data: deptData, isLoading: deptLoading } = useDeptConsumption();
  const { data: items } = useItems();
  const { data: issues } = useIssues();

  const recentIssues = (issues ?? []).slice(0, 4);
  const stockItems = (items ?? []).slice(0, 6);

  if (statsError)
    return <ErrorState message="Failed to load dashboard. Please refresh." />;

  return (
    <div className="space-y-5 pb-6" data-ocid="dashboard.page">
      {/* ── Page Header + Quick Actions ────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">
            Operations Dashboard
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <span className="ml-2 inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-600 dark:text-green-400 font-medium">
                Live
              </span>
            </span>
          </p>
        </div>
        <div
          className="flex items-center gap-2 flex-wrap"
          data-ocid="dashboard.quick_actions"
        >
          <Button
            asChild
            size="sm"
            className="h-8 text-xs gap-1.5"
            data-ocid="dashboard.new_grn_button"
          >
            <Link to="/inward">
              <ArrowDownToLine className="w-3.5 h-3.5" />
              New GRN
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="h-8 text-xs gap-1.5"
            data-ocid="dashboard.new_issue_button"
          >
            <Link to="/issue">
              <PackageOpen className="w-3.5 h-3.5" />
              New Issue
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-8 text-xs gap-1.5"
            data-ocid="dashboard.reports_button"
          >
            <Link to="/reports">
              <FileText className="w-3.5 h-3.5" />
              Reports
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-8 text-xs gap-1.5"
            data-ocid="dashboard.items_button"
          >
            <Link to="/items">
              <Package className="w-3.5 h-3.5" />
              Items
            </Link>
          </Button>
        </div>
      </div>

      {/* ── 8 KPI Cards ────────────────────────────────────────────────── */}
      {statsLoading ? (
        <CardSkeleton count={8} />
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
          data-ocid="dashboard.kpi_cards"
        >
          <KPICard
            label="Total Active Items"
            value={(stats?.totalActiveItems ?? 0).toLocaleString("en-IN")}
            sub="In item master"
            icon={Package}
            variant="blue"
          />
          <KPICard
            label="Stock Value"
            value={formatINR(stats?.currentStockValue ?? 0)}
            sub={`₹${(stats?.currentStockValue ?? 0).toLocaleString("en-IN")}`}
            icon={TrendingUp}
            variant="blue"
          />
          <KPICard
            label="Low Stock Items"
            value={String(stats?.lowStockCount ?? 0)}
            sub="Below min level"
            icon={AlertTriangle}
            variant={(stats?.lowStockCount ?? 0) > 0 ? "red" : "green"}
            badge={
              (stats?.lowStockCount ?? 0) > 0 ? (
                <Badge
                  variant="destructive"
                  className="text-[9px] h-4 px-1.5"
                  data-ocid="dashboard.low_stock_badge"
                >
                  Alert
                </Badge>
              ) : null
            }
          />
          <KPICard
            label="Pending Repairs"
            value="0"
            sub="Phase 2 feature"
            icon={Wrench}
            variant="amber"
          />
          <KPICard
            label="Today Inward"
            value={String(stats?.todayInwardCount ?? 0)}
            sub="GRN entries today"
            icon={ArrowDownToLine}
            variant={(stats?.todayInwardCount ?? 0) > 0 ? "blue" : "default"}
          />
          <KPICard
            label="Today Issue"
            value={String(stats?.todayIssueCount ?? 0)}
            sub="Issue slips today"
            icon={PackageOpen}
            variant={(stats?.todayIssueCount ?? 0) > 0 ? "blue" : "default"}
          />
          <KPICard
            label="Pending Indents"
            value="0"
            sub="Phase 2 feature"
            icon={Activity}
            variant="default"
          />
          <KPICard
            label="Non-Moving Items"
            value={String(stats?.nonMovingCount ?? 0)}
            sub="No movement 90d"
            icon={ZapOff}
            variant={(stats?.nonMovingCount ?? 0) > 20 ? "amber" : "default"}
          />
        </div>
      )}

      {/* ── Charts Row 1: Consumption + Dept Breakdown ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Monthly Consumption Trend */}
        <div
          className="data-card lg:col-span-3"
          data-ocid="dashboard.consumption_chart"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Monthly Consumption Trend
            </h3>
            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
              Last 6 months
            </span>
          </div>
          {monthlyLoading ? (
            <div className="h-52 bg-muted rounded animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart
                data={monthly ?? []}
                margin={{ top: 6, right: 6, left: -18, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="consGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(0.62 0.15 260)"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.62 0.15 260)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.22 0.02 260)"
                  strokeOpacity={0.5}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: "oklch(0.55 0.01 0)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "oklch(0.55 0.01 0)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  cursor={{
                    stroke: "oklch(0.62 0.15 260)",
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="totalQty"
                  stroke="oklch(0.62 0.15 260)"
                  fill="url(#consGrad)"
                  strokeWidth={2.5}
                  name="Qty Issued"
                  dot={{ fill: "oklch(0.62 0.15 260)", r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Department-Wise Pie */}
        <div
          className="data-card lg:col-span-2"
          data-ocid="dashboard.dept_chart"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-primary" />
              Dept-Wise Issues
            </h3>
          </div>
          {deptLoading ? (
            <div className="h-52 bg-muted rounded animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie
                  data={deptData ?? []}
                  dataKey="totalQty"
                  nameKey="department"
                  cx="50%"
                  cy="45%"
                  outerRadius={72}
                  labelLine={false}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  label={(props: any) => <PieLabel {...props} />}
                >
                  {(deptData ?? []).map((entry, index) => (
                    <Cell
                      key={`pie-${entry.department}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend
                  iconType="circle"
                  iconSize={7}
                  wrapperStyle={{ fontSize: "10px", paddingTop: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── Charts Row 2: Top 10 Items BarChart ────────────────────────── */}
      <div className="data-card" data-ocid="dashboard.top_items_chart">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-primary" />
            Top 10 Used Items (YTD)
          </h3>
          <Link
            to="/reports"
            className="text-[10px] text-primary hover:underline"
            data-ocid="dashboard.top_items_view_all"
          >
            View Full Report →
          </Link>
        </div>
        {topItemsLoading ? (
          <div className="h-48 bg-muted rounded animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={topItems ?? []}
              layout="vertical"
              margin={{ top: 0, right: 40, left: 8, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.22 0.02 260)"
                strokeOpacity={0.5}
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: "oklch(0.55 0.01 0)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="itemCode"
                tick={{
                  fontSize: 10,
                  fill: "oklch(0.65 0.18 260)",
                  fontFamily: "monospace",
                }}
                tickLine={false}
                axisLine={false}
                width={82}
              />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                formatter={(
                  val: number,
                  _name: string,
                  props: { payload?: { itemName?: string } },
                ) => [
                  `${val} ${props.payload?.itemName ? `— ${props.payload.itemName}` : ""}`,
                  "Qty Issued",
                ]}
              />
              <Bar
                dataKey="totalQty"
                radius={[0, 4, 4, 0]}
                name="Qty Issued"
                maxBarSize={16}
              >
                {(topItems ?? []).map((entry, index) => (
                  <Cell
                    key={`top-${entry.itemId}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                    fillOpacity={0.9}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ── Bottom Row: Stock Table + Recent Issues ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Stock Overview */}
        <div className="data-card" data-ocid="dashboard.stock_table">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              Stock Overview
            </h3>
            <Link
              to="/items"
              className="text-[10px] text-primary hover:underline"
              data-ocid="dashboard.stock_view_all"
            >
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 text-muted-foreground font-medium">
                    Item
                  </th>
                  <th className="text-right py-2 px-2 text-muted-foreground font-medium">
                    Qty
                  </th>
                  <th className="text-right py-2 px-2 text-muted-foreground font-medium">
                    Min
                  </th>
                  <th className="text-right py-2 px-2 text-muted-foreground font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {stockItems.map((item, i) => (
                  <tr
                    key={item.id}
                    className="border-b border-border/40 hover:bg-muted/30 transition-colors"
                    data-ocid={`dashboard.stock.item.${i + 1}`}
                  >
                    <td className="py-2 px-2">
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium text-foreground truncate max-w-[160px]">
                          {item.name}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {item.code}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-right font-mono font-semibold">
                      {item.currentStock}
                    </td>
                    <td className="py-2 px-2 text-right font-mono text-muted-foreground">
                      {item.minimumStock}
                    </td>
                    <td className="py-2 px-2 text-right">
                      <StockStatus
                        stock={item.currentStock}
                        min={item.minimumStock}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Issues */}
        <div className="data-card" data-ocid="dashboard.recent_issues">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <PackageOpen className="w-4 h-4 text-primary" />
              Recent Issues
            </h3>
            <Link
              to="/issue"
              className="text-[10px] text-primary hover:underline"
              data-ocid="dashboard.issues_view_all"
            >
              View All →
            </Link>
          </div>
          {recentIssues.length === 0 ? (
            <div
              className="text-center py-10 text-muted-foreground text-xs"
              data-ocid="dashboard.recent_issues.empty_state"
            >
              <PackageOpen className="w-8 h-8 mx-auto mb-2 opacity-30" />
              No issues recorded today
            </div>
          ) : (
            <div className="space-y-2">
              {recentIssues.map((issue, i) => {
                const isEmergency = issue.issueType === "emergencyBreakdown";
                return (
                  <div
                    key={issue.id}
                    className={cn(
                      "flex items-start gap-3 p-2.5 rounded-sm border transition-colors",
                      isEmergency
                        ? "border-destructive/30 bg-destructive/5 hover:bg-destructive/8"
                        : "border-border/60 hover:bg-muted/30",
                    )}
                    data-ocid={`dashboard.issue.item.${i + 1}`}
                  >
                    <div
                      className={cn(
                        "p-1.5 rounded shrink-0 mt-0.5",
                        isEmergency ? "bg-destructive/15" : "bg-muted",
                      )}
                    >
                      {isEmergency ? (
                        <AlertTriangle className="w-3 h-3 text-destructive" />
                      ) : (
                        <PackageOpen className="w-3 h-3 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-[11px] font-semibold text-foreground">
                          {issue.issueSlipNo}
                        </p>
                        <Badge
                          variant={isEmergency ? "destructive" : "secondary"}
                          className="text-[9px] h-4 px-1.5 shrink-0"
                        >
                          {isEmergency ? "Emergency" : "Normal"}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                        {issue.department} · {issue.machineName}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {issue.requestedBy} → {issue.issuedBy}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Alert Strip: Low Stock Items ───────────────────────────────── */}
      {(stats?.lowStockCount ?? 0) > 0 && (
        <div
          className="alert-amber rounded-md p-3 flex items-center justify-between gap-3"
          data-ocid="dashboard.low_stock_alert"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span className="text-xs font-medium">
              {stats?.lowStockCount} items are below minimum stock level.
              Immediate procurement recommended.
            </span>
          </div>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-7 text-xs shrink-0 border-accent/40 text-accent hover:bg-accent/10"
            data-ocid="dashboard.low_stock_action_button"
          >
            <Link to="/reports">View Report</Link>
          </Button>
        </div>
      )}

      {/* ── Settings Quick Link ────────────────────────────────────────── */}
      <div className="flex items-center justify-end">
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="h-7 text-xs text-muted-foreground gap-1.5"
          data-ocid="dashboard.settings_button"
        >
          <Link to="/settings">
            <Settings className="w-3.5 h-3.5" />
            Settings
          </Link>
        </Button>
      </div>
    </div>
  );
}
