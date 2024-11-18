'use client'

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

export default function Edittask({ setTodos}) {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = location.state || {}
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  const goBack = () => {
    navigate("/homepage")
  }

  const handleUpdateTask = async () => {
    setError("")
    const token = localStorage.getItem("token")

    if (!token) {
      setError("User not authenticated. Please log in again.")
      return
    }

    try {
      const response = await fetch(`${apiUrl}/user/updateTask`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: id,
          title: title,
          description: description,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        setTodos(data.updatedTask)
        setIsEditTaskOpen(false)
      } else {
        setError(`Error updating task: ${data.msg}`)
      }
    } catch (error) {
      setError(`Error updating task: ${error.message}`)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md mx-auto p-6 flex flex-col">
        <button
          onClick={goBack}
          className="mb-6 px-4 py-2 text-green-700 border border-green-500 rounded-md hover:bg-green-50 transition-colors duration-300"
        >
          Back
        </button>

        <h2 className="text-2xl font-bold text-green-700 mb-6">Edit Task</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-4 flex-grow flex flex-col">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-green-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex-grow">
            <label htmlFor="description" className="block text-sm font-medium text-green-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter description"
              className="w-full h-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 resize-none"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
            onClick={handleUpdateTask}
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  )
}