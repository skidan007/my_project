import { TaskList } from './TaskList';
import { AddTaskForm } from './AddTaskForm';

export function TasksTab() {
  // In a real app, you would get tasks from state/context
  const tasks = [];

  return (
    <div className="space-y-6">
      <AddTaskForm />
      <TaskList tasks={tasks} />
    </div>
  );
}