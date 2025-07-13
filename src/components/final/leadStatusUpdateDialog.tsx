import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit3, Ellipsis, User } from "lucide-react";
import { useState } from "react";

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

import { MessageSquare } from "lucide-react";
import CommentDialog from "./commentDialog";
import { UpdateStatusDialog } from "./statusUpdateDialog";

// Updated StatusUpdateDialog with all functionality
export function StatusUpdateDialog({ lead, onStatusUpdate }: any) {
  const [status, setStatus] = useState<LeadStatus>(lead.leadStatus);
  const [comment, setComment] = useState("");
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);

  const handleViewProfile = () => {
    console.log("lead", lead);
  };

  const handleStatusSubmit = () => {
    const updatedLead = {
      id: lead.id,
      leadStatus: status,
      comments: [
        ...(lead.comments || []),
        `Status changed to ${status}${comment ? `: ${comment}` : ""}`,
      ],
    };

    if (onStatusUpdate) {
      onStatusUpdate(updatedLead);
    }

    setStatusDialogOpen(false);
    setComment("");
  };

  const handleCommentSubmit = (newComment: string) => {
    const updatedLead = {
      id: lead.id,
      comments: [...(lead.comments || []), newComment],
    };

    if (onStatusUpdate) {
      onStatusUpdate(updatedLead);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 float-right">
            <span className="sr-only">Open menu</span>
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setStatusDialogOpen(true)}>
            <Edit3 className="mr-2 h-4 w-4" />
            Update Status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setCommentDialogOpen(true)}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Add Comment
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewProfile}>
            <User className="mr-2 h-4 w-4" />
            View Profile
          </DropdownMenuItem>
          {/* You can add more items with icons as needed */}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status Update Dialog */}
      {/* <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status for {lead.fullName}</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Lead ID: {lead.leadCode}
            </p>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={status}
                onValueChange={(value: LeadStatus) => setStatus(value)}
              >
                <SelectTrigger className="col-span-3">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="comment" className="text-right">
                Comment
              </Label>
              <Input
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="col-span-3"
                placeholder="Add any notes..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setStatusDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleStatusSubmit}>Update Status</Button>
          </div>
        </DialogContent>
      </Dialog> */}

      <UpdateStatusDialog
        lead={lead}
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        onStatusUpdate={handleStatusSubmit}
      />

      {/* Comment Dialog */}
      <CommentDialog
        lead={lead}
        open={commentDialogOpen}
        onOpenChange={setCommentDialogOpen}
        onCommentSubmit={handleCommentSubmit}
      />
    </>
  );
}
