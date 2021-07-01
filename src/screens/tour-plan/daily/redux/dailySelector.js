import {createSelector} from '@reduxjs/toolkit';
import {sortByCategory} from 'screens/tourPlan/helper';
import {DOCTOR_VISIT_STATES} from 'screens/tourPlan/constants';

/**
 * selector function to retrieve data from redux store
 **/

const getDoctorDetailList = state => state.dailyState.doctorDetail.data;

const doctorDetailRemoveError = state => state.dailyState.doctorDetail.error;

const allDoctorDetailSelector = createSelector([getDoctorDetailList], data => {
  const completedStatus = DOCTOR_VISIT_STATES.COMPLETED.toLowerCase();

  /** Fetch parties having completed visits from all visits */
  const completedVisits = (data || []).filter(d => {
    const isPartyFound = (d?.visits || []).find(visit => {
      return (visit?.status || '').toLowerCase() === completedStatus;
    });
    return isPartyFound;
  });

  /** Fetch parties which have none of completed visits from all visits */
  const toDoVisits = (data || []).filter(el => {
    return completedVisits.every(f => {
      return f?.id !== el?.id;
    });
  });

  /** Assign dcrSubmitted date of completed visit to outer array of each party */
  const completedVisitsMap = (completedVisits || []).map(cv => {
    const visit = (cv?.visits || []).find(
      v => (v?.status || '').toLowerCase() === completedStatus,
    );
    return {
      ...cv,
      dcrSubmitted: visit.dcrSubmitted,
    };
  });

  /** Sorted completed visit parties on dcrSubmitted date in desc order i.e. latest the first */
  const sortedCompletedVisits = completedVisitsMap.sort((a, b) => {
    var c = new Date(a.dcrSubmitted);
    var d = new Date(b.dcrSubmitted);
    return d - c;
  });

  return {
    toDoVisits: sortByCategory(toDoVisits) || [],
    completedVisits: sortedCompletedVisits || [],
    allRecords: data || [],
  };
});

const doctorDetailErrorSelector = createSelector(
  [doctorDetailRemoveError],
  data => {
    return data;
  },
);

export const dailySelector = {
  allDoctorDetail: () => {
    return allDoctorDetailSelector;
  },
  doctorDetailError: () => {
    return doctorDetailErrorSelector;
  },
};
