import { Mail, ExternalLink } from "lucide-react";

const UserCard = ({ user }) => {
  return (
    <div className="overflow-hidden transition-all hover:shadow-lg dark:bg-gray-800 p-6 flex flex-col items-center text-center rounded-lg border border-gray-300">
      
      <div className="w-24 h-24 mb-4 bg-gray-200 rounded-full flex justify-center items-center">
        {user.imageLink ? (
          <img
            src={user.imageLink}
            alt={`${user.userName}'s profile`}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-xl text-white">
            {(user.userName || 'NA')
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </span>
        )}
      </div>

     
      <h3 className="text-xl font-semibold mb-1">{user.userName}</h3>
      <p className="text-sm text-muted-foreground mb-4">{user.userEmail}</p>

     
      <div className="flex space-x-4">
        <a
          href={`mailto:${user.userEmail}`}
          className="text-blue-500 hover:text-blue-600 transition-colors"
          aria-label={`Email ${user.userName}`}
        >
          <Mail size={20} />
        </a>
        <a
          href={user.imageLink || '#'}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label={`View ${user.userName}'s profile`}
        >
          <ExternalLink size={20} />
        </a>
      </div>
    </div>
  );
};

export default UserCard;
