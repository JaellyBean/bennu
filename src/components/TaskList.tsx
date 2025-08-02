import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  Filter,
  MoreVertical,
  Play,
  Star,
  Tag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  completed: boolean;
}

const priorityColors = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-amber-100 text-amber-700",
  urgent: "bg-red-100 text-red-700",
};

const TaskList = ({ tasks = mockTasks }) => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tasks based on current filter and search query
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed" && !task.completed) return false;
    if (filter === "active" && task.completed) return false;

    if (searchQuery) {
      return (
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return true;
  });

  // Sort tasks based on current sort option
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortBy === "dueDate") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else {
      // Sort by category
      return a.category.localeCompare(b.category);
    }
  });

  const handleTaskComplete = (taskId: string) => {
    // In a real app, this would update the task in the database
    console.log(`Task ${taskId} marked as complete`);
  };

  const handleEnterFocusMode = (taskId: string) => {
    // In a real app, this would trigger focus mode for the selected task
    console.log(`Entering focus mode for task ${taskId}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">My Tasks</h2>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Advanced Filters
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-3 pr-10"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-3 mt-2">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onComplete={handleTaskComplete}
                onFocus={handleEnterFocusMode}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No tasks found. Try adjusting your filters or create a new task.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
  onFocus: (id: string) => void;
}

const TaskItem = ({ task, onComplete, onFocus }: TaskItemProps) => {
  return (
    <Card
      className={`overflow-hidden transition-all ${task.completed ? "opacity-70" : ""}`}
    >
      <CardContent className="p-0">
        <div className="flex items-center p-4 gap-3">
          <div className="flex-shrink-0">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onComplete(task.id)}
              id={`task-${task.id}`}
            />
          </div>

          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2">
              <h3
                className={`font-medium text-gray-900 truncate ${task.completed ? "line-through text-gray-500" : ""}`}
              >
                {task.title}
              </h3>
              <Badge className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Tag size={12} className="mr-1" />
                {task.category}
              </Badge>
            </div>

            {task.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {task.description}
              </p>
            )}

            {task.dueDate && (
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <Calendar size={12} className="mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={() => onFocus(task.id)}
            >
              <Play size={16} className="text-green-600" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Mock data for demonstration
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the executive summary and budget sections",
    dueDate: new Date("2023-06-15"),
    priority: "urgent",
    category: "Work",
    completed: false,
  },
  {
    id: "2",
    title: "Schedule doctor appointment",
    dueDate: new Date("2023-06-20"),
    priority: "high",
    category: "Health",
    completed: false,
  },
  {
    id: "3",
    title: "Buy groceries",
    description: "Milk, eggs, bread, vegetables",
    priority: "medium",
    category: "Personal",
    completed: true,
  },
  {
    id: "4",
    title: "Read chapter 5 of textbook",
    priority: "low",
    category: "Education",
    completed: false,
  },
  {
    id: "5",
    title: "Pay utility bills",
    dueDate: new Date("2023-06-10"),
    priority: "high",
    category: "Finance",
    completed: false,
  },
];

export default TaskList;
