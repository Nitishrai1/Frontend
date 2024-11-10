// UserCard.jsx
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, ExternalLink } from "lucide-react"
const UserCard = ({ user }) => {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-lg dark:bg-gray-800">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={user.imageLink} alt={`${user.userName}'s profile`} />
            <AvatarFallback>{user.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold mb-1">{user.userName}</h3>
          <p className="text-sm text-muted-foreground mb-4">{user.userEmail}</p>
          <div className="flex space-x-4">
            <a href={`mailto:${user.userEmail}`} className="text-blue-500 hover:text-blue-600 transition-colors" aria-label={`Email ${user.userName}`}>
              <Mail size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors" aria-label={`View ${user.userName}'s profile`}>
              <ExternalLink size={20} />
            </a>
          </div>
        </CardContent>
      </Card>
    )
  }
export default UserCard;
