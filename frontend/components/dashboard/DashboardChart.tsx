"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: {
    month: number;
    total: number;
  }[];
}

const monthNames = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function DashboardChart({ data }: Props) {
  const chartData = data.map((item) => ({
    ...item,
    monthName: monthNames[item.month],
  }));

  return (
    <Card className="border-slate-800 bg-[#111C3D] lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-white">Monthly Expense Trend</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-75">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="monthName" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="total"
                stroke="#2E62FF"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
