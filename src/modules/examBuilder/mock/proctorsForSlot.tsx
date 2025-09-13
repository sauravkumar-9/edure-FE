import { faker } from "@faker-js/faker";

export const proctorListingResponse = {
  page: 1,
  limit: 10,
  total: 30,
  stats: {
    totalProctors: 30,
    active: 20,
    inactive: 10,
  },
  columns: [
    {
      label: "Proctor Name",
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
      label: "Proctor ID",
      key: "proctorId",
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
      label: "Department",
      key: "department",
      dataType: "string",
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
    const departments = [
      "Computer Science",
      "Engineering",
      "Medicine",
      "Business",
      "Mathematics",
      "Physics",
      "Chemistry",
    ];

    return {
      id: faker.string.uuid(),
      proctorId: `PRC-${faker.string.numeric(5)}`,
      fullName,
      email: faker.internet.email({ firstName, lastName }),
      phone: `+91 ${faker.phone.number({ style: "national" })}`,
      department: faker.helpers.arrayElement(departments),
    };
  }),
};
