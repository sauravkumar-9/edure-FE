import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { NameCodeCell } from "./nameCodeCell";
import { Textarea } from "../ui/textarea";

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
}

export default function CommentDialog({
  lead,
  onCommentSubmit,
  open,
  onOpenChange,
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
          <DialogTitle>Add Comment for</DialogTitle>
          <NameCodeCell fullName={lead.fullName} code={lead.leadCode} />
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

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!comment.trim()}>
            Add Comment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
