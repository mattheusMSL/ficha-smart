import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface UserProfileProps {
  username: string;
  email: string;
  avatarUrl?: string;
}

export const UserProfile = ({ username, email, avatarUrl }: UserProfileProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 bg-white shadow-sm border border-[#004d7a]/10">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback className="bg-[#004d7a]/10 text-[#004d7a]">
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold text-[#333333]">{username}</h2>
            <p className="text-sm text-[#333333]/70">{email}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};