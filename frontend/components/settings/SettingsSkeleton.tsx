import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <Skeleton className="h-4 w-36 bg-slate-700" />
        <Skeleton className="mt-3 h-10 w-32 bg-slate-700" />
      </div>

      <Card className="border-slate-800 bg-[#111C3D]">
        <CardContent className="p-8">
          <div className="flex items-center gap-5">
            <Skeleton className="h-20 w-20 rounded-full bg-slate-700" />

            <div className="space-y-3">
              <Skeleton className="h-8 w-40 bg-slate-700" />
              <Skeleton className="h-4 w-32 bg-slate-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-800 bg-[#111C3D]">
          <CardContent className="p-6">
            <Skeleton className="mb-4 h-6 w-32 bg-slate-700" />
            <Skeleton className="h-5 w-56 bg-slate-700" />
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-[#111C3D]">
          <CardContent className="p-6">
            <Skeleton className="mb-4 h-6 w-36 bg-slate-700" />
            <Skeleton className="h-8 w-32 bg-slate-700" />
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-800 bg-[#111C3D]">
        <CardContent className="p-6">
          <Skeleton className="mb-6 h-7 w-48 bg-slate-700" />

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex justify-between border-b border-slate-800 pb-3"
              >
                <Skeleton className="h-4 w-24 bg-slate-700" />
                <Skeleton className="h-4 w-32 bg-slate-700" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/20 bg-[#111C3D]">
        <CardContent className="p-6">
          <Skeleton className="mb-4 h-7 w-32 bg-slate-700" />
          <Skeleton className="h-10 w-28 bg-slate-700" />
        </CardContent>
      </Card>
    </div>
  );
}