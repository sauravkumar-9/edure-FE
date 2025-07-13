import { faker } from "@faker-js/faker";

export const leadListingResponse = {
  page: 1,
  limit: 10,
  total: 50,
  stats: {
    verified: 10,
    unverified: 10,
    cold: 5,
    warm: 5,
    hot: 5,
    converted: 5,
    lost: 5,
  },
  columns: [
    {
      label: "Lead Name",
      key: "fullName",
      dataType: "string",
      filterConfig: {
        isBasic: false,
        isAdvanced: false,
        enableSorting: true,
        enableHiding: false,
      },
    },
    {
      label: "Lead ID",
      key: "leadCode",
      dataType: "string",
      filterConfig: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: true,
        enableHiding: true,
      },
    },
    {
      label: "Interested Course",
      key: "interestedCourse",
      dataType: "string",
      filterConfig: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: true,
        enableHiding: true,
      },
    },
    {
      label: "Status",
      key: "leadStatus",
      dataType: "enum",
      enumValues: ["cold", "warm", "hot", "converted", "lost"],
      filterConfig: {
        isBasic: true,
        isAdvanced: true,
        enableSorting: false,
        enableHiding: false,
      },
    },
    {
      label: "Source",
      key: "leadSource",
      dataType: "enum",
      enumValues: ["walkin", "instagram", "referral", "website", "other"],
      filterConfig: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: true,
        enableHiding: true,
      },
    },
    {
      label: "Counsellor",
      key: "counseller",
      dataType: "string",
      filterConfig: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: false,
        enableHiding: true,
      },
    },
    {
      label: "Verified",
      key: "verificationStatus",
      dataType: "enum",
      enumValues: ["Yes", "No"],
      filterConfig: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: true,
        enableHiding: true,
      },
    },
    {
      label: "Last Follow Up",
      key: "lastFollowUp",
      dataType: "date",
      filterConfig: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: true,
        enableHiding: true,
      },
    },
  ],
  rows: Array.from({ length: 10 }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const statuses = ["cold", "warm", "hot", "converted", "lost"];
    const sources = ["walkin", "instagram", "referral", "website", "other"];
    const courses = [
      "Computer Science",
      "Engineering",
      "Medicine",
      "Business",
      "AI & ML",
      "Data Science",
      "Cybersecurity",
    ];

    return {
      id: faker.string.uuid(),
      leadCode: `LD-${faker.string.numeric(5)}`,
      fullName,
      interestedCourse: faker.helpers.arrayElement(courses),
      leadStatus: faker.helpers.arrayElement(statuses),
      leadSource: faker.helpers.arrayElement(sources),
      counseller: faker.person.fullName(),
      verificationStatus: faker.datatype.boolean() ? "Yes" : "No",
      lastFollowUp: faker.date.recent({ days: 10 }).toISOString().split("T")[0],
    };
  }),
};

export const leadDashboardResponse = {
  masterStats: [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: "DollarSign",
    },
    {
      title: "Total Leads",
      value: 333,
      change: 0,
      icon: "DollarSign",
    },
    {
      title: "Verified Leads",
      value: 333,
      change: 0,
      icon: "DollarSign",
    },
    {
      title: "Unverified Leads",
      value: 333,
      change: 0,
      icon: "DollarSign",
    },
  ],
};
