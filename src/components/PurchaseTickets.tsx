
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export const PurchaseTickets = ({
  isActive,
  setTicketCount,
}: {
  isActive: boolean;
  setTicketCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixTimer, setPixTimer] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const PIX_TIMEOUT = 300000; // 5 minutes in milliseconds

  // Card Number Validation (Luhn Algorithm)
  const validateCardNumber = (cardNumber: string) => {
    const regex = /^[0-9]{13,19}$/;
    if (!regex.test(cardNumber)) return false;

    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  // Handle Pix Timer
  const initiatePixPayment = () => {
    if (pixTimer) {
      clearTimeout(pixTimer); // Clear any existing timer
    }

    const timer = setTimeout(() => {
      toast({
        title: "Error",
        description: "Pix payment expired. Please try again.",
        variant: "destructive",
      });
      setShowPaymentDialog(false);
    }, PIX_TIMEOUT);

    setPixTimer(timer); // Store the timer
  };

  // Handle payment submission
  const handlePaymentSubmit = () => {
    if (paymentMethod === "credit" || paymentMethod === "debit") {
      if (!validateCardNumber(cardNumber)) {
        toast({
          title: "Error",
          description: "Invalid card number. Please check and try again.",
          variant: "destructive",
        });
        return;
      }
      if (!expirationDate || !cvv) {
        toast({
          title: "Error",
          description: "Please provide all card details.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsProcessing(true);
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Payment completed successfully!",
      });
      setIsProcessing(false);
      setShowPaymentDialog(false);
      setTicketCount((prev) => prev + quantity);
    }, 2000);
  };

  const handlePurchase = () => {
    if (!isActive) {
      toast({
        title: "Error",
        description: "You are inactive, cannot make a purchase.",
        variant: "destructive",
      });
      return;
    }
    setShowPaymentMethodDialog(true);
  };

  const handleSelectPaymentMethod = () => {
    if (!paymentMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method.",
        variant: "destructive",
      });
      return;
    }
    setShowPaymentMethodDialog(false);
    setShowPaymentDialog(true);
    if (paymentMethod === "pix") {
      initiatePixPayment(); // Start Pix payment timer
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={isMobile ? '' : 'max-w-md mx-auto'}>
        <div className={isMobile ? '' : 'mb-4'}>
          <Label htmlFor="quantity" className={`block mb-2 ${!isMobile && 'text-lg'}`}>Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className={`w-full ${!isMobile && 'h-12 text-lg'}`}
          />
        </div>

        <div className={`flex justify-end mt-4 ${!isMobile && 'mt-6'}`}>
          <Button
            onClick={handlePurchase}
            disabled={!isActive}
            className={`bg-primary hover:bg-primary/90 ${!isMobile && 'text-lg px-6 py-6 h-auto'}`}
          >
            Purchase Tickets
          </Button>
        </div>
      </div>

      {/* Modal de Seleção de Método de Pagamento */}
      <Dialog
        open={showPaymentMethodDialog}
        onOpenChange={setShowPaymentMethodDialog}
      >
        <DialogContent className={isMobile ? "sm:max-w-md" : "sm:max-w-xl"}>
          <DialogHeader>
            <DialogTitle className={!isMobile ? "text-2xl" : ""}>Select Payment Method</DialogTitle>
          </DialogHeader>
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
            onClick={handleSelectPaymentMethod} 
            className={`mt-4 w-full ${!isMobile && 'text-lg py-6 h-auto'}`}
          >
            Confirm Payment Method
          </Button>
        </DialogContent>
      </Dialog>

      {/* Modal de Pagamento Completo */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className={isMobile ? "sm:max-w-md" : "sm:max-w-xl"}>
          <DialogHeader>
            <DialogTitle className={!isMobile ? "text-2xl" : ""}>Complete Payment</DialogTitle>
            <DialogDescription className={!isMobile ? "text-lg" : ""}>
              Select a payment method and complete your purchase.
            </DialogDescription>
          </DialogHeader>

          {paymentMethod === "credit" || paymentMethod === "debit" ? (
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
            </motion.div>
          ) : paymentMethod === "pix" ? (
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
            </motion.div>
          ) : null}

          <Button
            onClick={handlePaymentSubmit}
            disabled={isProcessing}
            className={`mt-4 w-full ${!isMobile && 'text-lg py-6 h-auto'}`}
          >
            {isProcessing ? "Processing..." : "Complete Payment"}
          </Button>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
