export default function TaskCompletedTime({ todos }) {
    return (
      <div className="todo-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-2 overflow-y-auto h-[520px] scroll-container">
        {todos.map((todo) => (
          <div
            key={todo.id} // Ensures each item has a unique key
            className="bg-white shadow-lg rounded-3xl p-6 my-4 mx-2 transition-transform transform hover:scale-105 border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-1">{todo.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{todo.description}</p>
            <p className="text-sm text-blue-500 mb-2">{todo.startDate}</p>
            <p className="text-sm text-blue-500 mb-2">
              {todo.endDate ? todo.endDate : "In Progress"}
            </p>
          </div>
        ))}
      </div>
    );
  }
  
