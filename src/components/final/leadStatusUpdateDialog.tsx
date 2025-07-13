import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  DialogTrigger,
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
import { Ellipsis, Eye, RefreshCw, User } from "lucide-react";
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
import { cn } from "@/lib/utils";

// ... (keep all previous imports)

// Add these interfaces
interface CommentDialogProps {
  lead: Lead;
  onCommentSubmit?: (comment: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DetailsDialogProps {
  lead: Lead;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Comment Dialog Component
function CommentDialog({
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Comment for {lead.fullName}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Lead ID: {lead.leadCode}
          </p>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Input
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment..."
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Comment</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Details Dialog Component
function DetailsDialog({ lead, open, onOpenChange }: DetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {lead.fullName} ({lead.leadCode})
          </p>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src={
                  lead.profilePic ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${lead.fullName}`
                }
              />
              <AvatarFallback>
                {lead.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold">{lead.fullName}</h4>
              <p className="text-sm">{lead.interestedCourse}</p>
              <Badge
                className={cn(
                  "capitalize",
                  lead.leadStatus === "cold"
                    ? "bg-gray-100 text-gray-800"
                    : lead.leadStatus === "warm"
                    ? "bg-blue-100 text-blue-800"
                    : lead.leadStatus === "hot"
                    ? "bg-orange-100 text-orange-800"
                    : lead.leadStatus === "converted"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                )}
              >
                {lead.leadStatus.charAt(0).toUpperCase() +
                  lead.leadStatus.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <p>{lead.email || "Not provided"}</p>
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <p>{lead.phone || "Not provided"}</p>
            </div>
            <div className="space-y-2">
              <Label>Source</Label>
              <p>
                {lead.leadSource.charAt(0).toUpperCase() +
                  lead.leadSource.slice(1)}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Verification</Label>
              <p>
                {lead.verificationStatus === "Yes"
                  ? "Verified"
                  : "Not Verified"}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Last Follow Up</Label>
              <p>{lead.lastFollowUp || "No follow ups"}</p>
            </div>
            <div className="space-y-2">
              <Label>Counsellor</Label>
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${lead.counseller}`}
                  />
                  <AvatarFallback>{lead.counseller[0]}</AvatarFallback>
                </Avatar>
                <span>{lead.counseller}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Updated StatusUpdateDialog with all functionality
export function StatusUpdateDialog({ lead, onStatusUpdate }: any) {
  const [status, setStatus] = useState<LeadStatus>(lead.leadStatus);
  const [comment, setComment] = useState("");
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

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
            <RefreshCw className="mr-2 h-4 w-4" />
            Update Status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setCommentDialogOpen(true)}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Add Comment
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDetailsDialogOpen(true)}>
            <User className="mr-2 h-4 w-4" />
            View Profile
          </DropdownMenuItem>
          {/* You can add more items with icons as needed */}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status Update Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
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
      </Dialog>

      {/* Comment Dialog */}
      <CommentDialog
        lead={lead}
        open={commentDialogOpen}
        onOpenChange={setCommentDialogOpen}
        onCommentSubmit={handleCommentSubmit}
      />

      {/* Details Dialog */}
      <DetailsDialog
        lead={lead}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      />
    </>
  );
}
