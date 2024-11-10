

import { useState } from 'react'

import { Switch } from "@/components/ui/switch"
const UserCard=import("./UserCard/UserCard")

// UserCard component


// UserGrid component
const UserGrid = ({ users }) => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="container mx-auto py-8 px-4 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white">Our Team</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground dark:text-gray-400">Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Example usage
const users = [
  { userName: "Alice Johnson", userEmail: "alice@example.com", imageLink: "/placeholder.svg?height=100&width=100" },
  { userName: "Bob Smith", userEmail: "bob@example.com", imageLink: "/placeholder.svg?height=100&width=100" },
  { userName: "Charlie Brown", userEmail: "charlie@example.com", imageLink: "/placeholder.svg?height=100&width=100" },
  { userName: "Diana Ross", userEmail: "diana@example.com", imageLink: "/placeholder.svg?height=100&width=100" },
]

export default function Component() {
  return <UserGrid users={users} />
}