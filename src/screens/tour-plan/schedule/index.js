import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import styles from './styles';
import {Button} from 'components/elements';
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
    return (
      <View style={styles.tabContainer}>
        <View style={styles.leftTabContainer}>
          <TabBar values={data} onPress={onTabPress} />
        </View>
        <View style={[styles.tabContainer, styles.rightTabContainer]}>
          <Button
            title={Strings.reviewDCR}
            mode="outlined"
            contentStyle={styles.buttonTabBar}
          />
          <Button
            title={Strings.addToTodayPlan}
            mode="contained"
            contentStyle={styles.buttonTabBar}
          />
        </View>
      </View>
    );
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
    <View style={styles.container}>
      <View style={styles.leftPanel} />
      <SafeAreaView style={styles.mainPanel}>
        {myTabNavigator()}
        {renderChildView()}
      </SafeAreaView>
      <View style={styles.rightPanel} />
    </View>
  );
};

export default Schedule;
