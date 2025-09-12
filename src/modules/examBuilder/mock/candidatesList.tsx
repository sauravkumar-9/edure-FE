import { faker } from "@faker-js/faker";

export const candidateListingResponse = {
  page: 1,
  limit: 10,
  total: 50,
  stats: {
    totalCandidates: 50,
    passed: 20,
    failed: 15,
    pending: 15,
  },
  columns: [
    {
      label: "Candidate Name",
      key: "fullName",
      dataType: "string",
      filterConfig: {
        isBasic: true,
        isAdvanced: false,
        enableSorting: true,
        enableHiding: false,
      },
    },
    {
      label: "Candidate ID",
      key: "candidateId",
      dataType: "string",
      filterConfig: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: true,
        enableHiding: true,
      },
    },
    {
      label: "Email",
      key: "email",
      dataType: "string",
      filterConfig: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: false,
        enableHiding: true,
      },
    },
    {
      label: "Phone",
      key: "phone",
      dataType: "string",
      filterConfig: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: false,
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
      label: "Exam Score",
      key: "examScore",
      dataType: "number",
      filterConfig: {
        isBasic: true,
        isAdvanced: true,
        enableSorting: true,
        enableHiding: false,
      },
    },
  ],
  rows: Array.from({ length: 10 }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
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
      candidateId: `CAND-${faker.string.numeric(5)}`,
      fullName,
      email: faker.internet.email({ firstName, lastName }),
      phone: `+91 ${faker.phone.number({ style: "national" })}`,
      interestedCourse: faker.helpers.arrayElement(courses),
      examScore: faker.number.int({ min: 0, max: 100 }),
    };
  }),
};
