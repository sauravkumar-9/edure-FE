import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date?: Date | undefined;
  slot?: string;
  title?: string;
  message?: string;
  warningMessage?: string;
  children: React.ReactNode; // Action button (e.g., Confirm)
};

export function ConfirmDialog({
  open,
  onOpenChange,
  date,
  slot,
  title = "Confirm Your Slot",
  message,
  warningMessage = "⚠️ Once confirmed, the slot cannot be changed.",
  children,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm text-gray-700">
          {message && <p>{message}</p>}
          {date && (
            <p>
              <strong>Date:</strong> {format(date, "PPP")}
            </p>
          )}
          {slot && (
            <p>
              <strong>Slot:</strong> {slot}
            </p>
          )}
          {warningMessage && (
            <p className="text-sm text-red-500 mt-2">{warningMessage}</p>
          )}
        </div>

        <DialogFooter className="pt-4">{children}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
