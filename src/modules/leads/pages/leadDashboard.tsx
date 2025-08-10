import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUp, Plus } from "lucide-react";
import showToast from "@/components/comman/toast";
import { StatCard } from "@/components/final/statCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getDashboardData, addLeadService } from "../services/leadService";
import { convertMetricCard } from "../helper/builder";

export default function CounsellorLeadDashboard() {
  const [isAddLeadDialogOpen, setIsAddLeadDialogOpen] = useState(false);
  const [isBulkImportDialogOpen, setIsBulkImportDialogOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [newLead, setNewLead] = useState<any>({
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "unverified",
  });
  const [file, setFile] = useState<File | null>(null);
  const [dashboardData, setDashboardData] = useState<any>({});

  const leadSources = [
    "Website",
    "Referral",
    "Event",
    "Advertisement",
    "Social Media",
    "Other",
  ];

  const handleAddLead = async () => {
    try {
      setIsTableLoading(true);
      setIsAddLeadDialogOpen(false);
      await addLeadService(newLead);
      showToast({
        title: "Lead added",
        description: `${newLead.name} has been added as ${newLead.status} lead.`,
        type: "success",
      });
      setNewLead({
        name: "",
        email: "",
        phone: "",
        source: "",
        status: "unverified",
      });
      fetchAndSetDashboardData(); // Refresh data
    } catch (error) {
      console.error("Add lead error:", error);
      showToast({
        title: "Error",
        description: "Failed to add lead",
        type: "error",
      });
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetDashboardData();
  }, []);

  const fetchAndSetDashboardData = async () => {
    try {
      setIsPageLoading(true);
      const dashboardDataResponse: any = await getDashboardData();
      const convertedMasterStats = convertMetricCard(
        dashboardDataResponse.masterStats
      );
      setDashboardData({ masterStats: convertedMasterStats });
    } catch (error) {
      console.error("Dashboard data error:", error);
      showToast({
        title: "Error",
        description: "Failed to load dashboard data",
        type: "error",
      });
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleBulkImport = async () => {
    if (!file) return;

    try {
      setIsTableLoading(true);
      showToast({
        title: "Import started",
        description: `Processing ${file.name}...`,
        type: "info",
      });

      // Simulate processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showToast({
        title: "Import complete",
        description: "25 leads imported successfully",
        type: "success",
      });
      setIsBulkImportDialogOpen(false);
      setFile(null);
      fetchAndSetDashboardData(); // Refresh data
    } catch (error) {
      console.error("Bulk import error:", error);
      showToast({
        title: "Error",
        description: "Failed to import leads",
        type: "error",
      });
    } finally {
      setIsTableLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {isPageLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold">Lead Management</h1>
            <p className="text-muted-foreground">
              Track and manage all student leads
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <Dialog
            open={isBulkImportDialogOpen}
            onOpenChange={setIsBulkImportDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" disabled={isPageLoading}>
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
                    disabled={isTableLoading}
                  />
                  <p className="text-sm text-muted-foreground">
                    File should contain columns: Name, Email, Phone, Source
                  </p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsBulkImportDialogOpen(false)}
                    disabled={isTableLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBulkImport}
                    disabled={!file || isTableLoading}
                  >
                    {isTableLoading ? "Importing..." : "Import Leads"}
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
              <Button disabled={isPageLoading}>
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
                    disabled={isTableLoading}
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
                    disabled={isTableLoading}
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
                    disabled={isTableLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Select
                    value={newLead.source}
                    onValueChange={(value) =>
                      setNewLead({ ...newLead, source: value })
                    }
                    disabled={isTableLoading}
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
                    disabled={isTableLoading}
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
                      disabled={isTableLoading}
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
                    disabled={isTableLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddLead}
                    disabled={
                      isTableLoading ||
                      !newLead.name ||
                      !newLead.email ||
                      !newLead.phone ||
                      !newLead.source
                    }
                  >
                    {isTableLoading ? "Adding..." : "Add Lead"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {isPageLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="space-y-3 p-4 border rounded-lg">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          : dashboardData?.masterStats?.map((stat: any, idx: number) => (
              <StatCard
                key={idx}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
              />
            ))}
      </div>
    </div>
  );
}
