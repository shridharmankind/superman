const stpData = [
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 0,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: true,
    },
    isCompliant: true,
    week: 1,
    weekDay: 'Monday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 0,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: true,
      isNoOfVisitHigh: true,
    },
    isCompliant: true,
    week: 1,
    weekDay: 'Tuesday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 0,
      },
      {
        partyType: 'Chemist',
        count: 0,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: true,
    },
    isCompliant: true,
    week: 1,
    weekDay: 'Wednesday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: true,
    },
    isCompliant: false,
    week: 1,
    weekDay: 'Thursday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: true,
      isNoOfVisitHigh: true,
    },
    isCompliant: true,
    week: 1,
    weekDay: 'Friday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: true,
      isNoOfVisitHigh: false,
    },

    isCompliant: true,
    week: 2,
    weekDay: 'Monday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: true,
      isNoOfVisitHigh: false,
    },

    isCompliant: true,
    week: 2,
    weekDay: 'Tuesday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1 patch1 patch1 patch1 patch1',
      isExStation: true,
    },

    isCompliant: true,
    week: 2,
    weekDay: 'Wednesday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: false,
    },

    isCompliant: true,
    week: 2,
    weekDay: 'Thursday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: false,
    },

    isCompliant: true,
    week: 2,
    weekDay: 'Friday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: true,
    },

    isCompliant: true,
    week: 3,
    weekDay: 'Monday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: false,
    },

    isCompliant: true,
    week: 3,
    weekDay: 'Tuesday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: false,
    },

    isCompliant: true,
    week: 3,
    weekDay: 'Wednesday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: false,
    },

    isCompliant: true,
    week: 3,
    weekDay: 'Thursday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: false,
    },

    isCompliant: true,
    week: 3,
    weekDay: 'Friday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: true,
    },

    isCompliant: false,
    week: 4,
    weekDay: 'Monday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: true,
    },

    isCompliant: false,
    week: 4,
    weekDay: 'Tuesday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Is: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: true,
    },

    isCompliant: true,
    week: 4,
    weekDay: 'Wednesday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: true,
    },

    isCompliant: true,
    week: 4,
    weekDay: 'Thursday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 12,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: true,
    },

    isCompliant: true,
    week: 4,
    weekDay: 'Friday',
  },
];

export default stpData;
