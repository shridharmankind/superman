export {
  StandardPlanModal,
  StandardPlanContainer,
  StandardPlan,
} from './standard';
export {default as Schedule} from './schedule';
export {default as MonthlyTourPlan} from './monthly';
export {default as DailyTourPlan} from './daily';
export {default as PlanCompliance} from './planCompliance';
export {default as TourPlanSidePanel} from './sidePanel';
export {MtpPerDayPlan} from './mtp';

import React from 'react';
import Schedule from './schedule';
import SidePanel from './sidePanel';
import {ContentWithSidePanel} from 'components/layouts';

/**
 * @param {Object} navigation
 * @returns  Tour planning component conatiner
 */
const TourPlanning = ({navigation}) => {
  return (
    <ContentWithSidePanel sidePanel={<SidePanel />}>
      <Schedule navigation={navigation} />
    </ContentWithSidePanel>
  );
};

export default TourPlanning;
