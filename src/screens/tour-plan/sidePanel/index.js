import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Label, LabelVariant} from 'components/elements';
import PlanCompliance from 'screens/tourPlan/planCompliance';
import {Strings} from 'common';
import styles from './styles';
import {COMPLAINCE_TYPE} from 'screens/tourPlan/constants';
import {monthlyTourPlanSelector} from 'screens/tourPlan/monthly/redux';

/**
 *  Tour plan Side Panel
 * @returns Side Panel
 */
const TourPlanSidePanel = () => {
  const [isStandardTourPlanSelected, setIsStandardTourPlanSelected] =
    useState(false);

  // selected plan option
  const selectedPlanOption = useSelector(
    monthlyTourPlanSelector.selectedPlanOption(),
  );

  /**
   * @returns Side panel component
   */
  const renderSidePanel = () => {
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

  useEffect(() => {
    setIsStandardTourPlanSelected(
      selectedPlanOption && selectedPlanOption?.id === 1,
    );
  }, [selectedPlanOption]);

  return isStandardTourPlanSelected ? renderSidePanel() : null;
};

export default TourPlanSidePanel;
