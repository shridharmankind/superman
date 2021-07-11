import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Label, LabelVariant, RadioButtonGroup} from 'components/elements';
import {translate} from 'locale';

/**
 * componnet to plan the day - renders left side panel for the planning
 */
const MtpPerDayPlanRightPanel = () => {
  const dayPlanActions = [
    {
      text: translate('tourPlan.dayPlan.drVisit'),
      value: 1,
    },
    {
      text: translate('tourPlan.dayPlan.chVisit'),
      value: 2,
    },
    {
      text: translate('tourPlan.dayPlan.nonFieldActivity'),
      value: 3,
    },
  ];
  const changeDayPlanActionHandler = selectedAction => {
    console.log('action', selectedAction);
  };

  return (
    <View style={styles.container}>
      <Label
        variant={LabelVariant.subTitleLarge}
        style={styles.header}
        title={translate('tourPlan.dayPlan.selectFromList')}
      />
      <View>
        <RadioButtonGroup
          radioList={dayPlanActions}
          initialSelected={dayPlanActions[0]}
          radioButtonChange={changeDayPlanActionHandler}
        />
      </View>
    </View>
  );
};

export default MtpPerDayPlanRightPanel;
