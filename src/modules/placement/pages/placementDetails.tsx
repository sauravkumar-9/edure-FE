import { userListSchema } from "../data/schema";
import TabLayout from "@/components/comman/tabLayout";
import { placementResultColumns } from "../data/placementResultColumns";
import CompanyProfileHeader from "@/components/cards/companyCard";
import PlacementOverview from "@/modules/placement/components/placementOverview";
import PlacementResults from "@/modules/placement/components/placementResults";
import { placementCandidatesMock } from "@/mockData/placement";
import JobRoles from "@/modules/placement/components/placementJobRoles";
import { useState } from "react";

const userList = userListSchema.parse(placementCandidatesMock);
const tabsDetails: any = [
  {
    value: "overview",
    label: "Overview",
    component: PlacementOverview,
  },
  {
    value: "jobRoles",
    label: "Job Roles",
    component: JobRoles,
  },
  {
    value: "report",
    label: "Report",
    component: PlacementResults,
    props: {
      columns: placementResultColumns,
      userList,
    },
  },
];

export default function PlacementDetails() {
  const [tabValue, setTabValue] = useState(tabsDetails[0].value);
  return (
    <div className="">
      <CompanyProfileHeader
        company={{
          name: "TechCorp Inc.",
          profileImage: "https://logo.clearbit.com/google.com",
          description:
            "A global technology company specializing in Internet-related services and products.",
        }}
        companyWebsite="https://techcorp.com"
        placementDate="Nov 25, 2023"
        status="Ongoing"
        hiringStats={{
          offersMade: 24,
          highestPackage: "₹42 LPA",
          averagePackage: "₹18 LPA",
          studentsRegistered: 156,
        }}
        jobRoles={["Software Engineer", "Data Analyst", "UX Designer"]}
        location="Bangalore, India"
        deadline="Nov 20, 2023"
      />
      <TabLayout
        tabs={tabsDetails}
        mode="content"
        value={tabValue}
        onChange={setTabValue}
      />
    </div>
  );
}
