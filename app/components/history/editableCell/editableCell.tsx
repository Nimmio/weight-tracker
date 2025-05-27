import { ReactNode } from "@tanstack/react-router";
import React, { useState } from "react";
import EditableCellString from "./editableCellString/editableCellString";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import EditableCellDate from "./editableCellDate/editableCellDate";
import EditableCellNumber from "./editableCellNumber/editableCellNumber";

interface EditableCellProps {
  type: "number" | "string" | "date";
  children: ReactNode;
  value: string | number | Date;
  onSave: (newValue: string | number | Date) => void;
}

const EditableCell = ({ type, children, onSave, value }: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  let editCell;
  switch (type) {
    case "string":
      editCell = (
        <EditableCellString
          onSave={onSave}
          onToggleEdit={() => {
            setIsEditing(false);
          }}
          value={value as string}
        />
      );
      break;
    case "date":
      editCell = (
        <EditableCellDate
          onSave={onSave}
          onToggleEdit={() => {
            setIsEditing(false);
          }}
          value={value as Date}
        />
      );
    default:
      editCell = (
        <EditableCellNumber
          onSave={onSave}
          onToggleEdit={() => {
            setIsEditing(false);
          }}
          value={value as number}
        />
      );
      break;
  }

  return (
    <>
      {!isEditing && (
        <div className="flex items-center group">
          <span className="flex-1">{children}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-3 w-3" />
          </Button>
        </div>
      )}
      {isEditing && <>{editCell}</>}
    </>
  );
};

export default EditableCell;
