export function TaskList({ tasks }) {
  return (
    <div>
      <h3 className="font-medium mb-2">All Tasks</h3>
      {tasks.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No tasks yet. Add your first task above.
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-3 border rounded flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-gray-600">
                  {task.startTime} • {task.category}
                </p>
              </div>
              <button className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                Complete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
