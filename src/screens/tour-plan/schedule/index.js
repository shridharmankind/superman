import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Button} from 'components/elements';
import {TabBar} from 'components/widgets';
import {DailyTourPlan, MonthlyTourPlan} from 'screens/tourPlan';
import {Strings} from 'common';

/**
 * This file renders the tabs for daily or monthly tour plan and renders corresponding child views
 */
const Schedule = ({navigation}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const data = [
    {
      text: `${Strings.dailyPlan}`,
    },
    {
      text: `${Strings.tourPlan}`,
    },
  ];
  const [showButtons, setShowButtons] = useState(true);

  /**
   * function to render tabs and buttons
   * @retuns tabs view
   */
  const myTabNavigator = () => {
    return (
      <View style={styles.tabContainer}>
        <View>
          <TabBar values={data} onPress={onTabPress} />
        </View>
        {showButtons && (
          <View style={styles.tabContainer}>
            <Button
              title={Strings.reviewDCR}
              mode="outlined"
              contentStyle={styles.buttonTabBar}
              labelStyle={styles.buttonTabBarText}
            />
            <Button
              title={Strings.addToTodayPlan}
              mode="contained"
              contentStyle={styles.buttonTabBar}
              labelStyle={styles.buttonTabBarText}
            />
          </View>
        )}
      </View>
    );
  };

  /**
   * click handler of tab
   * @param {Number} itemIdx index of tab clicked
   */
  const onTabPress = itemIdx => {
    setSelectedTabIndex(itemIdx);
    setShowButtons(itemIdx === 0);
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
        return <MonthlyTourPlan navigation={navigation} />;
      default:
        return <DailyTourPlan />;
    }
  };

  return (
    <View>
      {myTabNavigator()}
      {renderChildView()}
    </View>
  );
};

export default Schedule;
