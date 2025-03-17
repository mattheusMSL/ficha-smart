
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

interface PixPaymentViewProps {
  onSubmit: () => void;
  isProcessing: boolean;
}

export const PixPaymentView = ({ onSubmit, isProcessing }: PixPaymentViewProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <span className={`flex justify-center items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 ${!isMobile && 'p-6'}`}>
        <QRCode 
          value="https://www.example.com/pix-payment" 
          size={isMobile ? 180 : 240}
        />
      </span>
      <p className={`text-gray-500 mt-2 ${!isMobile && 'text-lg mt-4'}`}>
        Scan the QR code to complete your payment.
      </p>
      <p className={`text-gray-400 mt-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
        Payment expires in 5 minutes
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
