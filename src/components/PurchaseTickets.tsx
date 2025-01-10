import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export const PurchaseTickets = () => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: "Purchase Successful",
      description: `You have purchased ${quantity} tickets`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Number of Tickets
        </label>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="w-full"
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Total: R$ {(quantity * 3.5).toFixed(2)}
        </span>
        <Button onClick={handlePurchase} className="bg-primary hover:bg-primary/90">
          Purchase Tickets
        </Button>
      </div>
    </motion.div>
  );
};