import React from 'react';
import {Label, LabelVariant} from 'components/elements';
import PlanCompliance from 'screens/tourPlan/planCompliance';
import {Strings} from 'common';
import styles from './styles';
import {COMPLAINCE_TYPE} from 'screens/tourPlan/constants';

/**
 *  Tour plan Side Panel
 * @returns Side Panel
 */
const TourPlanSidePanel = () => {
  return (
    <>
      <Label
        variant={LabelVariant.h4}
        title={Strings.planCompliance}
        style={styles.container}
      />
      <PlanCompliance type={COMPLAINCE_TYPE.MONTHLY} />
    </>
  );
};

export default TourPlanSidePanel;
