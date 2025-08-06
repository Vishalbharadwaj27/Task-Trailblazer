import { useState, useEffect } from "react";
import { Task, User } from "@/lib/types";
import { userService } from "@/services/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MessageSquare, Edit2, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  users: User[];
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

export default function TaskCard({ task, users, onEdit, onDelete }: TaskCardProps) {
  const [assignee, setAssignee] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (task.assigneeId) {
      const assignedUser = users.find(u => u.id === task.assigneeId);
      setAssignee(assignedUser || null);
    } else {
      setAssignee(null);
    }
  }, [task.assigneeId, users]);

  const getAssigneeName = () => {
    if (!task.assigneeId) return "Unassigned";
    return assignee?.name || "Unknown Assignee";
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events

    try {
      setIsDeleting(true);
      if (onDelete) onDelete(task.id);
    } catch (error) {
      console.error("Error deleting task:", error);
      setIsDeleting(false);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    if (onEdit) onEdit(task);
  };

  const priorityColors: Record<string, string> = {
    low: "bg-beige-100 text-beige-800",
    medium: "bg-beige-200 text-beige-900",
    high: "bg-beige-300 text-beige-950",
  };

  return (
    // FIX: Added the `group` class here.
    // This allows us to control the visibility of child elements based on the hover state of this parent Card component.
    <Card className="group bg-cream-50 rounded-lg border border-beige-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-beige-900">{task.title}</CardTitle>
          {/* FIX: Added classes to this container.
              - `opacity-0` makes the buttons invisible by default.
              - `group-hover:opacity-100` makes them visible when the parent `group` (the Card) is hovered.
              - `transition-opacity` and `duration-300` add a smooth fade-in/out effect.
          */}
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {task.description && (
          <CardDescription className="mt-1 line-clamp-2">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {task.priority && (
            <Badge
              variant="outline"
              className={`${priorityColors[task.priority]}`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
              Priority
            </Badge>
          )}

          <div className="flex items-center text-sm text-gray-500">
            {task.dueDate ? (
              <span>Due: {format(new Date(task.dueDate), "MMM d, yyyy")}</span>
            ) : (
              <span className="text-gray-400">No due date</span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage
                  src={assignee?.avatar}
                  alt={getAssigneeName()}
                />
                <AvatarFallback>
                  {getAssigneeName().charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className={cn(
                "text-xs",
                task.assigneeId ? "text-gray-600" : "text-gray-500"
              )}>
                {getAssigneeName()}
              </span>
            </div>

            {task.comments && task.comments.length > 0 && (
              <div className="flex items-center text-gray-500">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span className="text-xs">{task.comments.length}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}