'use client'

import  { useState } from 'react'
import { Calendar } from "../ui/Calender"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"

export default function Component({ todos = [] }) {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const filteredTodos = todos.filter(todo => {
    const todoDate = new Date(todo.startDate)
    return todoDate.toDateString() === selectedDate.toDateString()
  })

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="flex-grow space-y-6 md:w-2/3">
        <h2 className="text-2xl font-bold text-green-700">Tasks for {selectedDate.toDateString()}</h2>
        {filteredTodos.length === 0 ? (
          <Card>
            <Card.Content>
              <p className="text-center text-gray-500">No tasks for this date</p>
            </Card.Content>
          </Card>
        ) : (
          filteredTodos.map((todo) => (
            <Card key={todo.id} className="hover:shadow-lg transition-shadow duration-300">
              <Card.Header>
                <Card.Title>{todo.title}</Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="text-gray-600 mb-4">{todo.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Start: {todo.startDate}</Badge>
                  <Badge variant={todo.endDate ? "success" : "warning"}>
                    {todo.endDate ? `End: ${todo.endDate}` : "In Progress"}
                  </Badge>
                </div>
              </Card.Content>
            </Card>
          ))
        )}
      </div>
      <div className="md:w-1/3">
        <Card>
          <Card.Header>
            <Card.Title>Select Date</Card.Title>
          </Card.Header>
          <Card.Content>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date || new Date())}
              className="rounded-md border"
            />
          </Card.Content>
        </Card>
      </div>
    </div>
  )
}