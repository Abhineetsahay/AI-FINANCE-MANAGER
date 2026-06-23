import { Card, CardContent } from "@/components/ui/card";

export default function GoalsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <Card className="border-slate-800 bg-[#111C3D]">
        <CardContent className="p-8">
          <div className="h-4 w-24 rounded bg-slate-700" />

          <div className="mt-4 h-12 w-48 rounded bg-slate-700" />

          <div className="mt-3 h-4 w-32 rounded bg-slate-700" />

          <div className="mt-6">
            <div className="mb-2 flex justify-between">
              <div className="h-3 w-24 rounded bg-slate-700" />
              <div className="h-3 w-12 rounded bg-slate-700" />
            </div>

            <div className="h-3 rounded-full bg-slate-700" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="border-slate-800 bg-[#111C3D]">
            <CardContent className="p-6">
              <div className="mb-6 flex justify-between">
                <div className="h-12 w-12 rounded-xl bg-slate-700" />
                <div className="h-8 w-20 rounded bg-slate-700" />
              </div>

              <div className="h-6 w-40 rounded bg-slate-700" />

              <div className="mt-6 space-y-4">
                <div className="h-4 w-full rounded bg-slate-700" />
                <div className="h-4 w-full rounded bg-slate-700" />
              </div>

              <div className="mt-6">
                <div className="mb-2 flex justify-between">
                  <div className="h-3 w-20 rounded bg-slate-700" />
                  <div className="h-3 w-10 rounded bg-slate-700" />
                </div>

                <div className="h-2 rounded-full bg-slate-700" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
