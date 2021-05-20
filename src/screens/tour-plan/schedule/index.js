import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import styles from './styles';
import {TabBar} from 'components/elements';
import {MonthlyTourPlan} from 'screens/tourPlan';
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
    return <TabBar values={data} onPress={onRadioButtonPress} />;
  };

  const onRadioButtonPress = itemIdx => {
    setSelectedTabIndex(itemIdx);
    console.log('Clicked', itemIdx);
  };

  const renderChildView = () => {
    switch (selectedTabIndex) {
      case 0:
        return <MonthlyTourPlan />;
      case 1:
        return <MonthlyTourPlan />;
      default:
        return <MonthlyTourPlan />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel} />
      <SafeAreaView style={styles.mainPanel}>
        {myTabNavigator()}
        <View style={{flex: 1}}>{renderChildView()}</View>
      </SafeAreaView>
      <View style={styles.rightPanel} />
    </View>
  );
};

export default Schedule;
