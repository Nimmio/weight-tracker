import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import React, { useState } from "react";

interface EditableCellStringProps {
  value: string;
  onToggleEdit: () => void;
  onSave: (newValue: string) => void;
}

const EditableCellString = ({
  value,
  onToggleEdit,
  onSave,
}: EditableCellStringProps) => {
  const [editValue, setEditValue] = useState<string>(value);

  const handleKeyDown = (keyboardEvent: React.KeyboardEvent) => {
    const { key } = keyboardEvent;
    if (key === "Enter") {
      handleSave();
    } else if (key === "Escape") {
      handleCancel();
    }
  };

  const handleSave = () => {
    onSave(editValue);
  };

  const handleCancel = () => {
    setEditValue(value);
    onToggleEdit();
  };

  return (
    <div className="flex items-center space-x-1">
      <Input
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-8 text-sm"
        autoFocus
      />
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

export default EditableCellString;
