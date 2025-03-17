
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { 
  formatCardNumber, 
  formatExpirationDate,
  validateExpirationDate,
  validateCVV
} from "@/utils/paymentUtils";
import { useToast } from "@/hooks/use-toast";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { createPaymentIntent } from "@/utils/stripeUtils";

interface CardPaymentFormProps {
  cardNumber: string;
  setCardNumber: React.Dispatch<React.SetStateAction<string>>;
  expirationDate: string;
  setExpirationDate: React.Dispatch<React.SetStateAction<string>>;
  cvv: string;
  setCvv: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  isProcessing: boolean;
  paymentMethod: string;
  amount: number;
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
  paymentMethod,
  amount
}: CardPaymentFormProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Handle card number input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  // Handle expiration date input
  const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpirationDate(e.target.value);
    setExpirationDate(formattedValue);
  };

  // Create payment intent when the component mounts
  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const { clientSecret } = await createPaymentIntent(amount, paymentMethod);
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        toast({
          title: "Error",
          description: "Could not initialize payment. Please try again.",
          variant: "destructive",
        });
      }
    };

    getClientSecret();
  }, [amount, paymentMethod, toast]);

  // Handle form submission with Stripe
  const handleStripeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements || !clientSecret) {
      toast({
        title: "Error",
        description: "Payment processing is not ready. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Validate inputs
    if (!validateExpirationDate(expirationDate)) {
      toast({
        title: "Error",
        description: "Invalid expiration date.",
        variant: "destructive",
      });
      return;
    }

    if (!validateCVV(cvv)) {
      toast({
        title: "Error",
        description: "Invalid CVV code.",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, you would use the Stripe Elements
    // Here we're just calling the onSubmit handler from the parent
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleStripeSubmit}>
        <Input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={handleCardNumberChange}
          className={`w-full mb-4 ${!isMobile && 'h-12 text-lg'}`}
          maxLength={19}
        />
        <div className="flex space-x-4 mt-4">
          <Input
            type="text"
            placeholder="Expiration Date (MM/YY)"
            value={expirationDate}
            onChange={handleExpirationDateChange}
            className={!isMobile ? "h-12 text-lg" : ""}
            maxLength={5}
          />
          <Input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/[^\d]/g, '').substring(0, 4))}
            className={!isMobile ? "h-12 text-lg" : ""}
            maxLength={4}
          />
        </div>
        
        {/* This is where the Stripe CardElement would go in a full implementation */}
        <div className="hidden">
          <CardElement />
        </div>
        
        <Button
          type="submit"
          disabled={isProcessing}
          className={`mt-4 w-full ${!isMobile && 'text-lg py-6 h-auto'}`}
        >
          {isProcessing ? "Processing..." : "Complete Payment"}
        </Button>
      </form>
    </motion.div>
  );
};
