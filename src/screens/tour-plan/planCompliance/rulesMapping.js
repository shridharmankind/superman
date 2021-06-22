import {Strings} from 'common';
import {COMPARISION_TYPE, RULE_KEY} from 'screens/tourPlan/constants';

export const rulesMapping = {
  MINIMUMPERDAYFORDOC: {
    title: `${Strings.planComplaince.minimum}`,
    subTitle: `${Strings.planComplaince.doctorVisitsPerDay}`,
    key: RULE_KEY.DOCTOR,
    checkType: COMPARISION_TYPE.MIN,
    showFraction: false,
    isDayCheck: true,
  },
  MAXIMUMDAYFORDOC: {
    title: `${Strings.planComplaince.maximum}`,
    subTitle: `${Strings.planComplaince.doctorVisitsPerDay}`,
    checkType: COMPARISION_TYPE.MAX,
    key: RULE_KEY.DOCTOR,
    showFraction: false,
    isDayCheck: true,
    showWarningMessage: true,
  },
  MINIMUMPERDAYFORCHE: {
    title: `${Strings.planComplaince.minimum}`,
    subTitle: `${Strings.planComplaince.chemistVisitsPerDay}`,
    checkType: COMPARISION_TYPE.MIN,
    key: RULE_KEY.CHEMIST,
    showFraction: false,
    isDayCheck: true,
  },
  MAXIMUMDAYFORCHE: {
    title: `${Strings.planComplaince.maximum}`,
    subTitle: `${Strings.planComplaince.chemistVisitsPerDay}`,
    checkType: COMPARISION_TYPE.MAX,
    key: RULE_KEY.CHEMIST,
    showFraction: false,
    isDayCheck: true,
    showWarningMessage: true,
  },
  DIFFERENCEOF4FORDOC: {
    title: `${Strings.planComplaince.daysGap}`,
    subTitle: `${Strings.planComplaince.minGap}`,
    showFraction: false,
  },
  DIFFERENCEOF3FORDOC: {
    title: `${Strings.planComplaince.daysGap}`,
    subTitle: `${Strings.planComplaince.minGap}`,
    showFraction: false,
  },
  DIFFERENCEOF2FORDOC: {
    title: `${Strings.planComplaince.daysGap}`,
    subTitle: `${Strings.planComplaince.minGap}`,
    showFraction: false,
  },
  DOCTORCOVEREDINXDAYS: {
    title: '',
    subTitle: `${Strings.planComplaince.drCovered}`,
    key: RULE_KEY.DOCTOR_IN_X_DAYS,
    showFraction: true,
  },
  MINIMUMOUTSTATIONVISIT: {
    title: `${Strings.planComplaince.minimum}`,
    subTitle: `${Strings.planComplaince.outStationPerMonth}`,
    showFraction: true,
  },
  MAXIMUMOUTSTATIONVISIT: {
    title: `${Strings.planComplaince.maximum}`,
    subTitle: `${Strings.planComplaince.outStationPerMonth}`,
    showFraction: false,
  },
  MINIMUMEXSTATIONVISIT: {
    title: `${Strings.planComplaince.minimum}`,
    subTitle: `${Strings.planComplaince.exStationPerMonth}`,
    showFraction: false,
  },
  MAXIMUMEXSTATIONVISIT: {
    title: `${Strings.planComplaince.maximum}`,
    subTitle: `${Strings.planComplaince.exStationPerMonth}`,
    showFraction: false,
  },
  DOCTORCOVEREDINMONTH: {
    title: '',
    subTitle: `${Strings.planComplaince.drCoveredInMonth}`,
    key: RULE_KEY.DOCTOR_COVERED_IN_MONTH,
    checkType: COMPARISION_TYPE.MIN,
    showFraction: true,
  },
  CHEMISTCOVEREDINMONTH: {
    title: '',
    subTitle: `${Strings.planComplaince.chCoveredInMonth}`,
    checkType: COMPARISION_TYPE.MIN,
    key: RULE_KEY.CHEMIST_COVERED_IN_MONTH,
    showFraction: true,
  },
  ALLAREACOVERED: {
    title: '',
    subTitle: `${Strings.planComplaince.areaCovered}`,
    key: RULE_KEY.AREA,
    checkType: COMPARISION_TYPE.MIN,
    showFraction: true,
  },
  ALLFREQUENCYMET: {
    title: '',
    subTitle: `${Strings.planComplaince.frequencyMet}`,
    key: RULE_KEY.FREQUENCY_MET,
    checkType: COMPARISION_TYPE.MIN,
    showFraction: true,
  },
};
