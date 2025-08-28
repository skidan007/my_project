import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input, Label, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Switch } from './ui/form-elements';
import { CATEGORY_ICONS } from '../constants/app';
import { toast } from './ui/toaster';

export function AddTaskForm({ onAddTask }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    duration: '',
    category: 'personal',
    isRecurring: false,
    alarmEnabled: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.startTime) {
      toast.error('Task title and start time are required!');
      return;
    }

    onAddTask({
      title: formData.title,
      description: formData.description || undefined,
      startTime: formData.startTime,
      endTime: formData.endTime || undefined,
      duration: formData.duration ? parseInt(formData.duration) : undefined,
      category: formData.category,
      isRecurring: formData.isRecurring,
      isCompleted: false,
      isActive: false,
      alarmEnabled: formData.alarmEnabled,
    });

    setFormData({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      duration: '',
      category: 'personal',
      isRecurring: false,
      alarmEnabled: true,
    });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="w-full flex justify-center"
        size="lg"
      >
        <Plus className="h-5 w-5 mr-1" />
        Add New Task
      </Button>
    );
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="30"
                min="1"
                max="480"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CATEGORY_ICONS).map(([key, icon]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <span>{icon}</span>
                      <span className="capitalize">{key.replace('-', ' ')}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="recurring"
                checked={formData.isRecurring}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, isRecurring: checked }))
                }
              />
              <Label htmlFor="recurring">Recurring daily</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="alarm"
                checked={formData.alarmEnabled}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, alarmEnabled: checked }))
                }
              />
              <Label htmlFor="alarm">Enable alarm</Label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Add Task
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}