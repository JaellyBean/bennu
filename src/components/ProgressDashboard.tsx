import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Activity,
  Award,
  Calendar,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
}

interface DailyProgress {
  day: string;
  completed: number;
  total: number;
}

interface ProgressDashboardProps {
  achievements?: Achievement[];
  dailyProgress?: DailyProgress[];
  weeklyCompletionRate?: number;
  streakDays?: number;
  tasksCompletedToday?: number;
  totalTasksToday?: number;
}

const ProgressDashboard = ({
  achievements = [
    {
      id: "1",
      title: "Focus Master",
      description: "Complete 5 tasks in Focus Mode",
      completed: true,
      progress: 100,
    },
    {
      id: "2",
      title: "Consistency Champion",
      description: "Use the app for 7 days in a row",
      completed: false,
      progress: 71,
    },
    {
      id: "3",
      title: "Task Terminator",
      description: "Complete 50 tasks total",
      completed: false,
      progress: 64,
    },
  ],
  dailyProgress = [
    { day: "Mon", completed: 5, total: 7 },
    { day: "Tue", completed: 8, total: 10 },
    { day: "Wed", completed: 6, total: 8 },
    { day: "Thu", completed: 9, total: 12 },
    { day: "Fri", completed: 4, total: 6 },
    { day: "Sat", completed: 3, total: 5 },
    { day: "Sun", completed: 0, total: 4 },
  ],
  weeklyCompletionRate = 78,
  streakDays = 5,
  tasksCompletedToday = 4,
  totalTasksToday = 6,
}: ProgressDashboardProps) => {
  return (
    <div className="w-full h-full bg-background p-4 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Progress Dashboard
          </h2>
          <p className="text-muted-foreground">
            Track your accomplishments and stay motivated
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Activity className="h-4 w-4" />
          <span>{streakDays} Day Streak</span>
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-xl font-bold">
                    {tasksCompletedToday}/{totalTasksToday}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Tasks Completed
                </span>
              </div>
              <Progress
                value={(tasksCompletedToday / totalTasksToday) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-xl font-bold">
                    {weeklyCompletionRate}%
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">This Week</span>
              </div>
              <Progress value={weeklyCompletionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Achievement Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-xl font-bold">
                    {achievements.filter((a) => a.completed).length}/
                    {achievements.length}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Achievements Unlocked
                </span>
              </div>
              <Progress
                value={
                  (achievements.filter((a) => a.completed).length /
                    achievements.length) *
                  100
                }
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="daily">
            <Calendar className="h-4 w-4 mr-2" />
            Daily
          </TabsTrigger>
          <TabsTrigger value="weekly">
            <BarChart className="h-4 w-4 mr-2" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Award className="h-4 w-4 mr-2" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Task Completion</CardTitle>
              <CardDescription>
                Your task completion for the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-64">
                {dailyProgress.map((day, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-muted-foreground">
                        {day.completed}/{day.total}
                      </span>
                      <div className="relative w-12 bg-muted rounded-t-md">
                        <div
                          className="absolute bottom-0 w-full bg-primary rounded-t-md transition-all duration-500"
                          style={{
                            height: `${(day.completed / day.total) * 100}%`,
                            minHeight: day.completed > 0 ? "8px" : "0",
                          }}
                        />
                        <div className="h-40 w-full" />
                      </div>
                    </div>
                    <span className="text-sm font-medium">{day.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Trends</CardTitle>
              <CardDescription>
                Your productivity patterns over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64">
                <div className="text-center p-8 border border-dashed rounded-md border-muted-foreground/50 w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <BarChart className="h-10 w-10 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Weekly trend visualization will appear here
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <React.Fragment key={achievement.id}>
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-full p-2 ${achievement.completed ? "bg-primary/20" : "bg-muted"}`}
                      >
                        <Award
                          className={`h-6 w-6 ${achievement.completed ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <span className="text-sm text-muted-foreground">
                            {achievement.progress}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        <Progress
                          value={achievement.progress}
                          className="h-1 mt-2"
                        />
                      </div>
                    </div>
                    {index < achievements.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressDashboard;
