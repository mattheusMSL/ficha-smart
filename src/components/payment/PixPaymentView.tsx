
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { createPaymentIntent } from "@/utils/stripeUtils";
import { useToast } from "@/hooks/use-toast";
import { PIX_TIMEOUT } from "@/utils/paymentUtils";

interface PixPaymentViewProps {
  onSubmit: () => void;
  isProcessing: boolean;
  amount: number;
}

export const PixPaymentView = ({ 
  onSubmit, 
  isProcessing,
  amount 
}: PixPaymentViewProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [qrCodeValue, setQrCodeValue] = useState("https://www.example.com/pix-payment");
  const [timeRemaining, setTimeRemaining] = useState(PIX_TIMEOUT / 1000); // Convert to seconds

  // Create payment intent when component mounts
  useEffect(() => {
    const getPixPaymentData = async () => {
      try {
        const { clientSecret } = await createPaymentIntent(amount, "pix");
        // In a real implementation, we would get a proper QR code value from the backend
        setQrCodeValue(`https://example.com/pix-payment/${clientSecret}`);
      } catch (error) {
        console.error("Error creating PIX payment:", error);
        toast({
          title: "Error",
          description: "Could not initialize PIX payment. Please try again.",
          variant: "destructive",
        });
      }
    };

    getPixPaymentData();
  }, [amount, toast]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast({
            title: "Error",
            description: "PIX payment expired. Please try again.",
            variant: "destructive",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [toast]);

  // Format remaining time
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <span className={`flex justify-center items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 ${!isMobile && 'p-6'}`}>
        <QRCode 
          value={qrCodeValue} 
          size={isMobile ? 180 : 240}
        />
      </span>
      <p className={`text-gray-500 mt-2 ${!isMobile && 'text-lg mt-4'}`}>
        Scan the QR code to complete your payment.
      </p>
      <p className={`text-gray-400 mt-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
        Payment expires in {formatTime(timeRemaining)}
      </p>
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
