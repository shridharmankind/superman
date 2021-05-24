export {
  StandardPlanModal,
  StandardPlanContainer,
  StandardPlan,
} from './standard';
export {default as Schedule} from './schedule';
export {default as MonthlyTourPlan} from './monthly';
export {default as DailyTourPlan} from './daily';

import React from 'react';

import Schedule from './schedule';
import {ContentWithSidePanel} from 'components/layouts';

const TourPlanning = ({navigation}) => {
  return (
    <ContentWithSidePanel>
      <Schedule navigation={navigation} />
    </ContentWithSidePanel>
  );
};

export default TourPlanning;
