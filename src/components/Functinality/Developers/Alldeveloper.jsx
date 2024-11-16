import React, { useState, Suspense } from 'react';
import { Mail, ExternalLink } from 'lucide-react'; 

const UserCard = React.lazy(() => import("./UserCard/UserCard"));

export default function UserGrid({ users }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100">
      <div className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 shadow-md z-10">
        <div className="container mx-auto py-4 px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-green-700">All Developers</h1>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search developers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 mt-24">
        <Suspense fallback={<div className="text-center text-green-700">Loading...</div>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredUsers.map((user, index) => (
              <UserCard key={index} user={user} />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}