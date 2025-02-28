
import { useState } from "react";
import { StudentProfile } from "@/components/StudentProfile";
import { TicketCard } from "@/components/TicketCard";
import { PurchaseTickets } from "@/components/PurchaseTickets";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  // Mock data - would come from API in real app
  const studentData = {
    name: "João Da Silva",
    ra: "98123456",
    tickets: 0,
    lastPurchase: "2024-02-20",
    action: true, // Active status
  };

  const [ticketCount, setTicketCount] = useState(studentData.tickets);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`mx-auto p-4 ${isMobile ? 'max-w-lg' : 'max-w-6xl'}`}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`${!isMobile && 'text-center mb-8'}`}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-1 md:text-3xl lg:text-4xl">
            University Restaurant
          </h1>
          <p className="text-sm text-gray-500 md:text-base">
            Manage your meal tickets digitally
          </p>
        </motion.div>
        
        {isMobile ? (
          <div className="space-y-6">
            <StudentProfile name={studentData.name} ra={studentData.ra} />

            <TicketCard
              count={ticketCount}
              lastPurchase={studentData.lastPurchase}
              active={studentData.action}
            />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Purchase Tickets
              </h2>
              <PurchaseTickets
                isActive={studentData.action}
                setTicketCount={setTicketCount}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-6">
              <StudentProfile name={studentData.name} ra={studentData.ra} />
              
              <TicketCard
                count={ticketCount}
                lastPurchase={studentData.lastPurchase}
                active={studentData.action}
              />
            </div>
            
            <div className="lg:col-span-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Purchase Tickets
                </h2>
                <PurchaseTickets
                  isActive={studentData.action}
                  setTicketCount={setTicketCount}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
