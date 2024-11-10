
import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

const UserGrid = () => {

    const [users,setUserData]=useState([]);

    useEffect(()=>{
        fetchUserData();

    },[])


    async function fetchUserData(){
        try{
            const response=await fetch(`${apiUrl}/user/Search/allUser`,{
                method:'GET',
            })
            const data= await response.json();
            setUserData(data);
            console.log("User data fetch for the all developer comp");
        }catch(err){
            console.log("Error in fetching all developer data");

        }


    }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
};

export default UserGrid;
