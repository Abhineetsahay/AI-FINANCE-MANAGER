import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExpensesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <Skeleton className="h-4 w-36 bg-slate-700" />
        <Skeleton className="mt-3 h-10 w-40 bg-slate-700" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-slate-800 bg-[#111C3D]">
            <CardContent className="p-6">
              <div className="mb-4 flex justify-between">
                <Skeleton className="h-8 w-8 rounded-full bg-slate-700" />
                <Skeleton className="h-4 w-16 bg-slate-700" />
              </div>

              <Skeleton className="h-4 w-28 bg-slate-700" />
              <Skeleton className="mt-3 h-8 w-32 bg-slate-700" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-800 bg-[#111C3D]">
        <CardContent className="flex gap-4 p-6">
          <Skeleton className="h-10 w-64 bg-slate-700" />
          <Skeleton className="h-10 w-40 bg-slate-700" />
          <div className="ml-auto">
            <Skeleton className="h-10 w-36 bg-slate-700" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-800 bg-[#111C3D]">
        <CardHeader>
          <Skeleton className="h-6 w-48 bg-slate-700" />
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4 border-b border-slate-800 pb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 bg-slate-700" />
              ))}
            </div>

            {Array.from({ length: 8 }).map((_, row) => (
              <div
                key={row}
                className="grid grid-cols-5 gap-4 border-b border-slate-800 pb-4"
              >
                <Skeleton className="h-4 bg-slate-700" />
                <Skeleton className="h-4 bg-slate-700" />
                <Skeleton className="h-6 w-24 rounded-full bg-slate-700" />
                <Skeleton className="h-4 bg-slate-700" />
                <Skeleton className="h-8 w-20 bg-slate-700" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
