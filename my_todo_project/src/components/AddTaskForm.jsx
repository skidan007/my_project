import { useState } from 'react';

export function AddTaskForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    duration: '30',
    category: 'personal',
    isRecurring: false,
    alarmEnabled: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Add New Task</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Task Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description (Optional)</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Enter task description"
            rows={2}
          />
        </div>

        <div className="border-t pt-4">
          <label className="block font-medium mb-1">Start Time</label>
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({...formData, startTime: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="health">Health</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Duration (minutes)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            className="w-full p-2 border rounded"
            min="1"
            required
          />
        </div>

        <div className="flex justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isRecurring}
              onChange={(e) => setFormData({...formData, isRecurring: e.target.checked})}
              className="h-4 w-4"
            />
            <span>Recurring daily</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.alarmEnabled}
              onChange={(e) => setFormData({...formData, alarmEnabled: e.target.checked})}
              className="h-4 w-4"
            />
            <span>Enable alarm</span>
          </label>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded"
          >
            Add Task
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}