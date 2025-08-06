import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { Task, User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import CreateTaskForm from "./CreateTaskForm";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useTasks } from "@/hooks/useTasks";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import KanbanColumn from "./kanban/KanbanColumn";
import { toast } from "sonner";
import { userService } from "@/services/api";

type TaskStatus = "todo" | "inProgress" | "done";

interface KanbanBoardProps {
  refreshTrigger?: number;
  onDataChange?: () => void;
}

const KanbanBoard = ({ refreshTrigger = 0, onDataChange }: KanbanBoardProps) => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForColumn, setCreateForColumn] = useState<TaskStatus>("todo");
  const { user, isLoading: isAuthLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  const {
    todoTasks,
    inProgressTasks,
    doneTasks,
    isLoading,
    createTask,
    deleteTask,
    updateTask,
    updateTaskStatus,
  } = useTasks(refreshTrigger);

  const { handleDrop } = useDragAndDrop({
    onStatusChange: async (taskId, oldStatus, newStatus) => {
      await updateTaskStatus(taskId, oldStatus, newStatus);
      if (onDataChange) onDataChange();
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  const handleCreateTask = async (
    taskData: Omit<Task, "id" | "createdAt" | "comments">
  ): Promise<void> => {
    try {
      if (!taskData.title || !taskData.title.trim()) {
        toast.error("Task title is required");
        return;
      }

      const taskToCreate = {
        ...taskData,
        title: taskData.title.trim(),
        description: taskData.description?.trim() || "",
        status: taskData.status || createForColumn || "todo",
        priority: taskData.priority || "medium",
        dueDate:
          taskData.dueDate ||
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdBy: user?.id || "1",
        assigneeId: taskData.assigneeId || null,
        labels: taskData.labels || [],
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date().toISOString(),
      };

      await createTask(taskToCreate);
      setIsCreateModalOpen(false);
      toast.success("Task created successfully!");
      if (onDataChange) {
        onDataChange();
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId, user.id);
      toast.success("Task deleted successfully!");
      if (onDataChange) {
        onDataChange();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const handleTaskDrop = useCallback(
    async (e: React.DragEvent, status: TaskStatus) => {
      await handleDrop(e, status);
    },
    [handleDrop]
  );

  const columns = [
    { id: "todo", title: "To Do", tasks: todoTasks },
    { id: "inProgress", title: "In Progress", tasks: inProgressTasks },
    { id: "done", title: "Done", tasks: doneTasks },
  ];

  if (isAuthLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading tasks...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-auto bg-beige-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-beige-800">My Tasks</h2>
        <Button
          onClick={() => {
            setCreateForColumn("todo");
            setIsCreateModalOpen(true);
          }}
          className="flex items-center gap-2 bg-beige-600 hover:bg-beige-700 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div key={col.id} className="flex-1 overflow-hidden">
            <KanbanColumn
              status={col.id as TaskStatus}
              title={col.title}
              tasks={col.tasks}
              users={users}
              onEditTask={(task) => {
                setCurrentTask(task);
                setCreateForColumn(task.status);
                setIsCreateModalOpen(true);
              }}
              onDeleteTask={handleDeleteTask}
              onDrop={handleTaskDrop}
              onAddTask={() => {
                setCreateForColumn(col.id as TaskStatus);
                setIsCreateModalOpen(true);
              }}
            />
          </div>
        ))}
      </div>

      <CreateTaskForm
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTask={handleCreateTask}
        initialStatus={createForColumn}
        users={users}
      />
    </div>
  );
};

export default KanbanBoard;
