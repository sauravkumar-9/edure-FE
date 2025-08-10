import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import DropDown from "@/components/comman/dropDown";

export type LeadStatus = "cold" | "warm" | "hot" | "converted" | "lost";
export interface Lead {
  id: string;
  leadCode: string;
  fullName: string;
  email?: string;
  phone?: string;
  interestedCourse: string;
  leadStatus: LeadStatus;
  counseller: string;
  verificationStatus: "Yes" | "No";
  lastFollowUp: string;
  profilePic?: string;
  comments?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface StatusUpdateFormProps {
  lead: Lead;
  onCancel: () => void;
  onStatusUpdate: (updatedLead: {
    id: string;
    newStatus: LeadStatus;
    comment?: string;
  }) => void;
}

export function StatusUpdateForm({
  lead,
  onCancel,
  onStatusUpdate,
}: StatusUpdateFormProps) {
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
  };

  const onSelectChange: any = (value: LeadStatus) => {
    setStatus(value);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>

        <DropDown
          options={["cold", "warm", "hot", "converted", "lost"]}
          value={status}
          onChange={onSelectChange}
          placeholder="Select status"
          maxVisibleItems={5}
        />
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
  );
}
