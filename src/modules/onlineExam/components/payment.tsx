import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight, ArrowLeft, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function PaymentPage({ onComplete }: { onComplete: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center  to-white px-4">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-900">
            Payment Details
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">
              Select a Payment Method
            </h3>
            <RadioGroup defaultValue="card" className="space-y-3">
              {[
                { id: "card", label: "Credit / Debit Card" },
                { id: "netbanking", label: "Net Banking" },
                { id: "upi", label: "UPI (Google Pay / PhonePe / BHIM)" },
                { id: "wallet", label: "Wallet (Paytm, PhonePe)" },
              ].map(({ id, label }) => (
                <div
                  key={id}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <RadioGroupItem value={id} id={id} />
                  <Label htmlFor={id} className="text-sm text-gray-700">
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Fee Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-base font-medium text-gray-800 px-1">
              <span>Exam Fee</span>
              <span className="flex items-center gap-1 font-semibold text-blue-800">
                <IndianRupee className="w-4 h-4" />
                500.00
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t pt-6">
          <Button onClick={onComplete} className="w-full sm:w-auto">
            Proceed to Slot Booking
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
