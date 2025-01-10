import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const PurchaseTickets = () => {
  const [quantity, setQuantity] = useState(1);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { toast } = useToast();

  const handlePurchase = () => {
    setShowPaymentDialog(true);
  };

  const handlePaymentSubmit = () => {
    if (!paymentMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    // Here you would integrate with your payment processing system
    toast({
      title: "Purchase Successful",
      description: `You have purchased ${quantity} tickets using ${paymentMethod}`,
    });
    setShowPaymentDialog(false);
  };

  return (
    <>
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

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Payment Method</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit">Credit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="debit" id="debit" />
                <Label htmlFor="debit">Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pix" id="pix" />
                <Label htmlFor="pix">PIX</Label>
              </div>
            </RadioGroup>
            <div className="flex justify-end">
              <Button onClick={handlePaymentSubmit}>
                Confirm Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};