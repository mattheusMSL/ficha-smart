
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface TicketCardProps {
  count: number;
  lastPurchase?: string;
  active: boolean;
}

export const TicketCard = ({
  count,
  lastPurchase,
  active,
}: TicketCardProps) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Card className={`bg-white shadow-lg rounded-lg border border-gray-100 ${isMobile ? 'p-6' : 'p-8'}`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className={`font-medium text-gray-500 ${isMobile ? 'text-sm' : 'text-base'}`}>
              Available Tickets
            </span>
            <span
              className={`px-2 py-1 rounded-full ${
                active 
                  ? "bg-green-100 text-primary" 
                  : "bg-red-100 text-red-700"
              } ${isMobile ? 'text-xs' : 'text-sm'}`}
            >
              {active ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className={`font-bold ${isMobile ? 'text-4xl' : 'text-5xl'}`}>{count}</span>
            <span className={`text-gray-500 ${isMobile ? '' : 'text-lg'}`}>tickets</span>
          </div>
          {lastPurchase && (
            <div className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              Last purchase: {lastPurchase}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
