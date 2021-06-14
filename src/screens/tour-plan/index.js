export {
  StandardPlanModal,
  StandardPlanContainer,
  StandardPlan,
} from './standard';
export {default as Schedule} from './schedule';
export {default as MonthlyTourPlan} from './monthly';
export {default as DailyTourPlan} from './daily';
export {default as PlanCompliance} from './planCompliance';

import React from 'react';

import Schedule from './schedule';
import {ContentWithSidePanel} from 'components/layouts';
import PlanCompliance from 'screens/tourPlan/planCompliance';

const TourPlanning = ({navigation}) => {
  return (
    <ContentWithSidePanel sidePanel={<PlanCompliance />}>
      <Schedule navigation={navigation} />
    </ContentWithSidePanel>
  );
};

export default TourPlanning;
