import { Clock } from 'lucide-react';
import { AddTaskForm } from './AddTaskForm';

export function DashboardTab() {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Clock size={24} /> {currentTime}
        </div>
        <p className="text-gray-600 italic">"Rise and shine! Your dreams are waiting for you."</p>
      </div>

      <div className="text-center py-8 text-gray-500">
        <p className="mb-2">No Active Task</p>
        <p>Add a task to get started</p>
      </div>

      {/* <AddTaskForm /> */}
    </div>
  );
}