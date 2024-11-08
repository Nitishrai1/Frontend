export default function TaskCompletedTime({ todos }) {
    return (
      <div className="todo-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mx-4 overflow-y-auto h-[520px] bg-gray-50 rounded-lg shadow-inner scroll-container">
        {todos.map((todo) => (
          <div
            key={todo.id} 
            className="bg-white shadow-md rounded-xl p-5 transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold mb-2 text-blue-800">{todo.title}</h3>
              <p className="text-sm text-blue-600 mb-4">{todo.description}</p>
            </div>
            <div className="mt-4">
              <p className="text-xs text-blue-400">
                <span className="font-medium">Start:</span> {todo.startDate}
              </p>
              <p className="text-xs text-blue-400">
                <span className="font-medium">End:</span> {todo.endDate ? todo.endDate : "In Progress"}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  