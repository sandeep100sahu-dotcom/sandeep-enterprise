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
import {
  useAddGRN,
  useGRNs,
  useUpdateGRNQCStatus,
} from "@/hooks/use-inventory";
import { useItems } from "@/hooks/use-items";
import { cn } from "@/lib/utils";
import type { GRNEntryPublic, GRNItem, QCStatus } from "@/types/erp";
import {
  AlertTriangle,
  ArrowDownToLine,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Filter,
  Package,
  Plus,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── QC badge config ──────────────────────────────────────────────────────────
const QC_CONFIG: Record<
  QCStatus,
  { label: string; className: string; icon: React.ElementType }
> = {
  pending: {
    label: "QC Pending",
    className: "bg-accent/15 text-accent border border-accent/30",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    className:
      "bg-green-500/15 text-green-700 border border-green-500/30 dark:text-green-400",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    className:
      "bg-destructive/15 text-destructive border border-destructive/30",
    icon: XCircle,
  },
};

// ─── Blank line item ──────────────────────────────────────────────────────────
const BLANK_LINE: GRNItem = {
  itemId: "",
  itemCode: "",
  itemName: "",
  qty: 1,
  rate: 0,
  gst: 18,
  total: 0,
};

function calcTotal(line: GRNItem) {
  return line.qty * line.rate * (1 + line.gst / 100);
}

function fmtCurrency(n: number) {
  return `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ─── QCBadge ─────────────────────────────────────────────────────────────────
function QCBadge({ status }: { status: QCStatus }) {
  const cfg = QC_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-medium",
        cfg.className,
      )}
    >
      <Icon className="w-2.5 h-2.5" />
      {cfg.label}
    </span>
  );
}

// ─── GRN Detail Dialog ────────────────────────────────────────────────────────
function GRNDetailDialog({
  grn,
  onClose,
  onApprove,
  onReject,
  isPending,
}: {
  grn: GRNEntryPublic;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isPending: boolean;
}) {
  const [confirmApprove, setConfirmApprove] = useState(false);
  const grandTotal = grn.items.reduce((s, l) => s + l.total, 0);
  const totalQty = grn.items.reduce((s, l) => s + l.qty, 0);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="inward.detail_dialog"
      >
        <DialogHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <DialogTitle className="font-display text-lg">
                {grn.grnNo}
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {grn.supplierName} · {grn.date}
              </p>
            </div>
            <QCBadge status={grn.qcStatus} />
          </div>
        </DialogHeader>

        {/* Header meta */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { label: "GRN No", value: grn.grnNo },
            { label: "Date", value: grn.date },
            { label: "Supplier", value: grn.supplierName },
            { label: "Invoice No", value: grn.invoiceNo || "—" },
            { label: "Challan No", value: grn.challanNo || "—" },
            { label: "Recorded By", value: grn.createdBy },
          ].map(({ label, value }) => (
            <div key={label} className="bg-muted/30 rounded-sm p-2.5">
              <p className="text-[10px] text-muted-foreground mb-0.5">
                {label}
              </p>
              <p className="font-medium truncate">{value}</p>
            </div>
          ))}
        </div>

        {/* Line items */}
        <div>
          <p className="text-xs font-semibold text-foreground mb-2">
            Line Items ({grn.items.length})
          </p>
          <div className="rounded-sm border border-border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">
                    Item
                  </th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">
                    Qty
                  </th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">
                    Rate
                  </th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">
                    GST
                  </th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {grn.items.map((line, i) => (
                  <tr
                    key={`${line.itemId}-${i}`}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="py-2 px-3">
                      <p className="font-mono text-primary font-medium">
                        {line.itemCode}
                      </p>
                      <p className="text-muted-foreground text-[10px] truncate max-w-[160px]">
                        {line.itemName}
                      </p>
                    </td>
                    <td className="py-2 px-3 text-right font-mono">
                      {line.qty}
                    </td>
                    <td className="py-2 px-3 text-right font-mono">
                      ₹{line.rate.toFixed(2)}
                    </td>
                    <td className="py-2 px-3 text-right text-muted-foreground">
                      {line.gst}%
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-semibold">
                      {fmtCurrency(line.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted/20 border-t border-border">
                  <td className="py-2 px-3 font-semibold">Grand Total</td>
                  <td className="py-2 px-3 text-right font-mono text-muted-foreground">
                    {totalQty} units
                  </td>
                  <td colSpan={2} />
                  <td className="py-2 px-3 text-right font-mono font-bold text-foreground">
                    {fmtCurrency(grandTotal)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Approve confirmation */}
        {confirmApprove && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-sm p-3 text-xs">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-700 dark:text-green-400 mb-1">
                  Confirm QC Approval
                </p>
                <p className="text-muted-foreground">
                  Stock will increase by{" "}
                  <span className="font-mono font-semibold">
                    {totalQty} units
                  </span>{" "}
                  across{" "}
                  <span className="font-semibold">
                    {grn.items.length} item(s)
                  </span>
                  . This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                onClick={() => setConfirmApprove(false)}
                data-ocid="inward.detail.confirm_cancel_button"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  onApprove(grn.id);
                  setConfirmApprove(false);
                  onClose();
                }}
                disabled={isPending}
                data-ocid="inward.detail.confirm_button"
              >
                {isPending ? "Approving…" : "Confirm Approve"}
              </Button>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 flex-wrap">
          {grn.qcStatus === "pending" && !confirmApprove && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs border-destructive/50 text-destructive hover:bg-destructive/10"
                onClick={() => {
                  onReject(grn.id);
                  onClose();
                }}
                disabled={isPending}
                data-ocid="inward.detail.reject_button"
              >
                <XCircle className="w-3 h-3 mr-1.5" /> Reject
              </Button>
              <Button
                size="sm"
                className="h-8 text-xs bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setConfirmApprove(true)}
                data-ocid="inward.detail.approve_button"
              >
                <CheckCircle className="w-3 h-3 mr-1.5" /> Approve
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={onClose}
            data-ocid="inward.detail.close_button"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Add GRN Dialog ────────────────────────────────────────────────────────
function AddGRNDialog({
  open,
  onClose,
  onSubmit,
  isPending,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<GRNEntryPublic, "id" | "createdAt">) => void;
  isPending: boolean;
}) {
  const { data: items } = useItems();

  const autoGrnNo = `GRN-${new Date().getFullYear()}${String(
    Math.floor(Math.random() * 9000) + 1000,
  )}`;
  const [form, setForm] = useState({
    grnNo: autoGrnNo,
    supplierName: "",
    supplierId: "",
    invoiceNo: "",
    challanNo: "",
    date: new Date().toISOString().split("T")[0],
    qcStatus: "pending" as QCStatus,
  });
  const [lineItems, setLineItems] = useState<GRNItem[]>([{ ...BLANK_LINE }]);
  const [supplierQuery, setSupplierQuery] = useState("");

  const knownSuppliers = [
    "SKF Distributors",
    "Parker Hannifin India",
    "Gates Distributors",
    "L&T Electrical",
    "Siemens Authorised Dealer",
  ];
  const filteredSuppliers = knownSuppliers.filter((s) =>
    s.toLowerCase().includes(supplierQuery.toLowerCase()),
  );
  const showSupplierDropdown =
    supplierQuery.length > 0 &&
    filteredSuppliers.length > 0 &&
    !knownSuppliers.includes(form.supplierName);

  const updateLine = (
    idx: number,
    field: keyof GRNItem,
    val: string | number,
  ) => {
    setLineItems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: val };
      if (field === "qty" || field === "rate" || field === "gst") {
        next[idx].total = calcTotal(next[idx]);
      }
      if (field === "itemId") {
        const found = (items ?? []).find((i) => i.id === String(val));
        if (found) {
          next[idx].itemCode = found.code;
          next[idx].itemName = found.name;
          next[idx].rate = found.lastPurchaseRate;
          next[idx].gst = 18; // default
          next[idx].total = calcTotal({
            ...next[idx],
            rate: found.lastPurchaseRate,
          });
        }
      }
      return next;
    });
  };

  const addLine = () => setLineItems((l) => [...l, { ...BLANK_LINE }]);
  const removeLine = (idx: number) =>
    setLineItems((l) => l.filter((_, j) => j !== idx));

  const grandTotal = lineItems.reduce((s, l) => s + l.total, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.supplierName.trim()) {
      toast.error("Please enter a supplier name");
      return;
    }
    if (lineItems.some((l) => !l.itemId)) {
      toast.error("Please select an item for all line rows");
      return;
    }
    onSubmit({
      ...form,
      items: lineItems,
      createdBy: "store.user",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-3xl max-h-[92vh] overflow-y-auto"
        data-ocid="inward.add_dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">New GRN Entry</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-1">
          {/* Header fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">GRN No</Label>
              <Input
                value={form.grnNo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, grnNo: e.target.value }))
                }
                required
                className="font-mono"
                data-ocid="inward.form.grn_no.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                required
                data-ocid="inward.form.date.input"
              />
            </div>
            {/* Supplier with autocomplete */}
            <div className="col-span-2 space-y-1.5 relative">
              <Label className="text-xs">Supplier Name</Label>
              <Input
                value={supplierQuery || form.supplierName}
                onChange={(e) => {
                  setSupplierQuery(e.target.value);
                  setForm((f) => ({
                    ...f,
                    supplierName: e.target.value,
                    supplierId: "",
                  }));
                }}
                placeholder="Type to search or enter new supplier"
                required
                data-ocid="inward.form.supplier.input"
              />
              {showSupplierDropdown && (
                <div className="absolute top-full left-0 right-0 z-50 bg-popover border border-border rounded-sm shadow-lg mt-0.5 py-1">
                  {filteredSuppliers.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted/60 transition-colors"
                      onClick={() => {
                        setForm((f) => ({
                          ...f,
                          supplierName: s,
                          supplierId: s,
                        }));
                        setSupplierQuery("");
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Invoice No</Label>
              <Input
                value={form.invoiceNo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, invoiceNo: e.target.value }))
                }
                placeholder="Invoice number"
                data-ocid="inward.form.invoice.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Challan No</Label>
              <Input
                value={form.challanNo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, challanNo: e.target.value }))
                }
                placeholder="Delivery challan number"
                data-ocid="inward.form.challan.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">QC Status</Label>
              <Select
                value={form.qcStatus}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, qcStatus: v as QCStatus }))
                }
              >
                <SelectTrigger data-ocid="inward.form.qc_status.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">QC Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-semibold">
                Items — {lineItems.length} line(s)
              </Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-6 text-xs px-2 gap-1"
                onClick={addLine}
                data-ocid="inward.form.add_line_button"
              >
                <Plus className="w-3 h-3" /> Add Row
              </Button>
            </div>
            <div className="rounded-sm border border-border overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-muted-foreground w-[36%]">
                      Item
                    </th>
                    <th className="text-left py-2 px-2 font-medium text-muted-foreground w-[10%]">
                      Qty
                    </th>
                    <th className="text-left py-2 px-2 font-medium text-muted-foreground w-[18%]">
                      Rate (₹)
                    </th>
                    <th className="text-left py-2 px-2 font-medium text-muted-foreground w-[14%]">
                      GST %
                    </th>
                    <th className="text-right py-2 px-2 font-medium text-muted-foreground w-[16%]">
                      Total
                    </th>
                    <th className="w-8" />
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((line, idx) => (
                    <tr
                      key={`line-${idx}-${line.itemId}`}
                      className="border-b border-border/40 last:border-0 bg-background hover:bg-muted/20"
                    >
                      <td className="py-1.5 px-2">
                        <Select
                          value={line.itemId}
                          onValueChange={(v) => updateLine(idx, "itemId", v)}
                        >
                          <SelectTrigger
                            className="h-7 text-xs"
                            data-ocid={`inward.form.item.select.${idx + 1}`}
                          >
                            <SelectValue placeholder="Select item…" />
                          </SelectTrigger>
                          <SelectContent>
                            {(items ?? []).map((i) => (
                              <SelectItem key={i.id} value={i.id}>
                                {i.code} — {i.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {line.itemName && (
                          <p className="text-[10px] text-muted-foreground mt-0.5 px-0.5 truncate">
                            {line.itemName} · {line.itemCode}
                          </p>
                        )}
                      </td>
                      <td className="py-1.5 px-2">
                        <Input
                          type="number"
                          value={line.qty}
                          onChange={(e) =>
                            updateLine(idx, "qty", Number(e.target.value))
                          }
                          min={1}
                          className="h-7 text-xs w-16"
                          data-ocid={`inward.form.qty.input.${idx + 1}`}
                        />
                      </td>
                      <td className="py-1.5 px-2">
                        <Input
                          type="number"
                          value={line.rate}
                          onChange={(e) =>
                            updateLine(idx, "rate", Number(e.target.value))
                          }
                          className="h-7 text-xs w-24"
                          data-ocid={`inward.form.rate.input.${idx + 1}`}
                        />
                      </td>
                      <td className="py-1.5 px-2">
                        <Select
                          value={String(line.gst)}
                          onValueChange={(v) =>
                            updateLine(idx, "gst", Number(v))
                          }
                        >
                          <SelectTrigger className="h-7 text-xs w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 5, 12, 18, 28].map((g) => (
                              <SelectItem key={g} value={String(g)}>
                                {g}%
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono font-semibold">
                        {fmtCurrency(line.total)}
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        <button
                          type="button"
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          onClick={() => removeLine(idx)}
                          aria-label="Remove line"
                          data-ocid={`inward.form.remove_line.${idx + 1}`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/20 border-t border-border">
                    <td colSpan={4} className="py-2 px-3 text-xs font-semibold">
                      Grand Total
                    </td>
                    <td className="py-2 px-2 text-right font-mono font-bold text-foreground">
                      {fmtCurrency(grandTotal)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="inward.add_cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="inward.add_submit_button"
            >
              {isPending ? "Saving…" : "Save GRN"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function InwardPage() {
  const { data: grns, isLoading } = useGRNs();
  const addGRN = useAddGRN();
  const updateQC = useUpdateGRNQCStatus();

  const [addOpen, setAddOpen] = useState(false);
  const [detailGRN, setDetailGRN] = useState<GRNEntryPublic | null>(null);
  const [search, setSearch] = useState("");
  const [filterQC, setFilterQC] = useState<"all" | QCStatus>("all");
  const [filterSupplier, setFilterSupplier] = useState("all");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Unique suppliers list
  const suppliers = useMemo(() => {
    const names = [...new Set((grns ?? []).map((g) => g.supplierName))];
    return names;
  }, [grns]);

  // Filtered + sorted GRNs
  const filtered = useMemo(() => {
    return (grns ?? [])
      .filter((g) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          g.grnNo.toLowerCase().includes(q) ||
          g.supplierName.toLowerCase().includes(q) ||
          g.invoiceNo.toLowerCase().includes(q);
        const matchQC = filterQC === "all" || g.qcStatus === filterQC;
        const matchSupplier =
          filterSupplier === "all" || g.supplierName === filterSupplier;
        const matchFrom = !filterDateFrom || g.date >= filterDateFrom;
        const matchTo = !filterDateTo || g.date <= filterDateTo;
        return matchSearch && matchQC && matchSupplier && matchFrom && matchTo;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [grns, search, filterQC, filterSupplier, filterDateFrom, filterDateTo]);

  const handleQCUpdate = async (id: string, status: QCStatus) => {
    try {
      await updateQC.mutateAsync({ id, status });
      toast.success(
        status === "approved" ? "GRN approved — stock updated" : "GRN rejected",
      );
    } catch {
      toast.error("Failed to update QC status");
    }
  };

  const handleAddGRN = async (
    data: Omit<GRNEntryPublic, "id" | "createdAt">,
  ) => {
    try {
      await addGRN.mutateAsync(data);
      toast.success("GRN created successfully");
      setAddOpen(false);
    } catch {
      toast.error("Failed to create GRN");
    }
  };

  // Summary stats
  const pendingCount = (grns ?? []).filter(
    (g) => g.qcStatus === "pending",
  ).length;
  const approvedCount = (grns ?? []).filter(
    (g) => g.qcStatus === "approved",
  ).length;
  const totalValue = (grns ?? []).reduce(
    (s, g) => s + g.items.reduce((x, l) => x + l.total, 0),
    0,
  );

  return (
    <div className="space-y-4" data-ocid="inward.page">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Material Inward
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Goods Receipt Notes (GRN) and QC management
          </p>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
          className="gap-2 shrink-0"
          data-ocid="inward.add_button"
        >
          <Plus className="w-4 h-4" /> New GRN
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total GRNs",
            value: String(grns?.length ?? 0),
            icon: ArrowDownToLine,
            color: "text-primary",
          },
          {
            label: "QC Pending",
            value: String(pendingCount),
            icon: Clock,
            color: "text-accent",
          },
          {
            label: "QC Approved",
            value: String(approvedCount),
            icon: CheckCircle,
            color: "text-green-600 dark:text-green-400",
          },
          {
            label: "Total Value",
            value: fmtCurrency(totalValue),
            icon: Package,
            color: "text-primary",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="data-card flex items-center gap-3">
            <Icon className={cn("w-5 h-5 shrink-0", color)} />
            <div className="min-w-0">
              <p className="text-base font-display font-bold text-foreground truncate">
                {value}
              </p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="space-y-2" data-ocid="inward.filters">
        <div className="flex gap-2 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search GRN No, supplier, invoice…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm"
              data-ocid="inward.search.input"
            />
          </div>
          <Select
            value={filterQC}
            onValueChange={(v) => setFilterQC(v as typeof filterQC)}
          >
            <SelectTrigger
              className="h-8 w-36 text-sm"
              data-ocid="inward.qc_filter.select"
            >
              <SelectValue placeholder="QC Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">QC Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-8 gap-1.5 text-sm", showFilters && "bg-muted")}
            onClick={() => setShowFilters((v) => !v)}
            data-ocid="inward.filter_toggle.button"
          >
            <Filter className="w-3.5 h-3.5" /> More Filters
          </Button>
        </div>

        {showFilters && (
          <div className="flex gap-2 flex-wrap bg-muted/30 rounded-sm p-2.5 border border-border/50">
            <div className="flex items-center gap-2">
              <Label className="text-xs text-muted-foreground whitespace-nowrap">
                Supplier
              </Label>
              <Select value={filterSupplier} onValueChange={setFilterSupplier}>
                <SelectTrigger
                  className="h-7 w-44 text-xs"
                  data-ocid="inward.supplier_filter.select"
                >
                  <SelectValue placeholder="All Suppliers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  {suppliers.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <Input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="h-7 text-xs w-36"
                data-ocid="inward.date_from.input"
              />
              <span className="text-xs text-muted-foreground">to</span>
              <Input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="h-7 text-xs w-36"
                data-ocid="inward.date_to.input"
              />
            </div>
            {(filterSupplier !== "all" || filterDateFrom || filterDateTo) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-muted-foreground"
                onClick={() => {
                  setFilterSupplier("all");
                  setFilterDateFrom("");
                  setFilterDateTo("");
                }}
                data-ocid="inward.clear_filters.button"
              >
                Clear
              </Button>
            )}
          </div>
        )}
      </div>

      {/* GRN Table */}
      <div
        className="data-card p-0 overflow-hidden"
        data-ocid="inward.grn_table"
      >
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton cols={7} rows={5} />
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3"
            data-ocid="inward.empty_state"
          >
            <ArrowDownToLine className="w-10 h-10 text-muted-foreground/30" />
            <p className="text-sm font-medium text-foreground">
              No GRN entries yet
            </p>
            <p className="text-xs text-muted-foreground">
              {search || filterQC !== "all"
                ? "No results match your search or filter"
                : "Record your first material inward to get started"}
            </p>
            {!search && filterQC === "all" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAddOpen(true)}
                data-ocid="inward.empty_add_button"
              >
                Create first GRN
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30 sticky top-0">
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                    GRN No
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                    Supplier
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium hidden md:table-cell">
                    Invoice No
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium">
                    Date
                  </th>
                  <th className="text-right py-2.5 px-3 text-muted-foreground font-medium hidden sm:table-cell">
                    Items
                  </th>
                  <th className="text-right py-2.5 px-3 text-muted-foreground font-medium hidden lg:table-cell">
                    Total Value
                  </th>
                  <th className="py-2.5 px-3 text-muted-foreground font-medium text-center">
                    QC Status
                  </th>
                  <th className="py-2.5 px-3 text-muted-foreground font-medium text-right w-24 hidden lg:table-cell">
                    Actions
                  </th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((grn, i) => {
                  const rowTotal = grn.items.reduce((s, l) => s + l.total, 0);
                  return (
                    <tr
                      key={grn.id}
                      className="border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors"
                      onClick={() => setDetailGRN(grn)}
                      onKeyDown={(e) => e.key === "Enter" && setDetailGRN(grn)}
                      tabIndex={0}
                      data-ocid={`inward.grn.item.${i + 1}`}
                    >
                      <td className="py-2.5 px-3 font-mono text-primary font-medium">
                        {grn.grnNo}
                      </td>
                      <td className="py-2.5 px-3 text-foreground font-medium truncate max-w-[140px]">
                        {grn.supplierName}
                      </td>
                      <td className="py-2.5 px-3 hidden md:table-cell text-muted-foreground font-mono">
                        {grn.invoiceNo || "—"}
                      </td>
                      <td className="py-2.5 px-3 text-muted-foreground">
                        {grn.date}
                      </td>
                      <td className="py-2.5 px-3 text-right hidden sm:table-cell font-mono">
                        {grn.items.length}
                      </td>
                      <td className="py-2.5 px-3 text-right hidden lg:table-cell font-mono font-semibold">
                        {fmtCurrency(rowTotal)}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <QCBadge status={grn.qcStatus} />
                      </td>
                      <td className="py-2.5 px-3 text-right hidden lg:table-cell">
                        {grn.qcStatus === "pending" && (
                          <div
                            className="flex justify-end gap-1"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-green-600 hover:text-green-700 hover:bg-green-500/10 text-[10px]"
                              onClick={() => handleQCUpdate(grn.id, "approved")}
                              data-ocid={`inward.approve_button.${i + 1}`}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-destructive hover:text-destructive hover:bg-destructive/10 text-[10px]"
                              onClick={() => handleQCUpdate(grn.id, "rejected")}
                              data-ocid={`inward.reject_button.${i + 1}`}
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 px-3">
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="px-3 py-2 border-t border-border/50 bg-muted/10 flex justify-between text-[10px] text-muted-foreground">
              <span>
                Showing {filtered.length} of {grns?.length ?? 0} GRNs
              </span>
              <span className="font-mono font-medium">
                Filtered Total:{" "}
                {fmtCurrency(
                  filtered.reduce(
                    (s, g) => s + g.items.reduce((x, l) => x + l.total, 0),
                    0,
                  ),
                )}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Add GRN Dialog */}
      {addOpen && (
        <AddGRNDialog
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onSubmit={handleAddGRN}
          isPending={addGRN.isPending}
        />
      )}

      {/* GRN Detail Dialog */}
      {detailGRN && (
        <GRNDetailDialog
          grn={detailGRN}
          onClose={() => setDetailGRN(null)}
          onApprove={(id) => handleQCUpdate(id, "approved")}
          onReject={(id) => handleQCUpdate(id, "rejected")}
          isPending={updateQC.isPending}
        />
      )}
    </div>
  );
}
