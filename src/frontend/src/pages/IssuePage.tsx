import { TableSkeleton } from "@/components/ui/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAddIssue, useIssues } from "@/hooks/use-inventory";
import { useItems } from "@/hooks/use-items";
import { cn } from "@/lib/utils";
import type { IssueEntryPublic, IssueItem, IssueType } from "@/types/erp";
import {
  AlertTriangle,
  ArrowUpDown,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Info,
  Loader2,
  PackageOpen,
  Plus,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ── Constants ─────────────────────────────────────────────────────────────────

const DEPARTMENTS = [
  "Production",
  "Maintenance",
  "Quality",
  "Electrical",
  "Mechanical",
  "Administration",
  "Others",
];

const ISSUE_TYPE_META: Record<
  IssueType,
  { label: string; badgeClass: string; rowClass: string; icon: React.ReactNode }
> = {
  normal: {
    label: "Normal",
    badgeClass: "bg-primary/15 text-primary border-primary/30 border",
    rowClass: "",
    icon: <Info className="w-3 h-3" />,
  },
  emergencyBreakdown: {
    label: "Emergency Breakdown",
    badgeClass:
      "bg-destructive/15 text-destructive border-destructive/30 border font-semibold",
    rowClass: "bg-accent/8",
    icon: <Zap className="w-3 h-3" />,
  },
  directConsumable: {
    label: "Direct Consumable",
    badgeClass:
      "bg-green-500/15 text-green-700 dark:text-green-400 border border-green-500/30",
    rowClass: "",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
};

type SortDir = "asc" | "desc";

// ── Sub-components ────────────────────────────────────────────────────────────

function IssueBadge({ type }: { type: IssueType }) {
  const meta = ISSUE_TYPE_META[type];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap",
        meta.badgeClass,
      )}
    >
      {meta.icon}
      {meta.label}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "completed")
    return (
      <span className="inline-flex items-center gap-1 text-[10px] text-green-600 dark:text-green-400 font-medium">
        <CheckCircle2 className="w-3 h-3" /> Completed
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-accent font-medium">
      <Clock className="w-3 h-3" /> Pending
    </span>
  );
}

// ── Issue Detail Dialog ───────────────────────────────────────────────────────

