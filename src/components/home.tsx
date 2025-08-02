import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  CheckCircle2,
  Clock,
  Target,
  Settings,
  Eye,
  Palette,
  Type,
  Zap,
  BarChart3,
  Calendar,
  Focus,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import TaskList from "./TaskList";
import TaskCreator from "./TaskCreator";
import ProgressDashboard from "./ProgressDashboard";

interface AccessibilitySettings {
  fontSize: "small" | "medium" | "large";
  colorScheme: "default" | "high-contrast" | "warm" | "cool";
  visualDensity: "compact" | "comfortable" | "spacious";
  reducedMotion: boolean;
}

function Home() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("tasks");
  const [showTaskCreator, setShowTaskCreator] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] =
    useState<AccessibilitySettings>({
      fontSize: "medium",
      colorScheme: "default",
      visualDensity: "comfortable",
      reducedMotion: false,
    });
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);

  // Quick stats for dashboard overview
  const quickStats = {
    tasksToday: 4,
    totalTasks: 12,
    completedToday: 2,
    focusStreak: 5,
  };

  const getFontSizeClass = () => {
    switch (accessibilitySettings.fontSize) {
      case "small":
        return "text-sm";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  const getColorSchemeClasses = () => {
    switch (accessibilitySettings.colorScheme) {
      case "high-contrast":
        return "bg-black text-white [&_.card]:bg-gray-900 [&_.card]:border-white [&_.button]:bg-white [&_.button]:text-black";
      case "warm":
        return "bg-orange-50 [&_.card]:bg-orange-100 [&_.primary]:bg-orange-600";
      case "cool":
        return "bg-blue-50 [&_.card]:bg-blue-100 [&_.primary]:bg-blue-600";
      default:
        return "bg-background";
    }
  };

  const getDensityClass = () => {
    switch (accessibilitySettings.visualDensity) {
      case "compact":
        return "space-y-2 [&_.card]:p-3";
      case "spacious":
        return "space-y-8 [&_.card]:p-8";
      default:
        return "space-y-4 [&_.card]:p-6";
    }
  };

  const getMotionClass = () => {
    return accessibilitySettings.reducedMotion ? "[&_*]:transition-none" : "";
  };

  return (
    <div
      className={`min-h-screen w-full ${getColorSchemeClasses()} ${getFontSizeClass()} ${getMotionClass()}`}
    >
      {/* Header with accessibility controls */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Target className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold tracking-tight">Bennu</h1>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                AI-Powered Task Manager
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              {/* User Dropdown Panel */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted/70"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                        alt="User"
                      />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium">
                        {user?.user_metadata?.full_name ||
                          user?.email ||
                          "User"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Focus Mode: On
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end">
                  <DropdownMenuLabel className="pb-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                          alt="User"
                        />
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {user?.user_metadata?.full_name ||
                            user?.email ||
                            "User"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Focus Mode: On
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      setShowAccessibilityPanel(!showAccessibilityPanel)
                    }
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                    Accessibility Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    User Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setShowTaskCreator(true)}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Task</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Accessibility Panel */}
      {showAccessibilityPanel && (
        <div className="border-b bg-muted/50 p-4">
          <div className="container mx-auto">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Accessibility Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Font Size
                </label>
                <div className="flex gap-1">
                  {["small", "medium", "large"].map((size) => (
                    <Button
                      key={size}
                      variant={
                        accessibilitySettings.fontSize === size
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setAccessibilitySettings((prev) => ({
                          ...prev,
                          fontSize: size as any,
                        }))
                      }
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Color Scheme
                </label>
                <div className="flex gap-1">
                  {["default", "high-contrast", "warm", "cool"].map(
                    (scheme) => (
                      <Button
                        key={scheme}
                        variant={
                          accessibilitySettings.colorScheme === scheme
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          setAccessibilitySettings((prev) => ({
                            ...prev,
                            colorScheme: scheme as any,
                          }))
                        }
                      >
                        {scheme.charAt(0).toUpperCase() +
                          scheme.slice(1).replace("-", " ")}
                      </Button>
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Visual Density
                </label>
                <div className="flex gap-1">
                  {["compact", "comfortable", "spacious"].map((density) => (
                    <Button
                      key={density}
                      variant={
                        accessibilitySettings.visualDensity === density
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setAccessibilitySettings((prev) => ({
                          ...prev,
                          visualDensity: density as any,
                        }))
                      }
                    >
                      {density.charAt(0).toUpperCase() + density.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Motion</label>
                <Button
                  variant={
                    accessibilitySettings.reducedMotion ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setAccessibilitySettings((prev) => ({
                      ...prev,
                      reducedMotion: !prev.reducedMotion,
                    }))
                  }
                >
                  {accessibilitySettings.reducedMotion ? "Reduced" : "Normal"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className={`container mx-auto px-4 py-6 ${getDensityClass()}`}>
        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="card">
            <CardContent className="flex items-center p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Today's Tasks
                  </p>
                  <p className="text-2xl font-bold">{quickStats.tasksToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card">
            <CardContent className="flex items-center p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed
                  </p>
                  <p className="text-2xl font-bold">
                    {quickStats.completedToday}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card">
            <CardContent className="flex items-center p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Focus className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Focus Streak
                  </p>
                  <p className="text-2xl font-bold">
                    {quickStats.focusStreak} days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card">
            <CardContent className="flex items-center p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Progress
                  </p>
                  <div className="flex items-center space-x-2">
                    <Progress
                      value={
                        (quickStats.completedToday / quickStats.tasksToday) *
                        100
                      }
                      className="w-16 h-2"
                    />
                    <span className="text-sm font-medium">
                      {Math.round(
                        (quickStats.completedToday / quickStats.tasksToday) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-6">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span className="hidden sm:inline">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="focus" className="flex items-center gap-2">
              <Focus className="h-4 w-4" />
              <span className="hidden sm:inline">Focus</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">My Tasks</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{quickStats.totalTasks} total</Badge>
                <Badge variant="secondary">{quickStats.tasksToday} today</Badge>
              </div>
            </div>
            <Separator />
            <TaskList />
          </TabsContent>

          <TabsContent value="focus" className="space-y-4">
            <div className="text-center py-12">
              <Focus className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Focus Mode</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Enter a distraction-free environment to concentrate on your most
                important tasks.
              </p>
              <Button size="lg" className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Start Focus Session
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <ProgressDashboard />
          </TabsContent>
        </Tabs>
      </main>
      {/* Task Creator Modal */}
      <TaskCreator
        open={showTaskCreator}
        onOpenChange={setShowTaskCreator}
        onTaskCreate={(task) => {
          console.log("New task created:", task);
          setShowTaskCreator(false);
        }}
      />
    </div>
  );
}

export default Home;
