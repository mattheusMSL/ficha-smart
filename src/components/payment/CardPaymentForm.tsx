
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface CardPaymentFormProps {
  cardNumber: string;
  setCardNumber: React.Dispatch<React.SetStateAction<string>>;
  expirationDate: string;
  setExpirationDate: React.Dispatch<React.SetStateAction<string>>;
  cvv: string;
  setCvv: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  isProcessing: boolean;
}

export const CardPaymentForm = ({
  cardNumber,
  setCardNumber,
  expirationDate,
  setExpirationDate,
  cvv,
  setCvv,
  onSubmit,
  isProcessing,
}: CardPaymentFormProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        className={`w-full mb-4 ${!isMobile && 'h-12 text-lg'}`}
      />
      <div className="flex space-x-4 mt-4">
        <Input
          type="text"
          placeholder="Expiration Date (MM/YY)"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className={!isMobile ? "h-12 text-lg" : ""}
        />
        <Input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className={!isMobile ? "h-12 text-lg" : ""}
        />
      </div>
      <Button
        onClick={onSubmit}
        disabled={isProcessing}
        className={`mt-4 w-full ${!isMobile && 'text-lg py-6 h-auto'}`}
      >
        {isProcessing ? "Processing..." : "Complete Payment"}
      </Button>
    </motion.div>
  );
};
