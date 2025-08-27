import React from 'react';
import { BellOff, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function TaskDashboard({ activeTask, nextTask, currentTime, onCompleteTask, onSnoozeTask }) {
  return (
    <Card className="rounded-2xl p-6 space-y-6">
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">Current Time</p>
          <p className="text-5xl font-extrabold text-blue-600 mt-1">{currentTime}</p>
        </div>

        <div className="space-y-4">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Active Task</CardTitle>
            </CardHeader>
            <CardContent>
              {activeTask ? (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">{activeTask.title}</h4>
                    <p className="text-sm text-gray-500">{activeTask.startTime} • {activeTask.duration} min</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onSnoozeTask(activeTask.id)}
                      className="rounded-full bg-orange-500 text-white hover:bg-orange-600"
                    >
                      <BellOff className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onCompleteTask(activeTask.id)}
                      className="rounded-full bg-green-500 text-white hover:bg-green-600"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500">No active tasks. Time to relax! 😴</p>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Next Up</CardTitle>
            </CardHeader>
            <CardContent>
              {nextTask ? (
                <div>
                  <h4 className="text-lg font-semibold">{nextTask.title}</h4>
                  <p className="text-sm text-gray-500">Starts at {nextTask.startTime}</p>
                </div>
              ) : (
                <p className="text-center text-gray-500">No more tasks for today! 🙌</p>
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}