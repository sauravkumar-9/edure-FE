"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DataListingHeader from "@/components/cards/dataListingHeader";
import { sampleJobs } from "@/components/final/data";
import { JobCard } from "@/components/final/hobCard";
import TabLayout from "@/components/comman/tabLayout";

export default function CurrentCoursesTab() {
  const [filter, setFilter] = useState("live");

  const handleSave = (jobId: string) => {
    console.log("Saving job:", jobId);
    // Here you would typically update the job's saved status in your state management
  };

  const handleApply = (jobId: string) => {
    console.log("Applying to job:", jobId);
    // Here you would typically handle the application process
  };

  useEffect(() => {
    console.log("filter", filter);
  }, [filter]);

  const tabs = [
    { value: "past", label: "Past" },
    { value: "live", label: "Live" },
    { value: "future", label: "Upcoming" },
  ];

  return (
    <div className="w-full">
      <DataListingHeader />
      <TabLayout
        mode="filter"
        value={filter}
        onChange={setFilter}
        tabs={tabs}
      />

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
    </div>
  );
}
