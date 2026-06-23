import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BudgetsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-4 w-40 bg-slate-700" />
          <Skeleton className="mt-3 h-10 w-40 bg-slate-700" />
        </div>

        <Skeleton className="h-10 w-40 bg-slate-700" />
      </div>

      {/* Budget Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            className="border-slate-800 bg-[#111C3D]"
          >
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <Skeleton className="h-12 w-12 rounded-xl bg-slate-700" />

                <Skeleton className="h-8 w-8 rounded bg-slate-700" />
              </div>

              <Skeleton className="h-7 w-32 bg-slate-700" />

              <Skeleton className="mt-4 h-10 w-36 bg-slate-700" />

              <div className="mt-5 flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full bg-slate-700" />

                <Skeleton className="h-4 w-24 bg-slate-700" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}