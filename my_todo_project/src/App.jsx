import React from 'react';
import { Clock, Calendar, BarChart3, BellOff, Check } from 'lucide-react';
import { useTaskManager } from './hooks/useTaskManager';
import { TaskDashboard } from './components/TaskDashboard';
import { AddTaskForm } from './components/AddTaskForm';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Toaster, toast } from './components/ui/toaster';

export default function App() {
  const {
    tasks,
    activeTask,
    nextTask,
    currentTime,
    addTask,
    completeTask,
    snoozeTask,
    getDailyStats,
    getRandomQuote,
  } = useTaskManager();

  const handleCompleteTask = (id) => {
    completeTask(id);
    toast.success('Task completed! Great job! 🎉');
  };
  
  const handleSnoozeTask = (id) => {
    snoozeTask(id);
  };

  const handleAddTask = (taskData) => {
    addTask(taskData);
    toast.success('Task added successfully! ⏰');
  };

  const stats = getDailyStats();
  const motivationalQuote = getRandomQuote();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col items-center">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-800 mb-2">
            TaskAlarm 🕒
          </h1>
          <p className="text-gray-500">
            Your Smart Daily To-Do List & Alarm Scheduler
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full space-y-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <TaskDashboard
              activeTask={activeTask}
              nextTask={nextTask}
              currentTime={currentTime}
              onCompleteTask={handleCompleteTask}
              onSnoozeTask={handleSnoozeTask}
              motivationalQuote={motivationalQuote}
            />
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <AddTaskForm onAddTask={handleAddTask} />
            
            {tasks.length > 0 && (
              <Card className="space-y-4 rounded-2xl">
                <CardHeader>
                  <CardTitle>All Tasks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tasks
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((task) => (
                      <div
                        key={task.id}
                        className={`p-4 border rounded-2xl transition-colors ${
                          task.isCompleted 
                            ? 'bg-gray-100 opacity-75 line-through'
                            : task.isActive
                            ? 'border-green-500 bg-green-50 animate-pulse-light'
                            : task.isOverdue
                            ? 'border-red-500 bg-red-50'
                            : 'bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">
                              {task.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {task.startTime} • {task.category}
                              {task.duration && ` • ${task.duration} min`}
                            </p>
                            {task.isOverdue && !task.isCompleted && (
                              <p className="text-xs text-red-500 mt-1">Overdue!</p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                              {task.isActive && (
                                <Button
                                  size="sm"
                                  onClick={() => handleSnoozeTask(task.id)}
                                  className="rounded-full bg-orange-500 text-white hover:bg-orange-600"
                                >
                                  <BellOff className="h-4 w-4" />
                                </Button>
                              )}
                              {!task.isCompleted && (
                                <Button
                                  size="sm"
                                  onClick={() => handleCompleteTask(task.id)}
                                  className="rounded-full bg-blue-600 text-white hover:bg-blue-700"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="stats">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Daily Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-100 p-6 rounded-2xl text-center">
                    <div className="text-3xl font-bold text-blue-600">{stats.totalTasks}</div>
                    <div className="text-sm text-gray-500">Total Tasks</div>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-2xl text-center">
                    <div className="text-3xl font-bold text-green-600">{stats.completedTasks}</div>
                    <div className="text-sm text-gray-500">Completed</div>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-2xl text-center">
                    <div className="text-3xl font-bold text-red-600">{stats.missedTasks}</div>
                    <div className="text-sm text-gray-500">Missed</div>
                  </div>
                </div>

                {Object.keys(stats.timeSpentByCategory).length > 0 && (
                  <div className="bg-gray-100 p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-4">Time Spent by Category</h3>
                    <div className="space-y-3">
                      {Object.entries(stats.timeSpentByCategory).map(([category, minutes]) => (
                        <div key={category} className="flex justify-between items-center">
                          <span className="capitalize">{category.replace('-', ' ')}</span>
                          <span className="font-medium">{minutes} min</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}