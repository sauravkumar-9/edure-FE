import { useState } from "react";
import { ArrowRight, IndianRupee } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const paymentOptions = [
  { id: "card", label: "Credit / Debit Card" },
  { id: "netbanking", label: "Net Banking" },
  { id: "upi", label: "UPI (Google Pay / PhonePe / BHIM)" },
  { id: "wallet", label: "Wallet (Paytm, PhonePe)" },
];

export function PaymentPage({ onComplete }: { onComplete: () => void }) {
  const [method, setMethod] = useState("card");
  const [showDialog, setShowDialog] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const selectedMethodLabel =
    paymentOptions.find((opt) => opt.id === method)?.label || "";

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      setShowDialog(false);
      onComplete();
    }, 1500);
  };

  return (
    <>
      <div className="w-full bg-white px-4 py-8 md:px-8 flex justify-center">
        <div className="w-full max-w-4xl flex flex-col space-y-10">
          {/* Page Title */}
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">
              Payment Details
            </h1>
            <p className="text-muted-foreground text-sm">
              Choose a payment method and review your exam fee.
            </p>
          </div>

          {/* Payment Methods */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Select a Payment Method
            </h2>
            <RadioGroup
              value={method}
              onValueChange={setMethod}
              className="space-y-3"
            >
              {paymentOptions.map(({ id, label }) => (
                <div
                  key={id}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <RadioGroupItem value={id} id={id} />
                  <Label htmlFor={id} className="text-sm text-gray-700">
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </section>

          {/* Fee Summary */}
          <section className="pt-2 border-t">
            <div className="flex justify-between text-base font-medium text-gray-800 pt-4">
              <span>Exam Fee</span>
              <span className="flex items-center gap-1 font-semibold text-blue-800">
                <IndianRupee className="w-4 h-4" />
                500.00
              </span>
            </div>
          </section>

          {/* CTA */}
          <div className="pt-6 border-t">
            <div className="flex justify-end">
              <Button onClick={() => setShowDialog(true)}>
                Proceed to Slot Booking <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment Method</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Selected Method:</strong> {selectedMethodLabel}
            </p>
            <p>
              <strong>Amount:</strong> ₹500.00
            </p>
            <p className="text-sm text-red-500 mt-2">
              ⚠️ Once confirmed, this cannot be changed.
            </p>
          </div>
          <DialogFooter className="pt-4">
            <Button
              onClick={handleConfirm}
              disabled={isConfirming}
              className="w-full"
            >
              {isConfirming ? "Confirming..." : "Confirm & Continue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
