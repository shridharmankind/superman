import React from 'react';
import {View} from 'react-native';
import {WeekView} from 'components/elements';
import {Strings} from 'common';
import styles from './styles';

const StandardTour = () => {
  //TODO: data from API .
  const workingDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <View style={styles.container}>
      <WeekView workingDays={workingDays} columnHeader={Strings.week} />
    </View>
  );
};

export default StandardTour;
