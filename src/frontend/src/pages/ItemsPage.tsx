import { ErrorState } from "@/components/ui/ErrorBoundary";
import { TableSkeleton } from "@/components/ui/LoadingSkeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { useItemLedger } from "@/hooks/use-inventory";
import {
  useAddItem,
  useCategories,
  useDeactivateItem,
  useItems,
  useLowStockItems,
  useUpdateItem,
} from "@/hooks/use-items";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import type { CategoryPublic, ItemPublic } from "@/types/erp";
import {
  AlertTriangle,
  ArrowDownUp,
  ArrowUpDown,
  Box,
  Camera,
  ChevronRight,
  Edit2,
  Filter,
  Package,
  Plus,
  Search,
  Tag,
  TrendingDown,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── Types ─────────────────────────────────────────────────────────────────────
type SortField = "code" | "name" | "currentStock" | "lastPurchaseRate";
type SortDir = "asc" | "desc";
type StatusFilter = "all" | "active" | "inactive" | "low";

type FormData = Omit<ItemPublic, "id" | "currentStock" | "lastPurchaseRate">;

const EMPTY_FORM: FormData = {
  code: "",
  name: "",
  category: "",
  subcategory: "",
  description: "",
  unit: "PCS",
  brand: "",
  size: "",
  rackLocation: "",
  minimumStock: 10,
  preferredSupplier: "",
  gstHsn: "",
  photo: "",
  isActive: true,
};

const UNITS = [
  "PCS",
  "SET",
  "KG",
  "MTR",
  "LTR",
  "CAN",
  "BOX",
  "PKT",
  "NOS",
  "PAIR",
];

// ── Stock Badge ────────────────────────────────────────────────────────────────
function StockBadge({ stock, min }: { stock: number; min: number }) {
  if (stock === 0)
    return (
      <Badge variant="destructive" className="text-[10px] h-5 px-1.5">
        OUT
      </Badge>
    );
  if (stock < min)
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded alert-red">
        <TrendingDown className="w-3 h-3" />
        LOW
      </span>
    );
  return (
    <span className="inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded alert-green">
      OK
    </span>
  );
}

// ── Form Validation ────────────────────────────────────────────────────────────
interface FormErrors {
  code?: string;
  name?: string;
  minimumStock?: string;
}

function validateForm(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.code.trim()) errors.code = "Item Code is required";
  if (!form.name.trim()) errors.name = "Item Name is required";
  if (Number.isNaN(Number(form.minimumStock)) || Number(form.minimumStock) < 0)
    errors.minimumStock = "Must be a valid number";
  return errors;
}

// ── Auto Code Generator ────────────────────────────────────────────────────────
function generateCode(category: string, index: number): string {
  const prefix = category ? category.slice(0, 3).toUpperCase() : "ITM";
  return `${prefix}-${String(index).padStart(4, "0")}`;
}

// ── Item Form Modal ────────────────────────────────────────────────────────────
interface ItemFormModalProps {
  open: boolean;
  onClose: () => void;
  editItem?: ItemPublic | null;
  categories: CategoryPublic[];
  itemCount: number;
}

