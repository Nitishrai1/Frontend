// UserCard.jsx

const apiUrl = import.meta.env.VITE_API_URL;
const UserCard = ({user}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      <img
        src={user.image}
        alt={`${user.name}'s profile`}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h3 className="text-lg font-bold">{user.name}</h3>
      <p className="text-gray-500">{user.email}</p>
    </div>
  );
};

export default UserCard;
