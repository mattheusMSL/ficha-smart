import { StudentProfile } from "@/components/StudentProfile";
import { TicketCard } from "@/components/TicketCard";
import { PurchaseTickets } from "@/components/PurchaseTickets";
import { UserProfile } from "@/components/UserProfile";
import { motion } from "framer-motion";

const Index = () => {
  // Mock data - would come from API in real app
  const studentData = {
    name: "João Silva",
    ra: "RA123456",
    tickets: 5,
    lastPurchase: "2024-02-20",
  };

  const userData = {
    username: "João Silva",
    email: "joao.silva@example.com",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            University Restaurant
          </h1>
          <p className="text-sm text-gray-500">
            Manage your meal tickets digitally
          </p>
        </motion.div>

        <UserProfile 
          username={userData.username} 
          email={userData.email} 
        />
        
        <StudentProfile name={studentData.name} ra={studentData.ra} />
        
        <TicketCard 
          count={studentData.tickets} 
          lastPurchase={studentData.lastPurchase} 
        />

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Purchase Tickets
          </h2>
          <PurchaseTickets />
        </div>
      </div>
    </div>
  );
};

export default Index;