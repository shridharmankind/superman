import {Strings} from 'common';

export const rulesMapping = {
  MINIMUMPERDAYFORDOC: {
    title: `${Strings.planComplaince.minimum}`,
    subTitle: `${Strings.planComplaince.doctorVisitsPerDay}`,
  },
  MAXIMUMDAYFORDOC: {
    title: `${Strings.planComplaince.maximum}`,
    subTitle: `${Strings.planComplaince.doctorVisitsPerDay}`,
  },
  MINIMUMPERDAYFORCHE: {
    title: `${Strings.planComplaince.minimum}`,
    subTitle: `${Strings.planComplaince.chemistVisitsPerDay}`,
  },
  MAXIMUMDAYFORCHE: {
    title: `${Strings.planComplaince.maximum}`,
    subTitle: `${Strings.planComplaince.chemistVisitsPerDay}`,
  },
  DIFFERENCEOF4FORDOC: {
    title: `${Strings.planComplaince.daysGap}`,
    subTitle: `${Strings.planComplaince.minGap}`,
  },
  DIFFERENCEOF3FORDOC: {
    title: `${Strings.planComplaince.daysGap}`,
    subTitle: `${Strings.planComplaince.minGap}`,
  },
  DIFFERENCEOF2FORDOC: {
    title: `${Strings.planComplaince.daysGap}`,
    subTitle: `${Strings.planComplaince.minGap}`,
  },
  DOCTORCOVEREDINXDAYS: {
    title: '',
    subTitle: `${Strings.planComplaince.drCovered}`,
  },
  MINIMUMOUTSTATIONVISIT: {
    title: `${Strings.planComplaince.minimum}`,
    subTitle: `${Strings.planComplaince.outStationPerMonth}`,
  },
  MAXIMUMOUTSTATIONVISIT: {
    title: `${Strings.planComplaince.maximum}`,
    subTitle: `${Strings.planComplaince.outStationPerMonth}`,
  },
  MINIMUMEXSTATIONVISIT: {
    title: `${Strings.planComplaince.minimum}`,
    subTitle: `${Strings.planComplaince.exStationPerMonth}`,
  },
  MAXIMUMEXSTATIONVISIT: {
    title: `${Strings.planComplaince.maximum}`,
    subTitle: `${Strings.planComplaince.exStationPerMonth}`,
  },
  DOCTORCOVEREDINMONTH: {
    title: '',
    subTitle: `${Strings.planComplaince.drCovered}`,
  },
  CHEMISTCOVEREDINMONTH: {
    title: '',
    subTitle: `${Strings.planComplaince.chCovered}`,
  },
  ALLAREACOVERED: {
    title: '',
    subTitle: `${Strings.planComplaince.areaCovered}`,
  },
  ALLFREQUENCYMET: {
    title: `${Strings.dr}`,
    subTitle: `${Strings.planComplaince.frequencyMet}`,
  },
};
