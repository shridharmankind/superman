const mtpData = [
  {
    patchId: 1,
    displayName: 'Patch1',
    defaultName: 'DefPatch1',
    dated: '1-jun-2021',
    date: {day: 1, month: 7, year: 2021},
    parties: [
      {
        partyType: 'Doctor',

        count: 1,
      },
      {
        partyType: 'Chemist',

        count: 1,
      },
    ],
    noOfKyc: 1,
    noOfCampaign: 1,
    patch: {
      id: 418,

      defaultName: 'TestUpdate',

      displayName: 'TestUpdate',

      isExStation: false,

      isNoOfVisitHigh: true,
    },
    dayType: 'Working',
  },
  {
    patchId: 2,
    displayName: 'Patch2',
    defaultName: 'DefPatch2',
    dated: '2-jun-2021',
    date: {day: 2, month: 7, year: 2021},
    parties: [
      {
        partyType: 'Doctor',

        count: 1,
      },
      {
        partyType: 'Chemist',

        count: 1,
      },
    ],
    noOfKyc: 2,
    patch: {
      id: 418,

      defaultName: 'TestUpdate',

      displayName: 'TestUpdate',

      isExStation: false,

      isNoOfVisitHigh: false,
    },
    dayType: 'Working',
  },
  {
    patchId: 3,
    displayName: 'Patch2',
    defaultName: 'DefPatch2',
    dated: '6-jun-2021',
    date: {day: 6, month: 7, year: 2021},
    parties: [
      {
        partyType: 'Doctor',

        count: 1,
      },
      {
        partyType: 'Chemist',

        count: 1,
      },
    ],
    noOfCampaign: 3,
    patch: {
      id: 418,

      defaultName: 'TestUpdate',

      displayName: 'TestUpdate',

      isExStation: false,

      isNoOfVisitHigh: false,
    },
    dayType: 'holiday',
  },
  {
    patchId: 5,
    displayName: 'Patch2',
    defaultName: 'DefPatch2',
    dated: '5-jun-2021',
    date: {day: 5, month: 7, year: 2021},
    parties: [
      {
        partyType: 'Doctor',

        count: 1,
      },
      {
        partyType: 'Chemist',

        count: 1,
      },
    ],
    noOfKyc: 3,
    noOfCampaign: 3,
    patch: {
      id: 418,

      defaultName: 'TestUpdate',

      displayName: 'TestUpdate',

      isExStation: false,

      isNoOfVisitHigh: false,
    },
    dayType: 'leave',
  },
];

export default mtpData;
