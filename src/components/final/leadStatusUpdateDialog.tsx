import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit3, Ellipsis, StickyNote, User } from "lucide-react";
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

import CommentDialog from "./commentDialog";
import { UpdateStatusDialog } from "./statusUpdateDialog";
import { Link } from "react-router-dom";

// Updated StatusUpdateDialog with all functionality
export function StatusUpdateDialog({ lead, onStatusUpdate }: any) {
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);

  const handleViewProfile = () => {
    console.log("lead", lead);
  };

  const handleStatusSubmit = ({
    newStatus,
    comment,
  }: {
    newStatus: LeadStatus;
    comment?: string;
  }) => {
    const updatedLead = {
      id: lead.id,
      newStatus,
      note: comment,
    };
    if (onStatusUpdate) {
      onStatusUpdate({ updatedLead, updateType: "STATUS" });
    }
    setStatusDialogOpen(false);
    // setComment("");
  };

  const handleCommentSubmit = (newComment: string) => {
    const updatedLead = {
      id: lead.id,
      note: newComment,
    };
    if (onStatusUpdate) {
      onStatusUpdate({ updatedLead, updateType: "NOTE" });
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
            <StickyNote className="mr-2 h-4 w-4" />
            Add Note
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewProfile}>
            <Link to={lead.id} className="block flex" key={lead.id}>
              <User className="mr-2 h-4 w-4" />
              View Profile
            </Link>
          </DropdownMenuItem>
          {/* You can add more items with icons as needed */}
        </DropdownMenuContent>
      </DropdownMenu>

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
