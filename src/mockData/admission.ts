import { faker } from '@faker-js/faker'

export const admissionStudentListMock = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return {
    id: faker.string.uuid(),
    applicationId: faker.string.alphanumeric(8).toUpperCase(),
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    phone: `+91 9${faker.string.numeric(9)}`,
    gender: faker.helpers.arrayElement(['male', 'female', 'other']),
    dob: faker.date.birthdate({ min: 17, max: 22, mode: 'age' }),
    category: faker.helpers.arrayElement(['general', 'obc', 'sc', 'st', 'ews']),
    entranceExamScore: faker.datatype.boolean() ? faker.number.int({ min: 50, max: 100 }) : undefined,
    highSchoolPercentage: parseFloat(faker.number.float({ min: 60, max: 100 }).toFixed(2)),
    intermediatePercentage: parseFloat(faker.number.float({ min: 60, max: 100 }).toFixed(2)),
    appliedCourse: faker.helpers.arrayElement(['B.Tech', 'B.Sc', 'BBA', 'BCA']),
    preferredBranch: faker.helpers.arrayElement(['Computer Science', 'Mechanical', 'IT', 'Electronics']),
    status: faker.helpers.arrayElement([
      'applied',
      'under_review',
      'interview_scheduled',
      'accepted',
      'waitlisted',
      'rejected',
      'enrolled',
      'withdrawn',
    ]),
    feePaid: faker.datatype.boolean(),
    scholarship: faker.datatype.boolean() ? faker.helpers.arrayElement(['Merit', 'Need-based']) : undefined,
    fatherName: faker.person.fullName({ sex: 'male' }),
    motherName: faker.person.fullName({ sex: 'female' }),
    annualIncome: faker.number.int({ min: 100000, max: 1000000 }),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    pincode: faker.location.zipCode('######'),
    documentsVerified: faker.datatype.boolean(),
    createdAt: faker.date.past({ years: 1 }),
    updatedAt: faker.date.recent(),
  }
})
