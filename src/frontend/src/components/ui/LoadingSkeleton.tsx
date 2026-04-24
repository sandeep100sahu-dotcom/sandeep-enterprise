import { cn } from "@/lib/utils";

export function TableSkeleton({
  cols = 5,
  rows = 6,
}: { cols?: number; rows?: number }) {
  const rowKeys = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"].slice(
    0,
    rows,
  );
  const colKeys = ["c1", "c2", "c3", "c4", "c5", "c6"].slice(0, cols);
  return (
    <div className="animate-pulse" data-ocid="loading_state">
      <div className="h-10 bg-muted rounded mb-1 w-full" />
      {rowKeys.map((rk, ri) => (
        <div key={rk} className="flex gap-2 py-2 border-b border-border/50">
          {colKeys.map((ck, ci) => (
            <div
              key={ck}
              className={cn(
                "h-5 bg-muted rounded",
                ri === 0 && ci === 0 ? "w-1/3" : ci === 0 ? "w-1/3" : "flex-1",
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 4 }: { count?: number }) {
  const keys = ["k1", "k2", "k3", "k4"].slice(0, count);
  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse"
      data-ocid="loading_state"
    >
      {keys.map((k) => (
        <div key={k} className="data-card flex flex-col gap-3 h-28">
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}

export function FormSkeleton({ fields = 6 }: { fields?: number }) {
  const keys = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"].slice(
    0,
    fields,
  );
  return (
    <div
      className="flex flex-col gap-4 animate-pulse"
      data-ocid="loading_state"
    >
      {keys.map((k) => (
        <div key={k} className="flex flex-col gap-1.5">
          <div className="h-4 bg-muted rounded w-1/4" />
          <div className="h-9 bg-muted rounded w-full" />
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div
      className="flex flex-col gap-6 animate-pulse"
      data-ocid="loading_state"
    >
      <div className="h-8 bg-muted rounded w-1/3" />
      <CardSkeleton count={4} />
      <div className="h-64 bg-muted rounded" />
      <TableSkeleton />
    </div>
  );
}
