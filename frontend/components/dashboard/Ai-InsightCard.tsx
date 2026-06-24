"use client";

import { Sparkles, ShieldCheck, Lightbulb } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AIInsight {
  financial_health_score: number;
  financial_health: string;
  insights: string[];
  recommendations: string[];
}

interface Props {
  data: AIInsight | null;
}

export default function AIInsightsCard({ data }: Props) {
  if (!data) return null;

  return (
    <Card className="border-slate-800 bg-[#111C3D]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#8B5CF6]" />

          <CardTitle className="text-white">AI Insights</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-sm text-slate-400">Financial Health</p>

          <div className="mt-2 flex items-center justify-between">
            <span className="font-semibold text-white">
              {data.financial_health}
            </span>

            <span className="text-xl font-bold text-[#10B981]">
              {data.financial_health_score}/100
            </span>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#10B981]" />

            <h3 className="font-semibold text-white">Insights</h3>
          </div>

          <ul className="space-y-2">
            {data.insights.map((item, index) => (
              <li
                key={index}
                className="rounded-lg bg-slate-800 p-2 text-sm text-slate-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-400" />

            <h3 className="font-semibold text-white">Recommendations</h3>
          </div>

          <ul className="space-y-2">
            {data.recommendations.map((item, index) => (
              <li
                key={index}
                className="rounded-lg bg-slate-800 p-2 text-sm text-slate-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
