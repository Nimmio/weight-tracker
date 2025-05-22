"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditGoalWeightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentGoal: number;
  onSave: (newGoal: number) => void;
}

export function EditGoalWeightDialog({
  open,
  onOpenChange,
  currentGoal,
  onSave,
}: EditGoalWeightDialogProps) {
  const [goalWeight, setGoalWeight] = useState(currentGoal.toString());
  const [error, setError] = useState("");

  const handleSave = () => {
    // Validate input
    const weight = Number.parseFloat(goalWeight);

    if (isNaN(weight) || weight <= 0) {
      setError("Please enter a valid weight");
      return;
    }

    // Save the new goal weight
    onSave(weight);

    // Close the dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Goal Weight</DialogTitle>
          <DialogDescription>
            Set a new target weight for your fitness journey.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="goal-weight">Goal Weight (lbs)</Label>
            <Input
              id="goal-weight"
              type="number"
              step="0.1"
              min="0"
              value={goalWeight}
              onChange={(e) => {
                setGoalWeight(e.target.value);
                setError("");
              }}
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
