
import React, { useEffect, useState } from 'react';
import UserCard from './UserCard/UserCard';

const UserGrid = (users) => {

   
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
};

export default UserGrid;
