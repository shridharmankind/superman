import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import styles from './styles';
import {TabBar} from 'components/elements';
import {MonthlyTourPlan} from 'screens/tourPlan';
import {Strings} from 'common';

const Tab = createMaterialTopTabNavigator();

const Schedule = () => {
  const myTabNavigator = () => {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
          <Tab.Screen name={Strings.dailyPlan} component={MonthlyTourPlan} />
          <Tab.Screen name={Strings.tourPlan} component={MonthlyTourPlan} />
        </Tab.Navigator>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel} />
      <SafeAreaView style={styles.mainPanel}>{myTabNavigator()}</SafeAreaView>
      <View style={styles.rightPanel} />
    </View>
  );
};

export default Schedule;
