import { faker } from '@faker-js/faker'

export const companyListMock = [
    {
      id: 1,
      title: "Google",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
      badges: {
        isHot: true,
        isCreatorLove: true,
      },
      creator: "25/10/2014",
      rating: {
        percentage: 86,
        votes: 873,
      },
      stats: {
        online: 1858,
        visits: "124",
      },
      driveDate: "25 Oct 2023"
    },
    {
      id: 2,
      title: "Infosys",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/2560px-Infosys_logo.svg.png",
      badges: {
        isHot: true,
      },
      creator: "FreakyFour",
      rating: {
        percentage: 23,
        votes: 873,
      },
      stats: {
        online: 1858,
        visits: "266",
      },
      driveDate: "25 Oct 2023"
    },
    {
      id: 3,
      title: "Amazon",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
      creator: "Nickname",
      rating: {
        percentage: 54,
        votes: 873,
      },
      stats: {
        online: 1858,
        visits: "11M",
      },
      driveDate: "25 Oct 2023"
    },
    {
      id: 4,
      title: "Wipro",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png",
      badges: {
        isCreatorLove: true,
      },
      creator: "Nickname",
      rating: {
        percentage: 23,
        votes: 873,
      },
      stats: {
        online: 1858,
        visits: "11M",
      },
      driveDate: "25 Oct 2023"
    },
    {
      id: 5,
      title: "Accenture",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/1200px-Accenture.svg.png",
      badges: {
        isHot: true,
        isCreatorLove: true,
      },
      creator: "15/08/2010",
      rating: {
        percentage: 91,
        votes: 1200,
      },
      stats: {
        online: 2500,
        visits: "8.5M",
      },
      driveDate: "25 Oct 2023"
    },
];

export const placementCandidatesMock = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    username: faker.internet
      .username({ firstName, lastName })
      .toLocaleLowerCase(),
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    
    status: faker.helpers.arrayElement([
      'placed',
      'no show',
      'pending',
      'rejected',
    ]),
    role: faker.helpers.arrayElement([
      'superadmin',
      'admin',
      'cashier',
      'manager',
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
