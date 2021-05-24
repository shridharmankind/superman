import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import styles from './styles';
import {Button} from 'components/elements';
import {TabBar} from 'components/widgets';
import {DailyTourPlan, MonthlyTourPlan} from 'screens/tourPlan';
import {Strings} from 'common';

/**
 * This file renders the tabs for daily or monthly tour plan and renders corresponding child views
 */
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

  /**
   * function to render tabs and buttons
   * @retuns tabs view
   */
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

  /**
   * click handler of tab
   * @param {Number} itemIdx index of tab clicked
   */
  const onTabPress = itemIdx => {
    setSelectedTabIndex(itemIdx);
  };

  /**
   * renders the view based on selected tab
   * @returns child view
   */
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
