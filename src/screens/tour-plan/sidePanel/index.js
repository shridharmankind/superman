import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Label, LabelVariant} from 'components/elements';
import PlanCompliance from 'screens/tourPlan/planCompliance';
import {Strings} from 'common';
import styles from './styles';
import {COMPLAINCE_TYPE} from 'screens/tourPlan/constants';
import {monthlyTourPlanSelector} from 'screens/tourPlan/monthly/redux';
import {STANDARD_TOUR_PLAN_ID} from 'screens/tourPlan/constants';
/**
 * @returns Side Panel
 */
const SidePanel = () => {
  const [isStandardTourPlanSelected, setIsStandardTourPlanSelected] =
    useState(false);

  // selected plan option
  const selectedPlanOption = useSelector(
    monthlyTourPlanSelector.selectedPlanOption(),
  );

  /**
   * @returns plan complaince panel
   */
  const renderPlanComplaince = () => {
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

  /**
   * Effect to update selected tour plan
   */
  useEffect(() => {
    setIsStandardTourPlanSelected(
      selectedPlanOption && selectedPlanOption?.id === STANDARD_TOUR_PLAN_ID,
    );
  }, [selectedPlanOption]);

  return isStandardTourPlanSelected ? renderPlanComplaince() : null;
};

export default SidePanel;
