
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

export const PaymentMethodSelector = ({
  paymentMethod,
  setPaymentMethod,
  onConfirm,
  onOpenChange,
}: PaymentMethodSelectorProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <RadioGroup
        value={paymentMethod}
        onValueChange={setPaymentMethod}
        className="space-y-2 mt-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="credit" id="credit" className={!isMobile ? "h-5 w-5" : ""} />
          <Label htmlFor="credit" className={!isMobile ? "text-lg" : ""}>Credit Card</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="debit" id="debit" className={!isMobile ? "h-5 w-5" : ""} />
          <Label htmlFor="debit" className={!isMobile ? "text-lg" : ""}>Debit Card</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="pix" id="pix" className={!isMobile ? "h-5 w-5" : ""} />
          <Label htmlFor="pix" className={!isMobile ? "text-lg" : ""}>PIX</Label>
        </div>
      </RadioGroup>
      <Button 
        onClick={onConfirm} 
        className={`mt-4 w-full ${!isMobile && 'text-lg py-6 h-auto'}`}
      >
        Confirm Payment Method
      </Button>
    </motion.div>
  );
};
