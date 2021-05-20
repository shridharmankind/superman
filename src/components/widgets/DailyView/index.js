import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import theme from 'themes';
const currentMonth = new Date().getMonth() + 1;

const DailyView = ({props}) => {
  return (
    <View style={styles.dailyViewContainer}>
      <View style={styles.headerContent}>
        <Text>{'12 Vistis'}</Text>
        <Text
          style={{
            color:
              props.date.month !== currentMonth
                ? theme.colors.grey
                : theme.colors.black,
          }}>
          {props.date.day}
        </Text>
      </View>

      <View>
        <Text>{'6 KYC'}</Text>
        <Text>{'6 KYC'}</Text>
      </View>

      <View style={styles.bottomContent}>
        <Text>{'title'}</Text>
        <Text>{'title'}</Text>
      </View>
    </View>
  );
};

export default DailyView;
