import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function StatsCard({
  title,
  value,
  trend,
  isLoading,
  editable = false,
  onEditClick = () => {},
}) {
  const isPositive = trend.includes("+");

  return isLoading ? (
    <Skeleton className="h-[111px]" />
  ) : (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      {editable ? (
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-muted-foreground">
            Goal Weight
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onEditClick}
            className="h-6 w-6"
          >
            <Pencil className="h-3 w-3" />
            <span className="sr-only">Edit goal weight</span>
          </Button>
        </div>
      ) : (
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      )}
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p
        className={`text-sm mt-1 ${
          isPositive ? "text-red-500" : "text-green-500"
        }`}
      >
        {trend}
      </p>
    </div>
  );
}
