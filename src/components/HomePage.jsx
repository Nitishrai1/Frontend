import { useEffect, useState } from "react";
import LeftSidebar from "./SidebarCom/LeftSidebar";
import NavBar from "./DashboardSec/NavBar";
import Todo from "./Cards/Todo";
import RightSideBar from "./SidebarCom/RightSideCom";
import { useNavigate } from "react-router-dom";

export default function HomePage({
  todos,
  isAuthenticated,
  setAuthenticated,
  setTodos,
  userdata,
  setUserdata,
}) {
  const [searchquery, setSearchquery] = useState("");
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [isSuccess, setIsSuccess] = useState(true);
  const navigate = useNavigate();

  // Filter todos based on the search query
  useEffect(() => {
    const results = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchquery.toLowerCase())
    );
    setFilteredTodos(results);
  }, [searchquery, todos]);

  // Display success message temporarily
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  // Navigation to Add Task page
  function addProject() {
    navigate("/createNewTask");
  }

  // Update filtered todos based on status
  function updateStatus(status) {
    setFilteredTodos(todos.filter((todo) => todo.status === status));
  }

  return (
    <div className="flex bg-[#f2f6fe] min-h-screen border-box">
      {/* Left Sidebar */}
      <LeftSidebar
        isAuthenticated={isAuthenticated}
        setAuthenticated={setAuthenticated}
        setFilteredTodos={setFilteredTodos}
        setUserdata={setUserdata}
      />

      {/* Success Message */}
      {isSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50 transition transform ease-in-out duration-300">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline ml-2">Login successful.</span>
        </div>
      )}

      <div className="flex-1">
        {/* Navigation Bar */}
        <NavBar
          searchquery={searchquery}
          setSearchquery={setSearchquery}
          filteredTodos={filteredTodos}
          setFilteredTodos={setFilteredTodos}
          userdata={userdata}
        />

        <div className="flex poppins-medium flex-col lg:flex-row gap-4 p-5">
          {/* Main Content Area */}
          <div className="flex-1 p-2 poppins-light rounded-3xl bg-white h-[650px] w-full lg:w-[800px] overflow-hidden">
            <div className="flex justify-between p-2">
              <div className="poppins-regular text-lg">
                <b>Project</b>
              </div>
              <button
                onClick={addProject}
                className="bg-[#744be4] rounded-3xl h-10 px-4 w-36 text-white"
              >
                Add Task
              </button>
            </div>

            {/* Status Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-2 poppins-medium">
              {["started", "ongoing", "completed"].map((status) => (
                <div className="flex justify-between" key={status}>
                  <div>{status.charAt(0).toUpperCase() + status.slice(1)}</div>
                  <button
                    onClick={() => updateStatus(status)}
                    className="text-lg"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>

            {/* Todo List */}
            <div className="todo-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-2 overflow-y-auto h-[520px] scroll-container">
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <Todo key={todo.id} todo={todo} setTodos={setTodos} />
                ))
              ) : (
                <div className="col-span-full text-center">
                  <h2>Task Not Found</h2>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/4 w-full">
            <RightSideBar todos={todos} />
          </div>
        </div>
      </div>
    </div>
  );
}
