export default function TaskCompletedTime({ todos }) {
  // Check if todos is undefined or null, if so, provide an empty array as a fallback
  const safeTotos = todos || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 p-6 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {safeTotos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-lg text-green-600">No todos available</p>
          </div>
        ) : (
          safeTotos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex-grow space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-green-700 line-clamp-1">{todo.title}</h3>
                  <p className="text-sm text-green-600 line-clamp-2">{todo.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm w-full sm:w-auto">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center justify-between sm:flex-col sm:items-start">
                    <span className="font-medium mr-2 sm:mr-0">Start</span>
                    <span>{todo.startDate}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full flex items-center justify-between sm:flex-col sm:items-start ${
                    todo.endDate ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    <span className="font-medium mr-2 sm:mr-0">End</span>
                    <span>{todo.endDate || "In Progress"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}