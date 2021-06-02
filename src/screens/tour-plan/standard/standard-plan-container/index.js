import React from 'react';
import {WeekView} from 'components/widgets';
import {Strings} from 'common';

/**
 * Standard Tour Plan container
 */
const StandardPlanContainer = ({workingDays, navigation}) => {
  /**
   * Handle Week View click  event
   * @param {string} header represemts cell Header
   * @param {string} row represents row clicked
   */
  const handleOnClickWeekView = (header, row) =>
    navigation.navigate('StandardPlan', {
      header,
      row,
      workingDays,
      year: new Date().getFullYear(), //need current year
    });
  return (
    <WeekView
      workingDays={workingDays}
      columnHeader={Strings.week}
      onPressHandler={handleOnClickWeekView}
    />
  );
};

export default React.memo(StandardPlanContainer);
