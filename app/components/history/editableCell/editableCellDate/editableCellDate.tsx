import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check, X } from "lucide-react";
import React, { useState } from "react";

interface EditableCellDateProps {
  value: Date;
  onToggleEdit: () => void;
  onSave: (newValue: Date) => void;
}

const EditableCellDate = ({
  value,
  onToggleEdit,
  onSave,
}: EditableCellDateProps) => {
  const [editValue, setEditValue] = useState<Date>(value);

  const handleSave = () => {
    onSave(editValue);
  };

  const handleCancel = () => {
    setEditValue(value);
    onToggleEdit();
  };

  return (
    <div className="flex items-center space-x-1">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[140px] justify-start text-left font-normal",
              !editValue && "text-muted-foreground"
            )}
            size="sm"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {editValue ? (
              format(editValue, "MMM d, yyyy")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={editValue}
            onSelect={(newDate) => setEditValue(newDate as Date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={handleSave}
      >
        <Check className="h-3 w-3 text-green-600" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={handleCancel}
      >
        <X className="h-3 w-3 text-red-600" />
      </Button>
    </div>
  );
};

export default EditableCellDate;
