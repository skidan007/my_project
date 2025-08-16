import { CATEGORIES } from '../constants/categories';
import { Check } from 'lucide-react';

export function TaskItem({ task, onComplete }) {
  const categoryData = CATEGORIES[task.category] || CATEGORIES.personal;

  return (
    <div
      className={`p-4 border rounded-lg flex items-center justify-between ${
        task.isCompleted
          ? 'bg-gray-100 opacity-75'
          : task.isActive
          ? 'border-blue-500 bg-blue-50'
          : 'bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`${categoryData.color} p-2 rounded-full`}>
          {/* Icon would be rendered here */}
        </div>
        <div>
          <h4 className={`font-medium ${task.isCompleted ? 'line-through' : ''}`}>
            {task.title}
          </h4>
          <p className="text-sm text-gray-600">
            {task.startTime} • {task.duration} min • {categoryData.name}
          </p>
        </div>
      </div>
      {!task.isCompleted && (
        <button
          onClick={() => onComplete(task.id)}
          className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
        >
          <Check size={16} /> Complete
        </button>
      )}
    </div>
  );
}