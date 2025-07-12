import { faker } from "@faker-js/faker";

export const response = {
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
  headers: [
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
  data: Array.from({ length: 10 }, (_, i) => {
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

console.log(JSON.stringify(response, null, 2));
