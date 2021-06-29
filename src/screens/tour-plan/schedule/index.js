import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Button} from 'components/elements';
import {TabBar} from 'components/widgets';
import {DailyTourPlan, MonthlyTourPlan} from 'screens/tourPlan';
import {Strings} from 'common';
import {translate} from 'locale';
import {ROUTE_DIRECTORY_LANDING} from 'screens/directory/routes';
import {ROUTE_DIRECTORY} from 'screens/generic/Dashboard/routes';

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
   * Navigate to Directory landing page
   */
  const navigateToDirectory = () => {
    navigation.navigate(ROUTE_DIRECTORY, {
      screen: ROUTE_DIRECTORY_LANDING,
    });
  };

  /**
   * function to render tabs and buttons
   * @retuns tabs view
   */
  const myTabNavigator = () => {
    return (
      <View style={styles.tabContainer}>
        <TabBar values={data} onPress={onTabPress} />
        {showButtons && (
          <View style={styles.tabContainer}>
            <Button
              title={translate('tourPlan.monthly.actions.reviewDCR')}
              mode="outlined"
              contentStyle={styles.buttonTabBar}
              labelStyle={styles.buttonTabBarText}
            />
            <Button
              title={translate('tourPlan.monthly.actions.addToTodayPlan')}
              mode="contained"
              contentStyle={styles.buttonTabBar}
              labelStyle={styles.buttonTabBarText}
              onPress={navigateToDirectory}
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
