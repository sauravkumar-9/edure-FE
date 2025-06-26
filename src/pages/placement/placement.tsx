"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { companyListMock } from "@/mockData/placement";
import DataListingHeader from "@/components/cards/dataListingHeader";
import { sampleJobs } from "@/components/final/data";
import { JobCard } from "@/components/final/hobCard";

const companyList = companyListMock;

const getFilteredCompanies = (filter: string) => {
  const today = new Date();

  return companyList.filter((company) => {
    const driveDate = new Date(company.driveDate); // Make sure your mock dates are valid

    if (filter === "past") return driveDate < today;
    if (filter === "future") return driveDate > today;
    return driveDate.toDateString() === today.toDateString(); // "live"
  });
};

export default function CurrentCoursesTab() {
  const [filter, setFilter] = useState("live");

  const filteredCompanies = getFilteredCompanies(filter);

  const handleSave = (jobId: string) => {
    console.log("Saving job:", jobId);
    // Here you would typically update the job's saved status in your state management
  };

  const handleApply = (jobId: string) => {
    console.log("Applying to job:", jobId);
    // Here you would typically handle the application process
  };

  return (
    <div className="w-full">
      <DataListingHeader />

      {/* Tabs for filtering */}
      <Tabs value={filter} onValueChange={setFilter} className="w-full mt-4">
        <TabsList>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="future">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value={filter}>
          {/* <div className="grid gap-4 pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <Link to={`2`} className="block" key={company.title}>
                  <PlacementListCard
                    title={company.title}
                    companyLogo={company.imageUrl}
                    status="ongoing"
                    applicationDeadline="15 Oct 2023"
                    driveDate={company.driveDate}
                    location="On-campus (Main Auditorium)"
                    packages={{ min: "12", max: "45", average: "22" }}
                    batches={["2023", "2024"]}
                    registeredStudents={142}
                  />
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground text-sm pt-4">
                No placements found.
              </p>
            )}
          </div> */}

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleJobs.map((job) => (
              <Link to={`2`} className="block" key={job.id}>
                <JobCard
                  key={job.id}
                  job={job}
                  onSave={handleSave}
                  onApply={handleApply}
                />
              </Link>
            ))}
          </div>

          {/* Empty State (if no jobs) */}
          {sampleJobs.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg mb-2">No jobs found</div>
              <p className="text-gray-500">
                Check back later for new opportunities
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
