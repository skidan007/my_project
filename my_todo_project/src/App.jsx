import { useState } from 'react';
import { Clock, Calendar, BarChart3 } from 'lucide-react';
import { DashboardTab } from './components/DashboardTab';
import { TasksTab } from './components/TasksTab';
import { StatsTab } from './components/StatsTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">TaskMate</h1>
          <p className="text-gray-600">
            Your Smart Daily To-Do List & Alarm Scheduler
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 border-b">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-medium ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 font-medium ${activeTab === 'tasks' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 font-medium ${activeTab === 'stats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Stats
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'tasks' && <TasksTab />}
          {activeTab === 'stats' && <StatsTab />}
        </div>
      </div>
    </div>
  );
}