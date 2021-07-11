import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {Label, LabelVariant, RadioButtonGroup} from 'components/elements';
import {getFormatDate} from 'utils/dateTimeHelper';
import {translate} from 'locale';

const dayPlanActions = [
  {
    text: 'Doctor Visit',
    value: 1,
  },
  {
    text: 'Chemist Visit',
    value: 2,
  },
  {
    text: 'Review Meeting',
    value: 3,
  },
  {
    text: 'Camp',
    value: 4,
  },
  {
    text: 'Conference',
    value: 5,
  },
];

const MtpPerDayPlanRightPanel = ({route}) => {
  const changeDayPlanActionHandler = selectedAction => {
    console.log('action', selectedAction);
  };

  return (
    <View style={styles.container}>
      <Label
        variant={LabelVariant.subTitleLarge}
        style={styles.header}
        title={'Select from the list'}
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
