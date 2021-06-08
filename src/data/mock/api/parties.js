import {getFormatDate} from 'utils/dateTimeHelper';
import dayjs from 'dayjs';

const getDate = range => {
  const dateAsPerRange = dayjs().add(range, 'day');
  return {
    date: getFormatDate({date: dateAsPerRange, format: 'D'}),
    month: getFormatDate({date: dateAsPerRange, format: 'MMM'}),
  };
};

export const partiesMock = {
  getParties: {
    response: [
      {
        key: 1,
        id: 4,
        name: 'Ashish Gulati',
        specialization: ['Cardiologist'],
        category: 'A+',
        location: 'Karol Bagh',
        birthday: '2021-05-19T18:25:11',
        anniversary: '1990-09-19T18:25:11',
        selfDispensing: false,
        isKyc: true,
        potential: 2253,
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
        visitData: [
          {
            date: getDate(-4).date,
            month: getDate(-4).month,
            state: 'COMPLETED',
          },
          {
            date: getDate(0).date,
            month: getDate(0).month,
            state: 'TODAY',
          },
          {
            date: getDate(5).date,
            month: getDate(5).month,
            state: 'UPCOMING',
          },
        ],
      },
      {
        key: 2,
        id: 2,
        name: 'Manish Kumar ',
        specialization: ['Cardiologist'],
        category: 'B',
        location: 'Karol Bagh',
        birthday: '2021-05-19T18:25:11',
        anniversary: '1990-09-23T18:25:11',
        selfDispensing: false,
        isKyc: false,
        potential: 22530,
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
        visitData: [
          {
            date: getDate(-2).date,
            month: getDate(-2).month,
            state: 'MISSED',
          },
          {
            date: getDate(0).date,
            month: getDate(0).month,
            state: 'TODAY',
          },
          {
            date: getDate(6).date,
            month: getDate(6).month,
            state: 'UPCOMING',
          },
        ],
      },
      {
        key: 3,
        id: 3,
        name: 'Manoj Manjhi',
        specialization: ['Cardiologist'],
        category: 'C',
        location: 'Karol Bagh',
        birthday: '2021-05-19T18:25:11',
        anniversary: '1990-07-23T18:25:11',
        selfDispensing: true,
        isKyc: true,
        potential: 22000,
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
        visitData: [
          {
            date: getDate(0).date,
            month: getDate(0).month,
            state: 'TODAY',
          },
          {
            date: getDate(8).date,
            month: getDate(8).month,
            state: 'UPCOMING',
          },
        ],
      },
      {
        key: 4,
        id: 1,
        name: 'Manoj Manjhi',
        specialization: ['Cardiologist'],
        category: 'A+',
        location: 'Karol Bagh',
        birthday: '2021-05-19T18:25:11',
        anniversary: '2021-06-28T18:25:11',
        selfDispensing: false,
        isKyc: true,
        potential: 100000,
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
        visitData: [
          {
            date: getDate(-2).date,
            month: getDate(-2).month,
            state: 'COMPLETED',
          },
          {
            date: getDate(0).date,
            month: getDate(0).month,
            state: 'TODAY',
          },
          {
            date: getDate(3).date,
            month: getDate(3).month,
            state: 'UPCOMING',
          },
        ],
      },
      {
        key: 5,
        id: 5,
        name: 'Tanmay Singh',
        specialization: ['Dermatologist'],
        birthday: '2021-05-19T18:25:11',
        anniversary: '2021-09-26T18:25:11',
        selfDispensing: false,
        isKyc: true,
        potential: 80000,
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
        visitData: [
          {
            date: getDate(-6).date,
            month: getDate(-6).month,
            state: 'MISSED',
          },
          {
            date: getDate(0).date,
            month: getDate(0).month,
            state: 'TODAY',
          },
          {
            date: getDate(5).date,
            month: getDate(5).month,
            state: 'UPCOMING',
          },
        ],
      },
      {
        key: 6,
        id: 6,
        name: 'Balaji Medicos ',
        specialization: ['Chemist'],
        birthday: '2021-05-19T18:25:11',
        anniversary: '1990-05-27T18:25:11',
        selfDispensing: false,
        isKyc: false,
        potential: 34000,
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
        visitData: [
          {
            date: getDate(0).date,
            month: getDate(0).month,
            state: 'TODAY',
          },
          {
            date: getDate(9).date,
            month: getDate(9).month,
            state: 'UPCOMING',
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
