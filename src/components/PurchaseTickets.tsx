
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { validateCardNumber, PIX_TIMEOUT } from "@/utils/paymentUtils";
import { PaymentMethodSelector } from "@/components/payment/PaymentMethodSelector";
import { CardPaymentForm } from "@/components/payment/CardPaymentForm";
import { PixPaymentView } from "@/components/payment/PixPaymentView";
import { StripeWrapper } from "@/components/payment/StripeWrapper";

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
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const ticketPrice = 25; // Base price per ticket in currency units

  // Handle payment submission
  const handlePaymentSubmit = () => {
    if (paymentMethod === "credit" || paymentMethod === "debit") {
      if (!validateCardNumber(cardNumber.replace(/\s/g, ''))) {
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
      
      // Reset form fields
      setCardNumber("");
      setExpirationDate("");
      setCvv("");
      setPaymentMethod("");
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
  };

  // Calculate total amount
  const totalAmount = quantity * ticketPrice;

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

        <div className="mt-4">
          <p className={`font-medium ${!isMobile && 'text-lg'}`}>
            Total: ${totalAmount.toFixed(2)}
          </p>
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

      {/* Payment Method Selection Dialog */}
      <Dialog
        open={showPaymentMethodDialog}
        onOpenChange={setShowPaymentMethodDialog}
      >
        <DialogContent className={isMobile ? "sm:max-w-md" : "sm:max-w-xl"}>
          <DialogHeader>
            <DialogTitle className={!isMobile ? "text-2xl" : ""}>Select Payment Method</DialogTitle>
          </DialogHeader>
          <PaymentMethodSelector 
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onConfirm={handleSelectPaymentMethod}
            onOpenChange={setShowPaymentMethodDialog}
          />
        </DialogContent>
      </Dialog>

      {/* Payment Details Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className={isMobile ? "sm:max-w-md" : "sm:max-w-xl"}>
          <DialogHeader>
            <DialogTitle className={!isMobile ? "text-2xl" : ""}>Complete Payment</DialogTitle>
            <DialogDescription className={!isMobile ? "text-lg" : ""}>
              Total: ${totalAmount.toFixed(2)}
            </DialogDescription>
          </DialogHeader>

          <StripeWrapper>
            {(paymentMethod === "credit" || paymentMethod === "debit") ? (
              <CardPaymentForm
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                expirationDate={expirationDate}
                setExpirationDate={setExpirationDate}
                cvv={cvv}
                setCvv={setCvv}
                onSubmit={handlePaymentSubmit}
                isProcessing={isProcessing}
                paymentMethod={paymentMethod}
                amount={totalAmount}
              />
            ) : paymentMethod === "pix" ? (
              <PixPaymentView
                onSubmit={handlePaymentSubmit}
                isProcessing={isProcessing}
                amount={totalAmount}
              />
            ) : null}
          </StripeWrapper>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
