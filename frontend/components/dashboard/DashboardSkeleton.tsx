import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <Skeleton className="h-4 w-32 bg-slate-700" />
        <Skeleton className="mt-3 h-10 w-52 bg-slate-700" />
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-slate-800 bg-[#111C3D]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-8 rounded-full bg-slate-700" />
                <Skeleton className="h-4 w-16 bg-slate-700" />
              </div>

              <Skeleton className="mt-4 h-4 w-24 bg-slate-700" />
              <Skeleton className="mt-3 h-8 w-32 bg-slate-700" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-800 bg-[#111C3D]">
        <CardHeader>
          <Skeleton className="h-6 w-40 bg-slate-700" />
        </CardHeader>

        <CardContent className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className="grid gap-4 md:grid-cols-3">
                <Skeleton className="h-20 bg-slate-700" />
                <Skeleton className="h-20 bg-slate-700" />
                <Skeleton className="h-20 bg-slate-700" />
              </div>

              <Skeleton className="mt-4 h-3 w-full bg-slate-700" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-slate-800 bg-[#111C3D]">
        <CardHeader>
          <Skeleton className="h-6 w-48 bg-slate-700" />
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-4 border-b border-slate-800 pb-4"
              >
                <Skeleton className="h-4 bg-slate-700" />
                <Skeleton className="h-4 bg-slate-700" />
                <Skeleton className="h-4 bg-slate-700" />
                <Skeleton className="h-4 bg-slate-700" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
