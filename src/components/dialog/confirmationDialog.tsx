"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import DialogActionFooter from "./dialogActionFooter";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string | ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  isLoading?: boolean;
  disableConfirm?: boolean;
  customDataComponent?: ReactNode;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  isLoading,
  disableConfirm,
  customDataComponent,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription className="space-y-2 text-gray-700">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {customDataComponent}

        <DialogActionFooter
          handleActionConfimration={onConfirm}
          confirmButtonLabel={confirmLabel}
          isDraft={false}
          isSubmissionAllowed={false}
          isLoading={isLoading}
          disableConfirm={disableConfirm}
          cancelButtonLabel={cancelLabel}
        />
      </DialogContent>
    </Dialog>
  );
}
