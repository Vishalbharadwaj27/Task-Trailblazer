
import { useState } from "react";
import { Task, TaskStatus, User } from "@/lib/types";
import { cn } from "@/lib/utils";
import TaskCard from "../TaskCard";

interface DraggableTaskCardProps {
  task: Task;
  status: TaskStatus;
  users: User[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void | Promise<void>;
  onDragStart?: (e: React.DragEvent) => void;
  className?: string;
}

export default function DraggableTaskCard({ 
  task, 
  status, 
  users,
  onEdit, 
  onDelete, 
  onDragStart,
  className = "",
}: DraggableTaskCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    if (onDragStart) {
      onDragStart(e);
    }
    // Set drag data for the drag and drop operation
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("fromStatus", status);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
      className={cn(
        "relative group transition-all cursor-grab active:cursor-grabbing",
        isDragging ? "opacity-50" : "opacity-100",
        className
      )}
    >
      <TaskCard
        task={task}
        users={users}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}