function ItemFormModal({
  open,
  onClose,
  editItem,
  categories,
  itemCount,
}: ItemFormModalProps) {
  const addItem = useAddItem();
  const updateItem = useUpdateItem();
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [autoCode, setAutoCode] = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const subcategories =
    categories.find((c) => c.name === form.category)?.subcategories ?? [];

  useEffect(() => {
    if (editItem) {
      const {
        id: _id,
        currentStock: _cs,
        lastPurchaseRate: _lpr,
        ...rest
      } = editItem;
      setForm(rest);
      setPhotoPreview(editItem.photo || "");
      setAutoCode(false);
    } else {
      setForm(EMPTY_FORM);
      setPhotoPreview("");
      setAutoCode(true);
    }
    setErrors({});
  }, [editItem]);

  useEffect(() => {
    if (autoCode && !editItem) {
      setForm((f) => ({
        ...f,
        code: generateCode(f.category, itemCount + 1),
      }));
    }
  }, [autoCode, itemCount, editItem]);

  const setField = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k as keyof FormErrors]) {
      setErrors((e) => ({ ...e, [k]: undefined }));
    }
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPhotoPreview(result);
      setField("photo", result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (editItem) {
      await updateItem.mutateAsync({ ...editItem, ...form });
      toast.success("Item updated successfully");
    } else {
      await addItem.mutateAsync(form);
      toast.success(`Item "${form.name}" added successfully`);
    }
    onClose();
  };

  const isPending = addItem.isPending || updateItem.isPending;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[92vh] overflow-y-auto"
        data-ocid="items.form.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            {editItem ? "Edit Item" : "Add New Item"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-1">
          {/* Code + Auto Toggle */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Item Code *</Label>
                {!editItem && (
                  <button
                    type="button"
                    onClick={() => setAutoCode((v) => !v)}
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full border transition-colors",
                      autoCode
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "border-border text-muted-foreground",
                    )}
                    data-ocid="items.form.auto_code.toggle"
                  >
                    {autoCode ? "Auto" : "Manual"}
                  </button>
                )}
              </div>
              <Input
                value={form.code}
                onChange={(e) => !autoCode && setField("code", e.target.value)}
                placeholder="e.g. BRG-0148"
                readOnly={autoCode && !editItem}
                className={cn(
                  "font-mono text-sm",
                  autoCode && !editItem && "bg-muted/40 text-muted-foreground",
                  errors.code && "border-destructive",
                )}
                data-ocid="items.form.code.input"
              />
              {errors.code && (
                <p
                  className="text-[10px] text-destructive"
                  data-ocid="items.form.code.field_error"
                >
                  {errors.code}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Item Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Full item name"
                className={cn(errors.name && "border-destructive")}
                data-ocid="items.form.name.input"
              />
              {errors.name && (
                <p
                  className="text-[10px] text-destructive"
                  data-ocid="items.form.name.field_error"
                >
                  {errors.name}
                </p>
              )}
            </div>
          </div>

          {/* Category + Subcategory */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => {
                  setField("category", v);
                  setField("subcategory", "");
                }}
              >
                <SelectTrigger data-ocid="items.form.category.select">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Subcategory</Label>
              <Select
                value={form.subcategory}
                onValueChange={(v) => setField("subcategory", v)}
                disabled={subcategories.length === 0}
              >
                <SelectTrigger data-ocid="items.form.subcategory.select">
                  <SelectValue
                    placeholder={
                      subcategories.length === 0
                        ? "Select category first"
                        : "Select subcategory"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {subcategories.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Brand + Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Brand</Label>
              <Input
                value={form.brand}
                onChange={(e) => setField("brand", e.target.value)}
                placeholder="Brand name"
                data-ocid="items.form.brand.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Unit</Label>
              <Select
                value={form.unit}
                onValueChange={(v) => setField("unit", v)}
              >
                <SelectTrigger data-ocid="items.form.unit.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Size + Rack Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Size / Specification</Label>
              <Input
                value={form.size}
                onChange={(e) => setField("size", e.target.value)}
                placeholder="e.g. 25x52x15mm"
                data-ocid="items.form.size.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Rack Location</Label>
              <Input
                value={form.rackLocation}
                onChange={(e) => setField("rackLocation", e.target.value)}
                placeholder="e.g. A-01-03"
                data-ocid="items.form.rack.input"
              />
            </div>
          </div>

          {/* Min Stock + GST/HSN */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Minimum Stock *</Label>
              <Input
                type="number"
                min={0}
                value={form.minimumStock}
                onChange={(e) =>
                  setField("minimumStock", Number(e.target.value))
                }
                className={cn(errors.minimumStock && "border-destructive")}
                data-ocid="items.form.minstock.input"
              />
              {errors.minimumStock && (
                <p
                  className="text-[10px] text-destructive"
                  data-ocid="items.form.minstock.field_error"
                >
                  {errors.minimumStock}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">GST / HSN Code</Label>
              <Input
                value={form.gstHsn}
                onChange={(e) => setField("gstHsn", e.target.value)}
                placeholder="e.g. 84821011"
                data-ocid="items.form.hsn.input"
              />
            </div>
          </div>

          {/* Preferred Supplier */}
          <div className="space-y-1.5">
            <Label className="text-xs">Preferred Supplier</Label>
            <Input
              value={form.preferredSupplier}
              onChange={(e) => setField("preferredSupplier", e.target.value)}
              placeholder="Supplier name"
              data-ocid="items.form.supplier.input"
            />
          </div>

          {/* Technical Description */}
          <div className="space-y-1.5">
            <Label className="text-xs">Full Technical Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Detailed specifications, part numbers, compatibility notes…"
              rows={3}
              className="text-sm resize-none"
              data-ocid="items.form.description.textarea"
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-1.5">
            <Label className="text-xs">Item Photo</Label>
            <div className="flex gap-3 items-start">
              <div
                className={cn(
                  "w-20 h-20 rounded-md border-2 border-dashed border-border flex items-center justify-center bg-muted/30 shrink-0 overflow-hidden",
                  photoPreview && "border-primary/40",
                )}
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-6 h-6 text-muted-foreground/40" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  data-ocid="items.form.photo.upload_button"
                >
                  {photoPreview ? "Change Photo" : "Upload Photo"}
                </Button>
                {photoPreview && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive h-7"
                    onClick={() => {
                      setPhotoPreview("");
                      setField("photo", "");
                    }}
                    data-ocid="items.form.photo.remove_button"
                  >
                    Remove
                  </Button>
                )}
                <p className="text-[10px] text-muted-foreground">
                  JPG, PNG up to 2MB
                </p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhoto}
            />
          </div>

          <Separator />

          <DialogFooter className="gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="items.form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="items.form.submit_button"
            >
              {isPending
                ? editItem
                  ? "Saving…"
                  : "Adding…"
                : editItem
                  ? "Save Changes"
                  : "Add Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Item Detail Panel ─────────────────────────────────────────────────────────
interface ItemDetailPanelProps {
  item: ItemPublic;
  onClose: () => void;
  onEdit: (item: ItemPublic) => void;
  onDeactivate: (item: ItemPublic) => void;
}

function ItemDetailPanel({
  item,
  onClose,
  onEdit,
  onDeactivate,
}: ItemDetailPanelProps) {
  const { data: ledger } = useItemLedger(item.id);

  const stockStatus =
    item.currentStock === 0
      ? "critical"
      : item.currentStock < item.minimumStock
        ? "low"
        : "ok";

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="items.detail.dialog"
      >
        <DialogHeader>
          <div className="flex items-start gap-3 pr-6">
            {item.photo ? (
              <img
                src={item.photo}
                alt={item.name}
                className="w-14 h-14 rounded-md object-cover border border-border shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-md bg-muted/40 border border-border flex items-center justify-center shrink-0">
                <Box className="w-6 h-6 text-muted-foreground/40" />
              </div>
            )}
            <div className="min-w-0">
              <DialogTitle className="font-display text-base leading-snug">
                {item.name}
              </DialogTitle>
              <p className="font-mono text-xs text-primary mt-0.5">
                {item.code}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={item.isActive ? "secondary" : "outline"}
                  className="text-[10px] h-4"
                >
                  {item.isActive ? "Active" : "Inactive"}
                </Badge>
                <StockBadge stock={item.currentStock} min={item.minimumStock} />
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Stock Alert */}
        {stockStatus !== "ok" && (
          <div
            className={cn(
              "rounded-md px-3 py-2 flex items-center gap-2",
              stockStatus === "critical" ? "alert-red" : "alert-amber",
            )}
            data-ocid="items.detail.stock_alert"
          >
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span className="text-xs">
              {stockStatus === "critical"
                ? "Stock is ZERO — immediate reorder required."
                : "Stock below minimum level — reorder recommended."}
            </span>
          </div>
        )}

        {/* Stock Summary */}
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              label: "Current Stock",
              value: String(item.currentStock),
              unit: item.unit,
              highlight: stockStatus !== "ok",
            },
            {
              label: "Min Stock",
              value: String(item.minimumStock),
              unit: item.unit,
            },
            {
              label: "Last Rate",
              value: `₹${item.lastPurchaseRate.toLocaleString()}`,
              unit: `/${item.unit}`,
            },
          ].map(({ label, value, unit, highlight }) => (
            <div
              key={label}
              className={cn(
                "rounded-md p-2.5 text-center",
                highlight
                  ? "bg-destructive/10 border border-destructive/20"
                  : "bg-muted/30",
              )}
            >
              <p className="text-[10px] text-muted-foreground mb-0.5">
                {label}
              </p>
              <p
                className={cn(
                  "font-bold text-sm font-mono",
                  highlight && "text-destructive",
                )}
              >
                {value}
              </p>
              <p className="text-[10px] text-muted-foreground">{unit}</p>
            </div>
          ))}
        </div>

        {/* Details Grid */}
        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
            Specifications
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Category", value: item.category },
              { label: "Subcategory", value: item.subcategory },
              { label: "Brand", value: item.brand },
              { label: "Size", value: item.size },
              { label: "Rack Location", value: item.rackLocation },
              { label: "GST / HSN", value: item.gstHsn },
            ].map(({ label, value }) => (
              <div key={label} className="bg-muted/20 rounded-sm px-2.5 py-2">
                <p className="text-[10px] text-muted-foreground">{label}</p>
                <p className="text-xs font-medium mt-0.5 truncate">
                  {value || "—"}
                </p>
              </div>
            ))}
          </div>

          {item.preferredSupplier && (
            <div className="bg-muted/20 rounded-sm px-2.5 py-2">
              <p className="text-[10px] text-muted-foreground">
                Preferred Supplier
              </p>
              <p className="text-xs font-medium mt-0.5">
                {item.preferredSupplier}
              </p>
            </div>
          )}

          {item.description && (
            <div className="bg-muted/20 rounded-sm px-2.5 py-2">
              <p className="text-[10px] text-muted-foreground mb-1">
                Technical Description
              </p>
              <p className="text-xs text-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        {ledger && ledger.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Recent Transactions
            </p>
            <div className="border border-border rounded-md overflow-hidden">
              {ledger.slice(0, 4).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between px-3 py-2 text-xs border-b border-border/50 last:border-0"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={cn(
                        "inline-block w-1.5 h-1.5 rounded-full shrink-0",
                        tx.transactionType === "inward"
                          ? "bg-green-500"
                          : "bg-destructive",
                      )}
                    />
                    <span className="font-mono text-muted-foreground truncate">
                      {tx.refId}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={cn(
                        "font-mono font-semibold",
                        tx.qty > 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-destructive",
                      )}
                    >
                      {tx.qty > 0 ? "+" : ""}
                      {tx.qty}
                    </span>
                    <span className="text-muted-foreground font-mono">
                      = {tx.balanceAfter}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          {item.isActive && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDeactivate(item)}
              data-ocid="items.detail.deactivate_button"
            >
              Deactivate
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(item)}
            data-ocid="items.detail.edit_button"
          >
            <Edit2 className="w-3.5 h-3.5 mr-1.5" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            data-ocid="items.detail.close_button"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function ItemsPage() {
  const { globalSearchQuery } = useAppStore();
  const [localSearch, setLocalSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortField, setSortField] = useState<SortField>("code");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<ItemPublic | null>(null);
  const [detailItem, setDetailItem] = useState<ItemPublic | null>(null);
  const [confirmDeactivate, setConfirmDeactivate] = useState<ItemPublic | null>(
    null,
  );

  const search = localSearch || globalSearchQuery;
  const { data: items, isLoading, error } = useItems(search);
  const { data: categories } = useCategories();
  const { data: lowStockItems } = useLowStockItems();
  const deactivateItem = useDeactivateItem();

  // Close detail when edit opens
  const handleEditFromDetail = (item: ItemPublic) => {
    setDetailItem(null);
    setEditItem(item);
    setFormOpen(true);
  };

  const handleDeactivateConfirm = async () => {
    if (!confirmDeactivate) return;
    await deactivateItem.mutateAsync(confirmDeactivate.id);
    toast.success(`"${confirmDeactivate.name}" deactivated`);
    setConfirmDeactivate(null);
    setDetailItem(null);
  };

  // Filter + Sort
  const filtered = (items ?? [])
    .filter((item) => {
      if (categoryFilter !== "all" && item.category !== categoryFilter)
        return false;
      if (statusFilter === "active" && !item.isActive) return false;
      if (statusFilter === "inactive" && item.isActive) return false;
      if (statusFilter === "low" && item.currentStock >= item.minimumStock)
        return false;
      return true;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === "code") cmp = a.code.localeCompare(b.code);
      else if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else if (sortField === "currentStock")
        cmp = a.currentStock - b.currentStock;
      else if (sortField === "lastPurchaseRate")
        cmp = a.lastPurchaseRate - b.lastPurchaseRate;
      return sortDir === "asc" ? cmp : -cmp;
    });

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return (
        <ArrowUpDown className="w-3 h-3 text-muted-foreground/50 inline ml-1" />
      );
    return sortDir === "asc" ? (
      <ArrowUpDown className="w-3 h-3 text-primary inline ml-1" />
    ) : (
      <ArrowDownUp className="w-3 h-3 text-primary inline ml-1" />
    );
  };

  if (error)
    return <ErrorState message="Failed to load items. Please try again." />;

  const lowStockCount = (lowStockItems ?? []).length;

  return (
    <div className="space-y-5" data-ocid="items.page">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Item Master
            </h1>
            {lowStockCount > 0 && (
              <button
                type="button"
                onClick={() => setStatusFilter("low")}
                className="flex items-center gap-1.5 alert-amber rounded-full px-2.5 py-1 text-xs font-semibold hover:opacity-80 transition-opacity"
                data-ocid="items.low_stock.badge"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                {lowStockCount} Low Stock
              </button>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filtered.length} of {(items ?? []).length} items
          </p>
        </div>
        <Button
          onClick={() => {
            setEditItem(null);
            setFormOpen(true);
          }}
          className="gap-2 shrink-0"
          data-ocid="items.add_button"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      </div>

      {/* Filters Row */}
      <div
        className="flex gap-3 flex-wrap items-center"
        data-ocid="items.filters.section"
      >
        {/* Search */}
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by code, name, brand…"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-8 h-8 text-sm"
            data-ocid="items.search.input"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => setLocalSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category filter */}
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger
            className="w-44 h-8 text-sm"
            data-ocid="items.category.select"
          >
            <Filter className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {(categories ?? []).map((c) => (
              <SelectItem key={c.id} value={c.name}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status filter tabs */}
        <Tabs
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as StatusFilter)}
        >
          <TabsList className="h-8">
            <TabsTrigger
              value="all"
              className="text-xs px-3 h-6"
              data-ocid="items.filter.all.tab"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="text-xs px-3 h-6"
              data-ocid="items.filter.active.tab"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="inactive"
              className="text-xs px-3 h-6"
              data-ocid="items.filter.inactive.tab"
            >
              Inactive
            </TabsTrigger>
            <TabsTrigger
              value="low"
              className="text-xs px-3 h-6"
              data-ocid="items.filter.low.tab"
            >
              <TrendingDown className="w-3 h-3 mr-1" />
              Low Stock
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Table */}
      <div className="data-card p-0 overflow-hidden" data-ocid="items.table">
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton cols={8} rows={8} />
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 gap-4"
            data-ocid="items.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-muted/40 flex items-center justify-center">
              <Package className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">
                {search || categoryFilter !== "all" || statusFilter !== "all"
                  ? "No items match your filters"
                  : "No items yet"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {search || categoryFilter !== "all" || statusFilter !== "all"
                  ? "Try clearing your filters to see all items"
                  : "Add your first item to get started"}
              </p>
            </div>
            {!search && categoryFilter === "all" && statusFilter === "all" && (
              <Button
                size="sm"
                onClick={() => setFormOpen(true)}
                data-ocid="items.empty_state.add_button"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add First Item
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30 sticky top-0">
                  <th
                    className="text-left py-2.5 px-3 text-muted-foreground font-medium cursor-pointer select-none whitespace-nowrap hover:text-foreground"
                    onClick={() => toggleSort("code")}
                    onKeyDown={(e) => e.key === "Enter" && toggleSort("code")}
                  >
                    Code <SortIcon field="code" />
                  </th>
                  <th
                    className="text-left py-2.5 px-3 text-muted-foreground font-medium cursor-pointer select-none whitespace-nowrap hover:text-foreground"
                    onClick={() => toggleSort("name")}
                    onKeyDown={(e) => e.key === "Enter" && toggleSort("name")}
                  >
                    Item Name <SortIcon field="name" />
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium hidden md:table-cell whitespace-nowrap">
                    Category
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium hidden lg:table-cell whitespace-nowrap">
                    Unit
                  </th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium hidden xl:table-cell whitespace-nowrap">
                    Brand
                  </th>
                  <th
                    className="text-right py-2.5 px-3 text-muted-foreground font-medium cursor-pointer select-none whitespace-nowrap hover:text-foreground"
                    onClick={() => toggleSort("currentStock")}
                    onKeyDown={(e) =>
                      e.key === "Enter" && toggleSort("currentStock")
                    }
                  >
                    Stock <SortIcon field="currentStock" />
                  </th>
                  <th className="text-right py-2.5 px-3 text-muted-foreground font-medium hidden sm:table-cell whitespace-nowrap">
                    Min
                  </th>
                  <th
                    className="text-right py-2.5 px-3 text-muted-foreground font-medium cursor-pointer select-none hidden lg:table-cell whitespace-nowrap hover:text-foreground"
                    onClick={() => toggleSort("lastPurchaseRate")}
                    onKeyDown={(e) =>
                      e.key === "Enter" && toggleSort("lastPurchaseRate")
                    }
                  >
                    Last Rate <SortIcon field="lastPurchaseRate" />
                  </th>
                  <th className="py-2.5 px-3 text-muted-foreground font-medium text-center whitespace-nowrap">
                    Status
                  </th>
                  <th className="py-2.5 px-3 w-7" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => {
                  const isLow = item.currentStock < item.minimumStock;
                  const isOut = item.currentStock === 0;
                  return (
                    <tr
                      key={item.id}
                      tabIndex={0}
                      className={cn(
                        "border-b border-border/40 hover:bg-muted/30 cursor-pointer transition-colors",
                        isOut && "bg-destructive/5",
                        isLow && !isOut && "bg-accent/5",
                        !item.isActive && "opacity-60",
                      )}
                      onClick={() => setDetailItem(item)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setDetailItem(item)
                      }
                      data-ocid={`items.item.${i + 1}`}
                    >
                      <td className="py-2.5 px-3 font-mono text-primary font-semibold whitespace-nowrap">
                        {item.code}
                      </td>
                      <td className="py-2.5 px-3 max-w-[200px]">
                        <div className="font-medium text-foreground truncate">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate">
                          {item.size && `${item.size} · `}
                          {item.rackLocation}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 hidden md:table-cell text-muted-foreground">
                        <div>{item.category}</div>
                        {item.subcategory && (
                          <div className="text-[10px] text-muted-foreground/70">
                            {item.subcategory}
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 px-3 hidden lg:table-cell text-muted-foreground">
                        {item.unit}
                      </td>
                      <td className="py-2.5 px-3 hidden xl:table-cell text-muted-foreground">
                        {item.brand || "—"}
                      </td>
                      <td
                        className={cn(
                          "py-2.5 px-3 text-right font-mono font-bold",
                          isOut
                            ? "text-destructive"
                            : isLow
                              ? "text-accent"
                              : "text-foreground",
                        )}
                      >
                        {item.currentStock}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-muted-foreground hidden sm:table-cell">
                        {item.minimumStock}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-muted-foreground hidden lg:table-cell">
                        {item.lastPurchaseRate > 0
                          ? `₹${item.lastPurchaseRate.toLocaleString()}`
                          : "—"}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <StockBadge
                          stock={item.currentStock}
                          min={item.minimumStock}
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Table Footer */}
            <div className="border-t border-border/50 px-3 py-2 flex items-center justify-between bg-muted/10">
              <span className="text-[10px] text-muted-foreground">
                Showing {filtered.length} items
                {filtered.length !== (items ?? []).length &&
                  ` (filtered from ${(items ?? []).length})`}
              </span>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-destructive inline-block" />
                  Out of Stock
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                  Below Minimum
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Click row to view details
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Form Modal */}
      <ItemFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditItem(null);
        }}
        editItem={editItem}
        categories={categories ?? []}
        itemCount={(items ?? []).length}
      />

      {/* Item Detail Dialog */}
      {detailItem && (
        <ItemDetailPanel
          item={detailItem}
          onClose={() => setDetailItem(null)}
          onEdit={handleEditFromDetail}
          onDeactivate={(item) => setConfirmDeactivate(item)}
        />
      )}

      {/* Deactivate Confirmation */}
      <AlertDialog
        open={!!confirmDeactivate}
        onOpenChange={(o) => !o && setConfirmDeactivate(null)}
      >
        <AlertDialogContent data-ocid="items.deactivate.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Item?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to deactivate{" "}
              <strong className="text-foreground">
                {confirmDeactivate?.name}
              </strong>{" "}
              ({confirmDeactivate?.code})? The item will no longer appear in
              active inventory but its history will be preserved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="items.deactivate.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeactivateConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="items.deactivate.confirm_button"
            >
              Deactivate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
