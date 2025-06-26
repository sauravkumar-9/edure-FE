import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const companies = [
  { id: "1", name: "Google", logo: "/google-logo.png" },
  { id: "2", name: "Microsoft", logo: "/microsoft-logo.png" },
  { id: "3", name: "Amazon", logo: "/amazon-logo.png" },
  { id: "4", name: "Meta", logo: "/meta-logo.png" },
  { id: "5", name: "Netflix", logo: "/netflix-logo.png" },
];

const locations = ["Audi 1", "Audi 2", "Main Auditorium", "Seminar Hall"];

export default function BasicInfo() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [driveDate, setDriveDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [messageToStudents, setMessageToStudents] = useState("");

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-medium">Company</Label>
          <Select onValueChange={setSelectedCompany}>
            <SelectTrigger>
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  <div className="flex items-center gap-2">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-6 h-6 rounded"
                    />
                    {company.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Drive Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !driveDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {driveDate ? (
                  format(driveDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={driveDate}
                onSelect={setDriveDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-medium">Location</Label>
          <Select onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select auditorium" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-medium">Message to Students</Label>
        <Textarea
          value={messageToStudents}
          onChange={(e) => setMessageToStudents(e.target.value)}
          placeholder="This message will be shown in notifications."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}
