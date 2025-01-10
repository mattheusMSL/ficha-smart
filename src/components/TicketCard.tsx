import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface TicketCardProps {
  count: number;
  lastPurchase?: string;
}

export const TicketCard = ({ count, lastPurchase }: TicketCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 bg-white shadow-lg rounded-lg border border-gray-100">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Available Tickets</span>
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
              Active
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold">{count}</span>
            <span className="text-gray-500">tickets</span>
          </div>
          {lastPurchase && (
            <div className="text-xs text-gray-500">
              Last purchase: {lastPurchase}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};