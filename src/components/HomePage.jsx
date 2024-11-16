'use client'

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LeftSidebar from "./SidebarCom/LeftSidebar"
import NavBar from "./DashboardSec/NavBar"
import Todo from "./Cards/Todo"
import RightSideBar from "./SidebarCom/RightSideCom"
import Createtask from "./Functinality/Newtask"

export default function HomePage({
  todos = [],
  isAuthenticated = false,
  setAuthenticated = () => {},
  setTodos = () => {},
  userdata = {},
  setUserdata = () => {},
}) {
  const [searchquery, setSearchquery] = useState("")
  const [filteredTodos, setFilteredTodos] = useState(todos)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isAddtaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskAdded,setTaskAdded]=useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginMessageShown = localStorage.getItem("loginMessageShown")
    if (!loginMessageShown) {
      setIsSuccess(true)
      localStorage.setItem("loginMessageShown", "true")
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 3000)
      const timer2=setTimeout(()=>taskAdded(false),3000);

      return () => {
        clearTimeout(timer)
        clearTimeout(timer2)
      }
    }
  }, [isSuccess,taskAdded])

  useEffect(() => {
    const results = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchquery.toLowerCase())
    )
    setFilteredTodos(results)
  }, [searchquery, todos])

  const addProject = () => setIsAddTaskOpen(!isAddtaskOpen)

  const updateStatus = (status) => {
    setFilteredTodos(todos.filter((todo) => todo.status === status))
  }

  return (
    <div className="flex bg-gradient-to-b from-green-100 to-blue-100 min-h-screen border-box relative">
      <LeftSidebar
        isAuthenticated={isAuthenticated}
        setAuthenticated={setAuthenticated}
        setFilteredTodos={setFilteredTodos}
        setUserdata={setUserdata}
      />

      {isSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50 transition transform ease-in-out duration-300">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline ml-2">Login successful.</span>
        </div>
      )}
      {taskAdded && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50 transition transform ease-in-out duration-300">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline ml-2">Task added successful.</span>
        </div>
      )}

      <div className="flex-1">
        <NavBar
          searchquery={searchquery}
          setSearchquery={setSearchquery}
          filteredTodos={filteredTodos}
          setFilteredTodos={setFilteredTodos}
          userdata={userdata}
        />

        <div className="flex flex-col lg:flex-row gap-4 p-5">
          <div className="flex-1 p-2 rounded-lg bg-white h-[650px] w-full lg:w-[800px] overflow-hidden shadow-md">
            <div className="flex justify-between p-2">
              <div className="text-lg font-semibold text-green-700">
                Projects
              </div>
              <button
                onClick={addProject}
                className="bg-green-600 hover:bg-green-700 rounded-md h-10 px-4 w-36 text-white transition-colors duration-300"
              >
                Add Task
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-2">
              {["started", "ongoing", "completed"].map((status) => (
                <div className="flex justify-between items-center" key={status}>
                  <div className="text-green-700 capitalize">{status}</div>
                  <button
                    onClick={() => updateStatus(status)}
                    className="text-lg bg-green-100 w-8 h-8 rounded-full text-green-700 hover:bg-green-200 transition-colors duration-300"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>

            <div className="todo-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-2 overflow-y-auto h-[520px] scroll-container mt-4">
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <Todo key={todo.id} todo={todo} setTodos={setTodos} />
                ))
              ) : (
                <div className="col-span-full text-center text-green-700">
                  <h2>Task Not Found</h2>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/4 w-full">
            <RightSideBar todos={todos} />
          </div>
        </div>
      </div>

      {isAddtaskOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 w-[90%] h-[90%] max-w-2xl max-h-[800px]">
            <Createtask setTodos={setTodos} setIsAddTaskOpen={setIsAddTaskOpen} setTaskAdded={setTaskAdded} />
          </div>
        </div>
      )}
    </div>
  )
}