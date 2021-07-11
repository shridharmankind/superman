import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Label, LabelVariant} from 'components/elements';

/**
 * componnet to plan the day - renders left side panel for the planning
 */
const MtpPerDayPlanLeftPanel = () => {
  return (
    <View style={styles.container}>
      <Label variant={LabelVariant.h3} title={'coming soon left'} />
    </View>
  );
};

export default MtpPerDayPlanLeftPanel;
