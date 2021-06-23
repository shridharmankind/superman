import {COMPARISION_TYPE, RULE_KEY} from 'screens/tourPlan/constants';

export const rulesMapping = {
  MINIMUMPERDAYFORDOC: {
    title: 'minimum',
    subTitle: 'doctorVisitsPerDay',
    key: RULE_KEY.DOCTOR,
    checkType: COMPARISION_TYPE.MIN,
    showFraction: false,
    isDayCheck: true,
  },
  MAXIMUMDAYFORDOC: {
    title: 'maximum',
    subTitle: 'doctorVisitsPerDay',
    checkType: COMPARISION_TYPE.MAX,
    key: RULE_KEY.DOCTOR,
    showFraction: false,
    isDayCheck: true,
    showWarningMessage: true,
  },
  MINIMUMPERDAYFORCHE: {
    title: 'minimum',
    subTitle: 'chemistVisitsPerDay',
    checkType: COMPARISION_TYPE.MIN,
    key: RULE_KEY.CHEMIST,
    showFraction: false,
    isDayCheck: true,
  },
  MAXIMUMDAYFORCHE: {
    title: 'maximum',
    subTitle: 'chemistVisitsPerDay',
    checkType: COMPARISION_TYPE.MAX,
    key: RULE_KEY.CHEMIST,
    showFraction: false,
    isDayCheck: true,
    showWarningMessage: true,
  },
  DIFFERENCEOF4FORDOC: {
    title: 'daysGap',
    subTitle: 'minGap',
    showFraction: false,
    checkType: null,
  },
  DIFFERENCEOF3FORDOC: {
    title: 'daysGap',
    subTitle: 'minGap',
    showFraction: false,
    checkType: null,
  },
  DIFFERENCEOF2FORDOC: {
    title: 'daysGap',
    subTitle: 'minGap',
    showFraction: false,

    checkType: null,
  },
  DOCTORCOVEREDINXDAYS: {
    title: '',
    subTitle: 'drCovered',
    key: RULE_KEY.DOCTOR_IN_X_DAYS,
    showFraction: true,

    checkType: null,
  },
  MINIMUMOUTSTATIONVISIT: {
    title: 'minimum',
    subTitle: 'outStationPerMonth',
    showFraction: true,
    checkType: null,
  },
  MAXIMUMOUTSTATIONVISIT: {
    title: 'maximum',
    subTitle: 'outStationPerMonth',
    showFraction: false,
    checkType: null,
  },
  MINIMUMEXSTATIONVISIT: {
    title: 'minimum',
    subTitle: 'exStationPerMonth',
    showFraction: false,

    checkType: null,
  },
  MAXIMUMEXSTATIONVISIT: {
    title: 'maximum',
    subTitle: 'exStationPerMonth',
    showFraction: false,

    checkType: null,
  },
  DOCTORCOVEREDINMONTH: {
    title: '',
    subTitle: 'drCoveredInMonth',
    key: RULE_KEY.DOCTOR_COVERED_IN_MONTH,
    checkType: COMPARISION_TYPE.MIN,
    showFraction: true,
  },
  CHEMISTCOVEREDINMONTH: {
    title: '',
    subTitle: 'chCoveredInMonth',
    checkType: COMPARISION_TYPE.MIN,
    key: RULE_KEY.CHEMIST_COVERED_IN_MONTH,
    showFraction: true,
  },
  AREASCOVERED: {
    title: '',
    subTitle: 'areaCovered',
    key: RULE_KEY.AREA,
    checkType: COMPARISION_TYPE.MIN,
    showFraction: true,
  },
  ALLFREQUENCYMET: {
    title: '',
    subTitle: 'frequencyMet',
    key: RULE_KEY.FREQUENCY_MET,
    checkType: COMPARISION_TYPE.MIN,
    showFraction: true,
  },
  DOCTORVISITFREQUENCY: {
    title: '',
    subTitle: 'frequencyMet',
    key: RULE_KEY.FREQUENCY_MET,
    checkType: COMPARISION_TYPE.MIN,
    showFraction: true,
  },
};
