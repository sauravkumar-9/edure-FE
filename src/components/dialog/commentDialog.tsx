import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { NameCodeCell } from "../final/nameCodeCell";
import { Textarea } from "../ui/textarea";
import DialogActionBar from "./dialogActionBar";

// Lead Status and Source Types
export type LeadStatus = "cold" | "warm" | "hot" | "converted" | "lost";
export type LeadSource =
  | "walkin"
  | "instagram"
  | "referral"
  | "website"
  | "other";

// Main Lead Interface
export interface Lead {
  id: string;
  leadCode: string;
  fullName: string;
  email?: string;
  phone?: string;
  interestedCourse: string;
  leadStatus: LeadStatus;
  leadSource: LeadSource;
  counseller: string;
  verificationStatus: "Yes" | "No";
  lastFollowUp: string;
  profilePic?: string;
  comments?: string[];
  createdAt?: string;
  updatedAt?: string;
  // Add any additional fields your leads might have
}

// ... (keep all previous imports)

// Add these interfaces
interface CommentDialogProps {
  lead: Lead;
  onCommentSubmit?: (comment: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dialogDescription?: string;
  dialogTitle?: string;
}

export default function CommentDialog({
  lead,
  onCommentSubmit,
  open,
  onOpenChange,
  dialogDescription,
  dialogTitle,
}: CommentDialogProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (comment.trim() && onCommentSubmit) {
      onCommentSubmit(comment);
      setComment("");
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setComment("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDescription && (
            <p className="text-sm text-muted-foreground">{dialogDescription}</p>
          )}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[120px] h-32"
              placeholder="Type your comment here..."
            />
          </div>
        </div>

        <DialogActionBar
          handleActionConfimration={handleSubmit}
          confirmActionButtonLabel="Add Comment"
          isDraft={false}
          isSubmissionAllowed={!comment.trim()}
        />
      </DialogContent>
    </Dialog>
  );
}
