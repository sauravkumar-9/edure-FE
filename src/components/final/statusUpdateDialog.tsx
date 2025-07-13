import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; // Changed from Input to Textarea
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NameCodeCell } from "./nameCodeCell";

export type LeadSource =
  | "walkin"
  | "instagram"
  | "referral"
  | "website"
  | "other";
export type LeadStatus = "cold" | "warm" | "hot" | "converted" | "lost";
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
}

interface UpdateStatusDialogProps {
  lead: Lead;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdate: (updatedLead: {
    id: string;
    newStatus: LeadStatus;
    comment?: string;
  }) => void;
}

export function UpdateStatusDialog({
  lead,
  open,
  onOpenChange,
  onStatusUpdate,
}: UpdateStatusDialogProps) {
  const [status, setStatus] = useState<LeadStatus>(lead.leadStatus);
  const [comment, setComment] = useState("");

  // Check if values have changed
  const hasChanges = status !== lead.leadStatus || comment.trim() !== "";

  const handleSubmit = () => {
    onStatusUpdate({
      id: lead.id,
      newStatus: status,
      comment,
    });
    setComment("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status for</DialogTitle>
          <NameCodeCell fullName={lead.fullName} code={lead.leadCode} />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(value: LeadStatus) => setStatus(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cold">Cold</SelectItem>
                <SelectItem value="warm">Warm</SelectItem>
                <SelectItem value="hot">Hot</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
              placeholder="Add any notes..."
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!hasChanges}>
            Update Status
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
