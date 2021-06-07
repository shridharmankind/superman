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
        id: 1,
        name: 'Dr. Ashish Gulati',
        specialization: ['Cardiologist'],
        category: 'KYC',
        location: 'Karol Bagh',
        birthday: '2021-05-19T18:25:11',
        anniversary: '2021-05-19T18:25:11',
        selfDispensing: false,
        engagement: [
          {startDate: '2020-01-19T00:00:00', endDate: null},
          {startDate: '2020-05-20T00:00:00', endDate: '2020-06-21T00:00:00'},
          {startDate: '2020-07-25T00:00:00', endDate: '2020-12-17T00:00:00'},
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
        name: 'Dr. Manish Kumar ',
        specialization: ['Cardiologist'],
        category: 'a+',
        location: 'Karol Bagh',
        birthday: '2021-05-19T18:25:11',
        anniversary: '2021-05-19T18:25:11',
        selfDispensing: false,
        engagement: [
          {startDate: '2020-01-19T00:00:00', endDate: null},
          {startDate: '2020-05-20T00:00:00', endDate: '2020-06-21T00:00:00'},
          {startDate: '2020-07-25T00:00:00', endDate: '2020-12-17T00:00:00'},
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
        name: 'Dr. Manoj Manjhi',
        specialization: ['Cardiologist'],
        category: 'b',
        location: 'Karol Bagh',
        birthday: '2021-05-19T18:25:11',
        anniversary: '2021-05-19T18:25:11',
        selfDispensing: true,
        engagement: [
          {startDate: '2020-01-19T00:00:00', endDate: null},
          {startDate: '2020-05-20T00:00:00', endDate: '2020-06-21T00:00:00'},
          {startDate: '2020-07-25T00:00:00', endDate: '2020-12-17T00:00:00'},
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
        id: 4,
        name: 'Dr. Manoj Manjhi',
        specialization: ['Cardiologist'],
        category: 'KYC',
        location: 'Karol Bagh',
        birthday: '2021-05-19T18:25:11',
        anniversary: '2021-05-19T18:25:11',
        selfDispensing: false,
        engagement: [
          {startDate: '2020-01-19T00:00:00', endDate: null},
          {startDate: '2020-05-20T00:00:00', endDate: '2020-06-21T00:00:00'},
          {startDate: '2020-07-25T00:00:00', endDate: '2020-12-17T00:00:00'},
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
        name: 'Dr. Tanmay Singh',
        specialization: ['Dermatologist'],
        birthday: '2021-05-19T18:25:11',
        anniversary: '2021-05-19T18:25:11',
        selfDispensing: false,
        engagement: [
          {startDate: '2020-01-19T00:00:00', endDate: null},
          {startDate: '2020-05-20T00:00:00', endDate: '2020-06-21T00:00:00'},
          {startDate: '2020-07-25T00:00:00', endDate: '2020-12-17T00:00:00'},
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
        anniversary: '2021-05-19T18:25:11',
        selfDispensing: false,
        engagement: [
          {startDate: '2020-01-19T00:00:00', endDate: null},
          {startDate: '2020-05-20T00:00:00', endDate: '2020-06-21T00:00:00'},
          {startDate: '2020-07-25T00:00:00', endDate: '2020-12-17T00:00:00'},
        ],
        category: '-',
        location: 'Karol Bagh',
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
