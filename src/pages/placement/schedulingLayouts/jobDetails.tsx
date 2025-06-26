"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function JobDetails() {
  const [jobRoles, setJobRoles] = useState([
    { role: "", type: "", ctc: "", joiningDate: undefined as Date | undefined },
  ]);

  const handleDeleteJobRole = (index: number) => {
    if (jobRoles.length > 1) {
      const updated = [...jobRoles];
      updated.splice(index, 1);
      setJobRoles(updated);
    }
  };

  const handleAddJobRole = () => {
    setJobRoles([
      ...jobRoles,
      { role: "", type: "", ctc: "", joiningDate: undefined },
    ]);
  };

  return (
    <div className="space-y-4">
      {jobRoles.map((job, index) => (
        <Card key={index} className="p-4 space-y-4 relative">
          {jobRoles.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => handleDeleteJobRole(index)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job Role / Designation</Label>
              <Input
                placeholder="e.g. Software Engineer"
                value={job.role}
                onChange={(e) => {
                  const updated = [...jobRoles];
                  updated[index].role = e.target.value;
                  setJobRoles(updated);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Job Type</Label>
              <Select
                onValueChange={(value) => {
                  const updated = [...jobRoles];
                  updated[index].type = value;
                  setJobRoles(updated);
                }}
                value={job.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      ))}
      <Button
        variant="outline"
        onClick={handleAddJobRole}
        className="flex gap-2 w-fit"
      >
        <Plus size={16} /> Add Another Role
      </Button>
    </div>
  );
}
