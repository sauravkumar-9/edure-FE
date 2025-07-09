import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileUp, Plus } from "lucide-react";
import showToast from "@/components/other/toast";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: "verified" | "unverified";
  tag?: "hot" | "warm" | "cold";
  date: string;
  applications?: number;
  converted?: number;
};

export default function CounsellorLeadDashboard() {
  const [isAddLeadDialogOpen, setIsAddLeadDialogOpen] = useState(false);
  const [isBulkImportDialogOpen, setIsBulkImportDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"verified" | "unverified">(
    "unverified"
  );
  const [newLead, setNewLead] = useState<Omit<Lead, "id" | "date">>({
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "unverified",
  });
  const [file, setFile] = useState<File | null>(null);

  // Sample lead data
  const [unverifiedLeads, setUnverifiedLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "Aarav Patel",
      email: "aarav@example.com",
      phone: "9876543210",
      source: "Website",
      status: "unverified",
      date: "2023-05-15",
    },
    {
      id: "2",
      name: "Neha Sharma",
      email: "neha@example.com",
      phone: "8765432109",
      source: "Referral",
      status: "unverified",
      date: "2023-05-18",
    },
  ]);

  const [verifiedLeads, setVerifiedLeads] = useState<Lead[]>([
    {
      id: "3",
      name: "Rahul Singh",
      email: "rahul@example.com",
      phone: "7654321098",
      source: "Event",
      status: "verified",
      tag: "hot",
      applications: 3,
      converted: 2,
      date: "2023-05-10",
    },
    {
      id: "4",
      name: "Priya Gupta",
      email: "priya@example.com",
      phone: "6543210987",
      source: "Advertisement",
      status: "verified",
      tag: "warm",
      applications: 2,
      converted: 1,
      date: "2023-05-12",
    },
  ]);

  const leadSources = [
    "Website",
    "Referral",
    "Event",
    "Advertisement",
    "Social Media",
    "Other",
  ];

  const handleAddLead = () => {
    const lead: Lead = {
      ...newLead,
      id: Math.random().toString(36).substring(7),
      date: new Date().toISOString(),
      applications: 0,
      converted: 0,
    };

    if (newLead.status === "verified") {
      setVerifiedLeads([...verifiedLeads, { ...lead, tag: "warm" }]);
    } else {
      setUnverifiedLeads([...unverifiedLeads, lead]);
    }

    setIsAddLeadDialogOpen(false);
    setNewLead({
      name: "",
      email: "",
      phone: "",
      source: "",
      status: "unverified",
    });

    showToast({
      title: "Lead added",
      description: `${newLead.name} has been added as ${newLead.status} lead.`,
      type: "success",
    });
  };

  const handleBulkImport = () => {
    if (file) {
      // In a real app, you would process the file here
      showToast({
        title: "Import started",
        description: `Processing ${file.name}...`,
        type: "info",
      });

      // Simulate processing
      setTimeout(() => {
        showToast({
          title: "Import complete",
          description: "25 leads imported successfully",
          type: "success",
        });
        setIsBulkImportDialogOpen(false);
        setFile(null);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Lead Management</h1>
          <p className="text-muted-foreground">
            Track and manage all student leads
          </p>
        </div>

        <div className="flex gap-3">
          <Dialog
            open={isBulkImportDialogOpen}
            onOpenChange={setIsBulkImportDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileUp className="w-4 h-4 mr-2" />
                Bulk Import
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Import Leads</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Upload CSV/Excel File</Label>
                  <Input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <p className="text-sm text-muted-foreground">
                    File should contain columns: Name, Email, Phone, Source
                  </p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsBulkImportDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleBulkImport} disabled={!file}>
                    Import Leads
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isAddLeadDialogOpen}
            onOpenChange={setIsAddLeadDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={newLead.name}
                    onChange={(e) =>
                      setNewLead({ ...newLead, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={newLead.email}
                    onChange={(e) =>
                      setNewLead({ ...newLead, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    value={newLead.phone}
                    onChange={(e) =>
                      setNewLead({ ...newLead, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Select
                    value={newLead.source}
                    onValueChange={(value) =>
                      setNewLead({ ...newLead, source: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {leadSources.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={newLead.status}
                    onValueChange={(value) =>
                      setNewLead({
                        ...newLead,
                        status: value as "verified" | "unverified",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unverified">Unverified</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newLead.status === "verified" && (
                  <div className="space-y-2">
                    <Label>Tag</Label>
                    <Select
                      onValueChange={(value) =>
                        setNewLead({
                          ...newLead,
                          tag: value as "hot" | "warm" | "cold",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tag (default: warm)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hot">Hot</SelectItem>
                        <SelectItem value="warm">Warm</SelectItem>
                        <SelectItem value="cold">Cold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddLeadDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddLead}
                    disabled={
                      !newLead.name ||
                      !newLead.email ||
                      !newLead.phone ||
                      !newLead.source
                    }
                  >
                    Add Lead
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Leads</CardDescription>
            <CardTitle className="text-3xl">
              {unverifiedLeads.length + verifiedLeads.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Verified Leads</CardDescription>
            <CardTitle className="text-3xl">{verifiedLeads.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Ready for followup</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Hot Leads</CardDescription>
            <CardTitle className="text-3xl">
              {verifiedLeads.filter((lead) => lead.tag === "hot").length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              High conversion potential
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conversion Rate</CardDescription>
            <CardTitle className="text-3xl">
              {(() => {
                const totalConverted = verifiedLeads.reduce(
                  (sum, lead) => sum + (lead.converted || 0),
                  0
                );
                const totalApplications = verifiedLeads.reduce(
                  (sum, lead) => sum + (lead.applications || 0),
                  0
                );

                if (totalApplications === 0) return "0%";

                const conversionRate = Math.round(
                  (totalConverted / totalApplications) * 100
                );
                return `${conversionRate}%`;
              })()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Verified leads only</p>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Tracking</CardTitle>
          <CardDescription>
            Manage and categorize your student leads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "verified" | "unverified")
            }
          >
            <TabsList>
              <TabsTrigger value="unverified">
                Unverified ({unverifiedLeads.length})
              </TabsTrigger>
              <TabsTrigger value="verified">
                Verified ({verifiedLeads.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="unverified">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unverifiedLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <div>{lead.email}</div>
                        <div className="text-sm text-muted-foreground">
                          {lead.phone}
                        </div>
                      </TableCell>
                      <TableCell>{lead.source}</TableCell>
                      <TableCell>
                        {new Date(lead.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Verify
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="verified">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Converted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verifiedLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <div>{lead.email}</div>
                        <div className="text-sm text-muted-foreground">
                          {lead.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            lead.tag === "hot"
                              ? "destructive"
                              : lead.tag === "warm"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {lead.tag}
                        </Badge>
                      </TableCell>
                      <TableCell>{lead.applications}</TableCell>
                      <TableCell>{lead.converted}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Track
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
