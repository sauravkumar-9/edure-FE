import { userListSchema } from "./data/schema";
import TabLayout from "@/components/comman/tabLayout";
import { placementResultColumns } from "./data/placementResultColumns";
import CompanyProfileHeader from "@/components/cards/companyCard";
import PlacementOverview from "@/components/layout/placementOverview";
import PlacementResults from "@/components/layout/placementResults";
import { placementCandidatesMock } from "@/mockData/placement";
import JobRoles from "@/components/layout/placementJobRoles";

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

function PlacementDetails() {
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
      {/* <CompanyProfileHeader
        company={{
          name: "Google",
          profileImage: "https://logo.clearbit.com/google.com",
          description:
            "A global technology company specializing in Internet-related services and products.",
        }}
        companyWebsite="https://google.com"
        placementDate="June 15, 2023"
        status="Ongoing"
        hiringStats={{
          offersMade: 42,
          highestPackage: "45",
          averagePackage: "28",
        }}
      /> */}
      <TabLayout tabs={tabsDetails} />
    </div>
  );
}

export default PlacementDetails;
