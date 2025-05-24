import { Button } from "@/components/ui/button";

export type Timeframe = "1m" | "3m" | "6m" | "1y" | "all";

interface TimeframeSelectorProps {
  selectedTimeframe: Timeframe;
  onTimeframeChange: (timeframe: Timeframe) => void;
}

const timeframeOptions = [
  { value: "1m" as const, label: "1 Month" },
  { value: "3m" as const, label: "3 Months" },
  { value: "6m" as const, label: "6 Months" },
  { value: "1y" as const, label: "1 Year" },
  { value: "all" as const, label: "All Time" },
];

export function TimeframeSelector({
  selectedTimeframe,
  onTimeframeChange,
}: TimeframeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {timeframeOptions.map((option) => (
        <Button
          key={option.value}
          variant={selectedTimeframe === option.value ? "default" : "outline"}
          size="sm"
          onClick={() => onTimeframeChange(option.value)}
          className="text-xs"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
