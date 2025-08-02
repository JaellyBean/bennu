import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Calendar, Clock, Tag, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface TaskCreatorProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onTaskCreate?: (task: Task) => void;
}

interface Task {
  id?: string;
  title: string;
  description: string;
  dueDate?: Date;
  priority: "low" | "medium" | "high";
  category: string;
  tags: string[];
}

const TaskCreator: React.FC<TaskCreatorProps> = ({
  open = true,
  onOpenChange = () => {},
  onTaskCreate = () => {},
}) => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    priority: "medium",
    category: "personal",
    tags: [],
  });

  const [date, setDate] = useState<Date>();
  const [aiSuggestions, setAiSuggestions] = useState<{
    priority?: "low" | "medium" | "high";
    category?: string;
    tags?: string[];
  }>({});
  const [newTag, setNewTag] = useState("");

  // Simulate AI analyzing content as user types
  const analyzeContent = (title: string, description: string) => {
    // This would be replaced with actual AI analysis
    if (
      title.toLowerCase().includes("urgent") ||
      description.toLowerCase().includes("urgent")
    ) {
      setAiSuggestions((prev) => ({ ...prev, priority: "high" }));
    }

    if (
      title.toLowerCase().includes("work") ||
      description.toLowerCase().includes("work")
    ) {
      setAiSuggestions((prev) => ({ ...prev, category: "work" }));
    }

    // Extract potential tags from content
    const potentialTags = [];
    if (
      title.toLowerCase().includes("meeting") ||
      description.toLowerCase().includes("meeting")
    ) {
      potentialTags.push("meeting");
    }
    if (
      title.toLowerCase().includes("email") ||
      description.toLowerCase().includes("email")
    ) {
      potentialTags.push("email");
    }

    if (potentialTags.length > 0) {
      setAiSuggestions((prev) => ({ ...prev, tags: potentialTags }));
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTask((prev) => ({ ...prev, title: newTitle }));
    analyzeContent(newTitle, task.description);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newDescription = e.target.value;
    setTask((prev) => ({ ...prev, description: newDescription }));
    analyzeContent(task.title, newDescription);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setTask((prev) => ({ ...prev, dueDate: selectedDate }));
  };

  const addTag = () => {
    if (newTag && !task.tags.includes(newTag)) {
      setTask((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTask((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const applySuggestion = (type: "priority" | "category" | "tags") => {
    if (type === "priority" && aiSuggestions.priority) {
      setTask((prev) => ({ ...prev, priority: aiSuggestions.priority! }));
    } else if (type === "category" && aiSuggestions.category) {
      setTask((prev) => ({ ...prev, category: aiSuggestions.category! }));
    } else if (type === "tags" && aiSuggestions.tags) {
      const newTags = [...task.tags];
      aiSuggestions.tags.forEach((tag) => {
        if (!newTags.includes(tag)) {
          newTags.push(tag);
        }
      });
      setTask((prev) => ({ ...prev, tags: newTags }));
    }
  };

  const handleSubmit = () => {
    // Add validation here
    if (!task.title.trim()) {
      return; // Don't submit if title is empty
    }

    const newTask = {
      ...task,
      id: Date.now().toString(), // Simple ID generation
    };

    onTaskCreate(newTask);
    onOpenChange(false);

    // Reset form
    setTask({
      title: "",
      description: "",
      priority: "medium",
      category: "personal",
      tags: [],
    });
    setDate(undefined);
    setAiSuggestions({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create New Task
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder="Task title"
              value={task.title}
              onChange={handleTitleChange}
              className="text-lg font-medium"
            />

            {aiSuggestions.priority &&
              task.priority !== aiSuggestions.priority && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-sm text-blue-600"
                >
                  <AlertCircle size={16} />
                  <span>AI suggests: {aiSuggestions.priority} priority</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => applySuggestion("priority")}
                  >
                    Apply
                  </Button>
                </motion.div>
              )}
          </div>

          <div>
            <Textarea
              placeholder="Description (optional)"
              value={task.description}
              onChange={handleDescriptionChange}
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Due Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Priority</label>
              <Select
                value={task.priority}
                onValueChange={(value: "low" | "medium" | "high") =>
                  setTask((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <Select
                value={task.category}
                onValueChange={(value) =>
                  setTask((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>

              {aiSuggestions.category &&
                task.category !== aiSuggestions.category && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-sm text-blue-600 mt-1"
                  >
                    <AlertCircle size={16} />
                    <span>AI suggests: {aiSuggestions.category}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => applySuggestion("category")}
                    >
                      Apply
                    </Button>
                  </motion.div>
                )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Tags</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                />
                <Button type="button" size="icon" onClick={addTag}>
                  <Plus size={16} />
                </Button>
              </div>

              {aiSuggestions.tags &&
                aiSuggestions.tags.some((tag) => !task.tags.includes(tag)) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-sm text-blue-600 mt-1"
                  >
                    <AlertCircle size={16} />
                    <span>
                      AI suggests tags:{" "}
                      {aiSuggestions.tags
                        .filter((tag) => !task.tags.includes(tag))
                        .join(", ")}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => applySuggestion("tags")}
                    >
                      Apply
                    </Button>
                  </motion.div>
                )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {task.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {tag}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskCreator;
