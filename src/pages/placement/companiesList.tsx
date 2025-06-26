import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, PlusIcon } from "lucide-react";

export function CompaniesList() {
  // Sample data - replace with your API data
  const companies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      logo: "/logos/techcorp.png",
      contact: {
        name: "Rajesh Kumar",
        email: "rajesh.k@techcorp.com",
        phone: "+91 9876543210",
      },
      offersIssued: 42,
      associationDate: "2022-05-15",
    },
    {
      id: 2,
      name: "GlobalSoft",
      logo: "/logos/globalsoft.png",
      contact: {
        name: "Priya Sharma",
        email: "priya.s@globalsoft.com",
        phone: "+91 8765432109",
      },
      offersIssued: 28,
      associationDate: "2021-11-20",
    },
    // Add more companies as needed
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Partner Companies</h1>
          <p className="text-muted-foreground">
            List of all companies associated with our institution for placements
          </p>
        </div>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add New Company
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search companies..."
          className="pl-9"
          // Add search functionality here
        />
      </div>

      {/* Companies Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 bg-muted p-4 font-medium">
          <div className="col-span-4">Company</div>
          <div className="col-span-3">Point of Contact</div>
          <div className="col-span-2">Offers Issued</div>
          <div className="col-span-3">Associated Since</div>
        </div>

        {companies.map((company) => (
          <div
            key={company.id}
            className="grid grid-cols-12 p-4 border-t hover:bg-muted/50"
          >
            <div className="col-span-4 flex items-center gap-3">
              <img
                src={company.logo}
                alt={company.name}
                className="h-10 w-10 rounded-sm object-contain border"
              />
              <span className="font-medium">{company.name}</span>
            </div>
            <div className="col-span-3">
              <div className="font-medium">{company.contact.name}</div>
              <div className="text-sm text-muted-foreground">
                {company.contact.email}
              </div>
              <div className="text-sm text-muted-foreground">
                {company.contact.phone}
              </div>
            </div>
            <div className="col-span-2 flex items-center">
              <span className="font-medium">{company.offersIssued}</span>
            </div>
            <div className="col-span-3 flex items-center">
              {new Date(company.associationDate).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
