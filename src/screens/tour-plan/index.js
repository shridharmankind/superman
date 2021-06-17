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

import React from 'react';
import Schedule from './schedule';
import TourPlanSidePanel from './sidePanel';
import {ContentWithSidePanel} from 'components/layouts';

const TourPlanning = ({navigation}) => {
  return (
    <ContentWithSidePanel sidePanel={<TourPlanSidePanel />}>
      <Schedule navigation={navigation} />
    </ContentWithSidePanel>
  );
};

export default TourPlanning;
