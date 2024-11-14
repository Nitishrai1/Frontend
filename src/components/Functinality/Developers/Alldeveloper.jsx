import React, { useState, Suspense } from 'react';
import { Mail, ExternalLink } from "lucide-react"; 

const UserCard = React.lazy(() => import("./UserCard/UserCard"));

export default function UserGrid({ users }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen `} style={{backgroundColor: `rgb(242, 246,251, 1)`}}>
      <div className="container mx-auto py-8 px-4"  style={{backgroundColor: `rgb(242, 246,251, 1)`}}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-black">All Developers</h1>
          
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user, index) => (
              <UserCard key={index} user={user} />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
