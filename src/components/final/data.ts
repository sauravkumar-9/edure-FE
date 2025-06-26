export interface Job {
    id: string;
    company: string;
    companyLogo: string;
    title: string;
    location: string;
    salary: string;
    postedDate: string;
    jobType: JobType[];
    isSaved: boolean;
    isEligible: boolean; // <-- added
  }
  
  
  export type JobType =
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Remote"
    | "In office"
    | "Flexible schedule"
    | "Senior level";
  

    export const sampleJobs: Job[] = [
        {
          id: "1",
          company: "Amazon",
          companyLogo: "https://logo.clearbit.com/amazon.com",
          title: "Senior UI/UX Designer",
          location: "San Francisco, CA",
          salary: "$120/hr",
          postedDate: "5 days ago",
          jobType: ["Part-time", "Senior level"],
          isSaved: false,
          isEligible: true,
        },
        {
          id: "2",
          company: "Google",
          companyLogo: "https://logo.clearbit.com/google.com",
          title: "Graphic Designer",
          location: "Mountain View, CA",
          salary: "$150 - 220k",
          postedDate: "30 days ago",
          jobType: ["Full-time", "Flexible schedule"],
          isSaved: true,
          isEligible: false,
        },
        {
          id: "3",
          company: "Dribbble",
          companyLogo: "https://logo.clearbit.com/dribbble.com",
          title: "Senior Motion Designer",
          location: "San Francisco, CA",
          salary: "$85/hr",
          postedDate: "18 days ago",
          jobType: ["Contract", "Remote"],
          isSaved: false,
          isEligible: true,
        },
        {
          id: "4",
          company: "Meta",
          companyLogo: "https://logo.clearbit.com/meta.com",
          title: "UX Designer",
          location: "New York, NY",
          salary: "$200 - 250k",
          postedDate: "3 months ago",
          jobType: ["Full-time", "In office"],
          isSaved: true,
          isEligible: false,
        },
        {
          id: "5",
          company: "Airbnb",
          companyLogo: "https://logo.clearbit.com/airbnb.com",
          title: "Junior UX/UI Designer",
          location: "San Francisco, CA",
          salary: "$100/hr",
          postedDate: "1 day ago",
          jobType: ["Contract", "Remote"],
          isSaved: false,
          isEligible: true,
        },
        {
          id: "6",
          company: "Apple",
          companyLogo: "https://logo.clearbit.com/apple.com",
          title: "Graphic Designer",
          location: "Cupertino, CA",
          salary: "$85 - 120k",
          postedDate: "6 days ago",
          jobType: ["Full-time", "Flexible schedule"],
          isSaved: true,
          isEligible: false,
        },
      ];
      
