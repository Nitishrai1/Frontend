'use client'

import { Mail, CheckCircle2, Circle, ListTodo, Award } from 'lucide-react'
import { useState, useEffect } from "react"

const apiUrl = import.meta.env.VITE_API_URL

export default function UserProfile({ todos, userdata }) {
  const { email, username, ImageLink } = userdata

  const totalTodos = todos.length
  const completedTodos = todos.filter(todo => todo.completed).length
  const remainingTodos = totalTodos - completedTodos

  const [badge, setBadge] = useState({ name: '', color: '' })

  useEffect(() => {
    if (completedTodos >= 50) {
      setBadge({ name: 'Diamond', color: 'text-purple-600' })
    } else if (completedTodos >= 30) {
      setBadge({ name: 'Platinum', color: 'text-gray-500' })
    } else if (completedTodos >= 10) {
      setBadge({ name: 'Gold', color: 'text-yellow-500' })
    } else if (completedTodos >= 5) {
      setBadge({ name: 'Silver', color: 'text-gray-500' })
    } else if (completedTodos > 0) {
      setBadge({ name: 'Bronze', color: 'text-orange-500' })
    }
  }, [completedTodos])

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* User Details Section */}
      <div className="md:w-1/3 bg-gradient-to-b from-green-100 to-blue-100 p-6 flex flex-col items-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
            <img
              src={ImageLink}
              alt={`${username}'s profile`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${username}&background=random`
              }}
            />
          </div>
          {badge.name && (
            <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
              <Award className={`w-6 h-6 ${badge.color}`} />
            </div>
          )}
        </div>
        <h2 className="mt-4 text-2xl font-bold text-green-700">{username}</h2>
        <div className="flex items-center mt-2 text-green-600">
          <Mail className="w-4 h-4 mr-2" />
          <span>{email}</span>
        </div>
        {badge.name && (
          <div className="mt-4 flex items-center bg-white rounded-full px-4 py-2 shadow-md">
            <Award className={`w-5 h-5 mr-2 ${badge.color}`} />
            <span className={`font-semibold ${badge.color}`}>{badge.name}</span>
          </div>
        )}
      </div>

      {/* Task Details Section */}
      <div className="md:w-2/3 p-6 flex flex-col overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 text-green-700">Task Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center justify-center p-4 bg-green-100 rounded-lg shadow">
            <ListTodo className="w-6 h-6 mb-2 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-600">Total Tasks</p>
              <p className="text-2xl font-bold text-green-800">{totalTodos}</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-blue-100 rounded-lg shadow">
            <CheckCircle2 className="w-6 h-6 mb-2 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-600">Completed</p>
              <p className="text-2xl font-bold text-blue-800">{completedTodos}</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-yellow-100 rounded-lg shadow">
            <Circle className="w-6 h-6 mb-2 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-600">Remaining</p>
              <p className="text-2xl font-bold text-yellow-800">{remainingTodos}</p>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4 text-green-700">Tasks</h3>
        <div className="flex-grow rounded-md border border-green-200 p-4 overflow-y-auto">
          {todos.length > 0 ? (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li key={todo.id} className="flex items-center">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mr-2 ${
                    todo.completed ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {todo.completed ? 'Done' : 'Pending'}
                  </span>
                  <span className="text-sm text-green-700">{todo.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-green-500">No tasks available</p>
          )}
        </div>
      </div>
    </div>
  )
}