function IssueDetailDialog({
  issue,
  onClose,
}: {
  issue: IssueEntryPublic;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="issue.detail.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <span className="font-mono text-primary">{issue.issueSlipNo}</span>
            <IssueBadge type={issue.issueType} />
          </DialogTitle>
        </DialogHeader>

        {issue.issueType === "emergencyBreakdown" && (
          <div className="alert-red rounded-md px-3 py-2 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              Emergency Breakdown — This issue was created under an emergency
              situation.
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
          <Field label="Date" value={issue.date} />
          <Field label="Department" value={issue.department} />
          <Field label="Machine / Equipment" value={issue.machineName || "—"} />
          <Field label="Status">
            <StatusBadge status={issue.status} />
          </Field>
          <Field label="Requested By" value={issue.requestedBy} />
          <Field label="Issued By" value={issue.issuedBy} />
          <div className="col-span-2">
            <Field label="Purpose" value={issue.purpose || "—"} />
          </div>
          <div className="col-span-2 text-muted-foreground">
            Created: {new Date(issue.createdAt).toLocaleString()}
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-xs font-semibold text-foreground mb-2">
            Items Issued ({issue.items.length})
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                    #
                  </th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                    Item Code
                  </th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                    Item Name
                  </th>
                  <th className="text-right py-2 px-3 text-muted-foreground font-medium">
                    Qty
                  </th>
                </tr>
              </thead>
              <tbody>
                {issue.items.map((item, i) => (
                  <tr
                    key={`${item.itemId}-${i}`}
                    className="border-b border-border/50"
                  >
                    <td className="py-2 px-3 text-muted-foreground">{i + 1}</td>
                    <td className="py-2 px-3 font-mono text-primary">
                      {item.itemCode}
                    </td>
                    <td className="py-2 px-3 text-foreground">
                      {item.itemName}
                    </td>
                    <td className="py-2 px-3 text-right font-semibold">
                      {item.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="issue.detail.close_button"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-muted-foreground text-[10px] uppercase tracking-wide mb-0.5">
        {label}
      </p>
      {children ?? <p className="text-foreground font-medium">{value}</p>}
    </div>
  );
}

// ── New Issue Line Row ────────────────────────────────────────────────────────

function IssueLineRow({
  line,
  idx,
  items,
  onChange,
  onRemove,
}: {
  line: IssueItem & { stockWarning?: string };
  idx: number;
  items: {
    id: string;
    code: string;
    name: string;
    currentStock: number;
    unit: string;
  }[];
  onChange: (field: string, value: string | number) => void;
  onRemove: () => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = search
    ? items.filter(
        (i) =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.code.toLowerCase().includes(search.toLowerCase()),
      )
    : items;

  return (
    <div className="p-3 bg-muted/20 rounded-md border border-border/60 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
          Item {idx + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="text-muted-foreground hover:text-destructive transition-smooth p-0.5 rounded"
          aria-label="Remove item"
          data-ocid={`issue.form.remove_line.${idx + 1}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-12 gap-2 items-start">
        {/* Item Search */}
        <div className="col-span-7 space-y-1">
          <Label className="text-[10px]">Item Code / Name</Label>
          {line.itemId ? (
            <div className="flex items-center gap-1.5 h-8 px-2 bg-card border border-border rounded-sm text-xs">
              <span className="font-mono text-primary shrink-0">
                {line.itemCode}
              </span>
              <span className="text-foreground truncate flex-1">
                {line.itemName}
              </span>
              <button
                type="button"
                onClick={() => onChange("itemId", "")}
                className="shrink-0 text-muted-foreground hover:text-foreground"
                aria-label="Clear item"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <Input
                className="h-8 text-xs pr-6"
                placeholder="Search item…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid={`issue.form.item.search.${idx + 1}`}
              />
              {search && filtered.length > 0 && (
                <div className="absolute z-50 left-0 top-full mt-1 w-full max-h-44 overflow-y-auto bg-popover border border-border rounded-md shadow-lg">
                  {filtered.slice(0, 8).map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors flex items-center justify-between gap-2"
                      onClick={() => {
                        onChange("itemId", item.id);
                        setSearch("");
                      }}
                    >
                      <span>
                        <span className="font-mono text-primary mr-2">
                          {item.code}
                        </span>
                        <span className="text-foreground">{item.name}</span>
                      </span>
                      <span className="shrink-0 text-muted-foreground text-[10px]">
                        {item.currentStock} {item.unit}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Qty */}
        <div className="col-span-3 space-y-1">
          <Label className="text-[10px]">Qty</Label>
          <Input
            type="number"
            value={line.qty}
            onChange={(e) => onChange("qty", Number(e.target.value))}
            min={1}
            className="h-8 text-xs"
            data-ocid={`issue.form.qty.input.${idx + 1}`}
          />
        </div>

        {/* Unit auto-fill */}
        <div className="col-span-2 space-y-1">
          <Label className="text-[10px]">Unit</Label>
          <div className="h-8 flex items-center px-2 bg-muted/40 rounded text-xs text-muted-foreground border border-border/50">
            {items.find((i) => i.id === line.itemId)?.unit ?? "—"}
          </div>
        </div>
      </div>

      {/* Stock warning */}
      {line.stockWarning && (
        <div
          className="alert-red rounded px-2 py-1.5 text-[11px] flex items-center gap-1.5"
          data-ocid={`issue.form.stock_warning.${idx + 1}`}
        >
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          {line.stockWarning}
        </div>
      )}
    </div>
  );
}

// ── Create Issue Dialog ───────────────────────────────────────────────────────

type FormState = {
  issueSlipNo: string;
  date: string;
  department: string;
  machineName: string;
  issueType: IssueType;
  requestedBy: string;
  issuedBy: string;
  purpose: string;
  otherDepartment: string;
};

type LineItemExtended = IssueItem & { stockWarning?: string };

function generateSlipNo() {
  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 9000) + 1000);
  return `ISS-${year}${seq}`;
}

function CreateIssueDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: allItems } = useItems();
  const addIssue = useAddIssue();

  const [form, setForm] = useState<FormState>({
    issueSlipNo: generateSlipNo(),
    date: new Date().toISOString().split("T")[0],
    department: "",
    machineName: "",
    issueType: "normal",
    requestedBy: "",
    issuedBy: "",
    purpose: "",
    otherDepartment: "",
  });

  const [lineItems, setLineItems] = useState<LineItemExtended[]>([
    { itemId: "", itemCode: "", itemName: "", qty: 1 },
  ]);

  const itemsForSearch = useMemo(
    () =>
      (allItems ?? []).map((i) => ({
        id: i.id,
        code: i.code,
        name: i.name,
        currentStock: i.currentStock,
        unit: i.unit,
      })),
    [allItems],
  );

  const setField = (key: keyof FormState, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const updateLine = (idx: number, field: string, val: string | number) => {
    setLineItems((prev) => {
      const updated = [...prev];
      const line = { ...updated[idx], [field]: val };

      if (field === "itemId") {
        const item = (allItems ?? []).find((i) => i.id === String(val));
        if (item) {
          line.itemCode = item.code;
          line.itemName = item.name;
          line.stockWarning =
            line.qty > item.currentStock
              ? `Insufficient stock: only ${item.currentStock} ${item.unit} available`
              : undefined;
        } else {
          line.itemCode = "";
          line.itemName = "";
          line.stockWarning = undefined;
        }
      }

      if (field === "qty") {
        const item = (allItems ?? []).find((i) => i.id === line.itemId);
        if (item) {
          line.stockWarning =
            Number(val) > item.currentStock
              ? `Insufficient stock: only ${item.currentStock} ${item.unit} available`
              : undefined;
        }
      }

      updated[idx] = line;
      return updated;
    });
  };

  const addLine = () =>
    setLineItems((l) => [
      ...l,
      { itemId: "", itemCode: "", itemName: "", qty: 1 },
    ]);

  const removeLine = (idx: number) =>
    setLineItems((l) => l.filter((_, j) => j !== idx));

  const hasWarnings = lineItems.some((l) => !!l.stockWarning);
  const resolvedDepartment =
    form.department === "Others" ? form.otherDepartment : form.department;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasWarnings) {
      toast.warning(
        "Issuing with insufficient stock — proceeding with override",
      );
    }
    const cleanItems = lineItems
      .filter((l) => l.itemId)
      .map(({ stockWarning: _w, ...rest }) => rest);
    if (cleanItems.length === 0) {
      toast.error("Add at least one item to issue");
      return;
    }
    await addIssue.mutateAsync({
      issueSlipNo: form.issueSlipNo,
      date: form.date,
      department: resolvedDepartment || form.department,
      machineName: form.machineName,
      issueType: form.issueType,
      requestedBy: form.requestedBy,
      issuedBy: form.issuedBy,
      purpose: form.purpose,
      items: cleanItems,
    });
    toast.success(`Issue slip ${form.issueSlipNo} created`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[92vh] overflow-y-auto"
        data-ocid="issue.add.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            New Material Issue Slip
          </DialogTitle>
        </DialogHeader>

        {/* Issue type banners */}
        {form.issueType === "emergencyBreakdown" && (
          <div
            className="alert-red rounded-md px-3 py-2.5 flex items-center gap-2 text-xs font-medium"
            data-ocid="issue.form.emergency_banner"
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <div>
              <p className="font-semibold">Emergency Breakdown Issue</p>
              <p className="font-normal opacity-80">
                This issue will be flagged as critical in machine history.
              </p>
            </div>
          </div>
        )}
        {form.issueType === "directConsumable" && (
          <div
            className="alert-green rounded-md px-3 py-2.5 flex items-center gap-2 text-xs"
            data-ocid="issue.form.consumable_banner"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <div>
              <p className="font-semibold">Direct Consumable Issue</p>
              <p className="font-normal opacity-80">
                Items will be charged directly to department consumption.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Header fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Issue Slip No</Label>
              <Input
                value={form.issueSlipNo}
                onChange={(e) => setField("issueSlipNo", e.target.value)}
                required
                className="font-mono h-8 text-xs"
                data-ocid="issue.form.slip_no.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setField("date", e.target.value)}
                required
                className="h-8 text-xs"
                data-ocid="issue.form.date.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Issue Type</Label>
              <Select
                value={form.issueType}
                onValueChange={(v) => setField("issueType", v)}
              >
                <SelectTrigger
                  className="h-8 text-xs"
                  data-ocid="issue.form.type.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">
                    <span className="flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 text-primary" />
                      Normal
                    </span>
                  </SelectItem>
                  <SelectItem value="emergencyBreakdown">
                    <span className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-destructive" />
                      Emergency Breakdown
                    </span>
                  </SelectItem>
                  <SelectItem value="directConsumable">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                      Direct Consumable
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Department</Label>
              <Select
                value={form.department}
                onValueChange={(v) => setField("department", v)}
              >
                <SelectTrigger
                  className="h-8 text-xs"
                  data-ocid="issue.form.dept.select"
                >
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {form.department === "Others" && (
              <div className="col-span-2 space-y-1.5">
                <Label className="text-xs">Specify Department</Label>
                <Input
                  value={form.otherDepartment}
                  onChange={(e) => setField("otherDepartment", e.target.value)}
                  placeholder="Enter department name"
                  className="h-8 text-xs"
                  required
                  data-ocid="issue.form.other_dept.input"
                />
              </div>
            )}

            <div className="col-span-2 space-y-1.5">
              <Label className="text-xs">Machine / Equipment Name</Label>
              <Input
                value={form.machineName}
                onChange={(e) => setField("machineName", e.target.value)}
                placeholder="e.g. Shearing Machine SHR-01 (optional)"
                className="h-8 text-xs"
                data-ocid="issue.form.machine.input"
              />
            </div>

            <div className="col-span-2 space-y-1.5">
              <Label className="text-xs">Purpose</Label>
              <Textarea
                value={form.purpose}
                onChange={(e) => setField("purpose", e.target.value)}
                placeholder="Reason / purpose of this issue…"
                rows={2}
                className="text-xs resize-none"
                data-ocid="issue.form.purpose.textarea"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Requested By</Label>
              <Input
                value={form.requestedBy}
                onChange={(e) => setField("requestedBy", e.target.value)}
                placeholder="Operator / engineer name"
                required
                className="h-8 text-xs"
                data-ocid="issue.form.requested_by.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Issued By</Label>
              <Input
                value={form.issuedBy}
                onChange={(e) => setField("issuedBy", e.target.value)}
                placeholder="Store person name"
                required
                className="h-8 text-xs"
                data-ocid="issue.form.issued_by.input"
              />
            </div>
          </div>

          <Separator />

          {/* Line Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-semibold">
                Items to Issue{" "}
                <span className="text-muted-foreground font-normal">
                  ({lineItems.length})
                </span>
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-6 text-xs px-2 gap-1"
                onClick={addLine}
                data-ocid="issue.form.add_line_button"
              >
                <Plus className="w-3 h-3" /> Add Item
              </Button>
            </div>

            <div className="space-y-2" data-ocid="issue.form.line_items">
              {lineItems.map((line, idx) => (
                <IssueLineRow
                  key={`line-${line.itemId || idx}`}
                  line={line}
                  idx={idx}
                  items={itemsForSearch}
                  onChange={(field, val) => updateLine(idx, field, val)}
                  onRemove={() => removeLine(idx)}
                />
              ))}
            </div>

            {hasWarnings && (
              <div
                className="mt-2 alert-amber rounded px-3 py-2 text-[11px] flex items-center gap-1.5"
                data-ocid="issue.form.override_warning"
              >
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                Stock warning active — submission allowed with override. Verify
                quantities before proceeding.
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="issue.add.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addIssue.isPending}
              className={cn(
                form.issueType === "emergencyBreakdown" &&
                  "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              )}
              data-ocid="issue.add.submit_button"
            >
              {addIssue.isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Saving…
                </>
              ) : (
                "Create Issue Slip"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Filters Bar ───────────────────────────────────────────────────────────────

function FiltersBar({
  filterType,
  setFilterType,
  filterDept,
  setFilterDept,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
}: {
  filterType: "all" | IssueType;
  setFilterType: (v: "all" | IssueType) => void;
  filterDept: string;
  setFilterDept: (v: string) => void;
  dateFrom: string;
  setDateFrom: (v: string) => void;
  dateTo: string;
  setDateTo: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Tabs
        value={filterType}
        onValueChange={(v) => setFilterType(v as "all" | IssueType)}
        data-ocid="issue.filter_tabs"
      >
        <TabsList className="h-7">
          <TabsTrigger
            value="all"
            className="text-[11px] h-5 px-2.5"
            data-ocid="issue.filter.all.tab"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="normal"
            className="text-[11px] h-5 px-2.5"
            data-ocid="issue.filter.normal.tab"
          >
            Normal
          </TabsTrigger>
          <TabsTrigger
            value="emergencyBreakdown"
            className="text-[11px] h-5 px-2"
            data-ocid="issue.filter.emergency.tab"
          >
            <AlertTriangle className="w-2.5 h-2.5 mr-1" />
            Emergency
          </TabsTrigger>
          <TabsTrigger
            value="directConsumable"
            className="text-[11px] h-5 px-2"
            data-ocid="issue.filter.consumable.tab"
          >
            Consumable
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Select value={filterDept} onValueChange={setFilterDept}>
        <SelectTrigger
          className="h-7 text-xs w-[150px]"
          data-ocid="issue.filter.dept.select"
        >
          <SelectValue placeholder="All departments" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All departments</SelectItem>
          {DEPARTMENTS.map((d) => (
            <SelectItem key={d} value={d}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-1">
        <Input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="h-7 text-xs w-[120px]"
          data-ocid="issue.filter.date_from.input"
        />
        <span className="text-xs text-muted-foreground">–</span>
        <Input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="h-7 text-xs w-[120px]"
          data-ocid="issue.filter.date_to.input"
        />
      </div>

      {(filterType !== "all" || filterDept !== "all" || dateFrom || dateTo) && (
        <button
          type="button"
          onClick={() => {
            setFilterType("all");
            setFilterDept("all");
            setDateFrom("");
            setDateTo("");
          }}
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-smooth"
          data-ocid="issue.filter.clear_button"
        >
          <X className="w-3 h-3" /> Clear
        </button>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function IssuePage() {
  const { data: issues, isLoading } = useIssues();
  const [addOpen, setAddOpen] = useState(false);
  const [detailIssue, setDetailIssue] = useState<IssueEntryPublic | null>(null);

  // Filters
  const [filterType, setFilterType] = useState<"all" | IssueType>("all");
  const [filterDept, setFilterDept] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Sorting
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = useMemo(() => {
    let list = issues ?? [];

    if (filterType !== "all")
      list = list.filter((i) => i.issueType === filterType);
    if (filterDept !== "all")
      list = list.filter((i) => i.department === filterDept);
    if (dateFrom) list = list.filter((i) => i.date >= dateFrom);
    if (dateTo) list = list.filter((i) => i.date <= dateTo);

    // Sort: emergency first, then by date
    list = [...list].sort((a, b) => {
      const aEmergency = a.issueType === "emergencyBreakdown" ? 0 : 1;
      const bEmergency = b.issueType === "emergencyBreakdown" ? 0 : 1;
      if (aEmergency !== bEmergency) return aEmergency - bEmergency;
      return sortDir === "desc"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date);
    });

    return list;
  }, [issues, filterType, filterDept, dateFrom, dateTo, sortDir]);

  const emergencyCount = (issues ?? []).filter(
    (i) => i.issueType === "emergencyBreakdown",
  ).length;

  return (
    <div className="space-y-5" data-ocid="issue.page">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Material Issue
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {issues?.length ?? 0} total issue slips
            {emergencyCount > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 text-destructive text-xs">
                <AlertTriangle className="w-3 h-3" />
                {emergencyCount} emergency
              </span>
            )}
          </p>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
          className="gap-2 shrink-0"
          data-ocid="issue.add_button"
        >
          <Plus className="w-4 h-4" /> New Issue Slip
        </Button>
      </div>

      {/* Filters */}
      <FiltersBar
        filterType={filterType}
        setFilterType={setFilterType}
        filterDept={filterDept}
        setFilterDept={setFilterDept}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
      />

      {/* Issue Table */}
      <div className="data-card p-0 overflow-hidden" data-ocid="issue.table">
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton cols={8} rows={5} />
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3"
            data-ocid="issue.empty_state"
          >
            <PackageOpen className="w-10 h-10 text-muted-foreground/40" />
            <p className="text-sm font-medium text-muted-foreground">
              No material issues recorded yet
            </p>
            <p className="text-xs text-muted-foreground/70">
              {filterType !== "all" ||
              filterDept !== "all" ||
              dateFrom ||
              dateTo
                ? "Try clearing the filters"
                : "Create the first issue slip to get started"}
            </p>
            {filterType === "all" &&
              filterDept === "all" &&
              !dateFrom &&
              !dateTo && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAddOpen(true)}
                  data-ocid="issue.empty_add_button"
                >
                  Create Issue Slip
                </Button>
              )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium whitespace-nowrap">
                    Slip No
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                    <button
                      type="button"
                      onClick={() =>
                        setSortDir((d) => (d === "desc" ? "asc" : "desc"))
                      }
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                      data-ocid="issue.sort.date_button"
                    >
                      Date
                      {sortDir === "desc" ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronUp className="w-3 h-3" />
                      )}
                      <ArrowUpDown className="w-2.5 h-2.5 opacity-40" />
                    </button>
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                    Department
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium hidden md:table-cell">
                    Machine
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                    Issue Type
                  </th>
                  <th className="text-center py-2.5 px-3 text-muted-foreground font-medium hidden sm:table-cell">
                    Items
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium hidden lg:table-cell">
                    Issued By
                  </th>
                  <th className="text-center py-2.5 px-3 text-muted-foreground font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((issue, i) => (
                  <tr
                    key={issue.id}
                    onClick={() => setDetailIssue(issue)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setDetailIssue(issue);
                    }}
                    tabIndex={0}
                    className={cn(
                      "border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer",
                      issue.issueType === "emergencyBreakdown" &&
                        "bg-destructive/5 hover:bg-destructive/10",
                    )}
                    data-ocid={`issue.item.${i + 1}`}
                  >
                    <td className="py-2.5 px-3 font-mono text-primary font-medium whitespace-nowrap">
                      {issue.issueSlipNo}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap">
                      {issue.date}
                    </td>
                    <td className="py-2.5 px-3 text-foreground font-medium">
                      {issue.department}
                    </td>
                    <td className="py-2.5 px-3 hidden md:table-cell text-muted-foreground truncate max-w-[140px]">
                      {issue.machineName || "—"}
                    </td>
                    <td className="py-2.5 px-3">
                      <IssueBadge type={issue.issueType} />
                    </td>
                    <td className="py-2.5 px-3 text-center hidden sm:table-cell">
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 font-mono"
                      >
                        {issue.items.length}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-3 hidden lg:table-cell text-muted-foreground">
                      {issue.issuedBy}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <StatusBadge status={issue.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <CreateIssueDialog open={addOpen} onClose={() => setAddOpen(false)} />
      {detailIssue && (
        <IssueDetailDialog
          issue={detailIssue}
          onClose={() => setDetailIssue(null)}
        />
      )}
    </div>
  );
}
