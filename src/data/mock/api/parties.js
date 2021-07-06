import {getFormatDate} from 'utils/dateTimeHelper';
import dayjs from 'dayjs';

const getDate = range => {
  const dateAsPerRange = dayjs().add(range, 'day');
  return getFormatDate({date: dateAsPerRange});
};

export const partiesMock = {
  getParties: {
    response: [
      {
        key: 1,
        id: 4,
        name: 'ASHISH GULATI',
        specialities: [
          {
            id: 1,
            name: 'Orthopaedic',
            shortName: 'Ortho',
          },
        ],
        category: 'a+',
        location: 'Karol Bagh',
        birthday: '2021-05-19T18:25:11',
        anniversary: '1990-09-19T18:25:11',
        selfDispensing: false,
        isKyc: true,
        potential: 2253,
        gender: 'M',
        partyTypes: {
          id: 1,
          name: 'Doctor',
          shortName: 'Doc',
          partyTypeGroup: {
            id: 1,
            name: 'PartyGroup1',
            shortName: 'Group1',
          },
        },
        engagement: [
          {startDate: '2020-01-19T00:00:00', endDate: null},
          {startDate: '2019-01-20T00:00:00', endDate: '2019-12-30T00:00:00'},
          {startDate: '2018-04-25T00:00:00', endDate: '2018-10-20T00:00:00'},
        ],
        visits: [
          {
            date: getDate(-4),
            status: 'COMPLETED',
            isAdhoc: true,
          },
          {
            date: getDate(0),
            status: 'TODAY',
            isAdhoc: true,
          },
          {
            date: getDate(5),
            status: 'UPCOMING',
            isAdhoc: false,
          },
        ],
      },
      {
        key: 2,
        id: 2,
        name: 'Manish Kumar ',
        specialities: [
          {
            id: 1,
            name: 'Cardiologist',
            shortName: 'Cardio',
          },
        ],
        category: 'B',
        location: 'Karol Bagh',
        birthday: '2021-05-19T18:25:11',
        anniversary: '1990-09-23T18:25:11',
        selfDispensing: false,
        isKyc: false,
        potential: 22530,
        gender: 'M',
        partyTypes: {
          id: 1,
          name: 'Doctor',
          shortName: 'Doc',
          partyTypeGroup: {
            id: 1,
            name: 'PartyGroup1',
            shortName: 'Group1',
          },
        },
        engagement: [
          {startDate: '2020-01-19T00:00:00', endDate: null},
          {startDate: '2019-01-20T00:00:00', endDate: '2019-12-30T00:00:00'},
          {startDate: '2018-04-25T00:00:00', endDate: '2018-10-20T00:00:00'},
        ],
        visits: [
          {
            date: getDate(-2),
            status: 'MISSED',
            isAdhoc: false,
          },
          {
            date: getDate(0),
            status: 'TODAY',
            isAdhoc: false,
          },
          {
            date: getDate(6),
            status: 'UPCOMING',
            isAdhoc: false,
          },
        ],
      },
      {
        key: 3,
        id: 3,
        name: 'Anmol Yadav',
        specialities: [
          {
            id: 1,
            name: 'Orthopaedic',
            shortName: 'Ortho',
          },
        ],
        category: 'C',
        location: 'Karol Bagh',
        birthday: '2021-05-19T18:25:11',
        anniversary: '1990-07-23T18:25:11',
        selfDispensing: true,
        isKyc: true,
        potential: 22000,
        gender: 'M',
        partyTypes: {
          id: 1,
          name: 'Doctor',
          shortName: 'Doc',
          partyTypeGroup: {
            id: 1,
            name: 'PartyGroup1',
            shortName: 'Group1',
          },
        },
        engagement: [
          {startDate: '2020-01-19T00:00:00', endDate: null},
          {startDate: '2019-01-20T00:00:00', endDate: '2019-12-30T00:00:00'},
          {startDate: '2018-04-25T00:00:00', endDate: '2018-10-20T00:00:00'},
        ],
        visits: [
          {
            date: getDate(0),
            status: 'TODAY',
            isAdhoc: true,
          },
          {
            date: getDate(8),
            status: 'UPCOMING',
            isAdhoc: false,
          },
        ],
      },
      {
        key: 4,
        id: 1,
        name: 'MANOJ MANJHI',
        specialities: [
          {
            id: 2,
            name: 'Neurologist',
            shortName: 'Neuro',
          },
        ],
        category: 'A+',
        location: 'Karol Bagh',
        birthday: '2021-05-19T18:25:11',
        anniversary: '2021-06-28T18:25:11',
        selfDispensing: false,
        isKyc: true,
        potential: 100000,
        gender: 'M',
        partyTypes: {
          id: 1,
          name: 'Doctor',
          shortName: 'Doc',
          partyTypeGroup: {
            id: 1,
            name: 'PartyGroup1',
            shortName: 'Group1',
          },
        },
        engagement: [
          {startDate: '2020-01-19T00:00:00', endDate: null},
          {startDate: '2019-01-20T00:00:00', endDate: '2019-12-30T00:00:00'},
          {startDate: '2018-04-25T00:00:00', endDate: '2018-10-20T00:00:00'},
        ],
        visits: [
          {
            date: getDate(-2),
            status: 'COMPLETED',
            isAdhoc: true,
          },
          {
            date: getDate(0),
            status: 'TODAY',
            isAdhoc: false,
          },
          {
            date: getDate(3),
            status: 'UPCOMING',
            isAdhoc: true,
          },
        ],
      },
      {
        key: 5,
        id: 5,
        name: 'Tanmay Singh',
        specialities: [
          {
            id: 2,
            name: 'Orthopaedic',
            shortName: 'Ortho',
          },
        ],
        birthday: '2021-05-19T18:25:11',
        anniversary: null,
        selfDispensing: false,
        isKyc: true,
        potential: 80000,
        gender: 'M',
        partyTypes: {
          id: 1,
          name: 'Doctor',
          shortName: 'Doc',
          partyTypeGroup: {
            id: 1,
            name: 'PartyGroup1',
            shortName: 'Group1',
          },
        },
        engagement: [
          {startDate: '2020-01-19T00:00:00', endDate: null},
          {startDate: '2019-01-20T00:00:00', endDate: '2019-12-30T00:00:00'},
          {startDate: '2018-04-25T00:00:00', endDate: '2018-10-20T00:00:00'},
        ],
        category: 'B',
        location: 'Karol Bagh',
        visits: [
          {
            date: getDate(-6),
            status: 'MISSED',
            isAdhoc: false,
          },
          {
            date: getDate(0),
            status: 'TODAY',
            isAdhoc: false,
          },
          {
            date: getDate(5),
            status: 'UPCOMING',
            isAdhoc: false,
          },
        ],
      },
      {
        key: 6,
        id: 6,
        name: 'Balaji Medicos ',
        specialities: [
          {
            id: 2,
            name: 'Chemist',
            shortName: 'Che',
          },
        ],
        birthday: '2021-05-19T18:25:11',
        anniversary: '1990-05-27T18:25:11',
        selfDispensing: false,
        isKyc: false,
        potential: 34000,
        gender: 'M',
        engagement: [
          {startDate: '2020-01-19T00:00:00', endDate: null},
          {startDate: '2019-01-20T00:00:00', endDate: '2019-12-30T00:00:00'},
          {startDate: '2018-04-25T00:00:00', endDate: '2018-10-20T00:00:00'},
        ],
        category: '-',
        location: 'Karol Bagh',
        partyTypes: {
          id: 1,
          name: 'Chemist',
          shortName: 'Chemist',
          partyTypeGroup: {
            id: 1,
            name: 'PartyGroup1',
            shortName: 'Group1',
          },
        },
        visits: [
          {
            date: getDate(0),
            status: 'TODAY',
            isAdhoc: true,
          },
          {
            date: getDate(9),
            status: 'UPCOMING',
            isAdhoc: false,
          },
        ],
      },
    ],
    request: {
      staffPositionId: 1,
      day: 5,
      month: 5,
      year: 2021,
    },
  },
};
