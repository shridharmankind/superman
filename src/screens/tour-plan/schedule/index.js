import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import styles from './styles';
import {TabBar} from 'components/widgets';
import {DailyTourPlan, MonthlyTourPlan} from 'screens/tourPlan';
import {Strings} from 'common';

const Schedule = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const data = [
    {
      text: `${Strings.dailyPlan}`,
    },
    {
      text: `${Strings.tourPlan}`,
    },
  ];
  const myTabNavigator = () => {
    return <TabBar values={data} onPress={onTabPress} />;
  };

  const onTabPress = itemIdx => {
    setSelectedTabIndex(itemIdx);
  };

  const renderChildView = () => {
    switch (selectedTabIndex) {
      case 0:
        return <DailyTourPlan />;
      case 1:
        return <MonthlyTourPlan />;
      default:
        return <DailyTourPlan />;
    }
  };

  return (
    <View style={styles.mainPanel}>
      {myTabNavigator()}
      {renderChildView()}
    </View>
  );
};

export default Schedule;
