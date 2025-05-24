import { useQuery } from "@tanstack/react-query";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { fetchAllWeighings, fetchWeighingsInTimeframe } from "@/lib/weighings";
import { Separator } from "../ui/separator";
import {
  Timeframe,
  TimeframeSelector,
} from "./timeframeSelector/timeframeSelector";
import { useState } from "react";

export function Chart() {
  const [timeframe, setTimeframe] = useState<Timeframe>("all");

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["weighings", { timeframe }],
    queryFn: () => fetchWeighingsInTimeframe({ data: timeframe }),
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading chart data...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-4 text-red-500">
        Error loading chart data
      </div>
    );
  }

  // Format data for the chart
  const chartData = data.map((entry) => ({
    date: entry.date,
    weight: entry.weight,
  }));

  // Calculate min and max for Y axis with some padding
  const weights = chartData.map((d) => d.weight);
  const minWeight = Math.floor(Math.min(...weights) - 5);
  const maxWeight = Math.ceil(Math.max(...weights) + 5);

  return (
    <div className="w-full h-[300px]">
      <TimeframeSelector
        selectedTimeframe={timeframe}
        onTimeframeChange={(newTimeframe) => setTimeframe(newTimeframe)}
      />
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-full border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            No data available. Add your first weight entry to see your progress!
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{
                r: 6,
                stroke: "#0ea5e9",
                strokeWidth: 2,
                fill: "white",
              }}
            />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(date, "MMM d")}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={[minWeight, maxWeight]}
              tick={{ fontSize: 12 }}
              tickCount={5}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="p-2 bg-white shadow-lg border">
                      <p className="text-xs text-gray-500">
                        {format(label, "MMM d, yyyy")}
                      </p>
                      <p className="font-medium">{payload[0].value} kg</p>
                    </Card>
                  );
                }
                return null;
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
