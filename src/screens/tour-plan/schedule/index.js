import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styles from './styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Button, TabBar} from 'components/elements';

/** TODO: remove HomeScreen and SettingScreen component */
const HomeScreen = () => {
  return (
    <View style={styles.settingScreen}>
      <Text>Home!</Text>
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View style={styles.settingScreen}>
      <Text>Settings!</Text>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const Schedule = () => {
  const myTabNavigator = () => {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
          <Tab.Screen name="Daily Plan" component={HomeScreen} />
          <Tab.Screen name="Tour Plan" component={SettingsScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        <Button title="PlanMeet" mode="outlined" />
      </View>
      <SafeAreaView style={styles.mainPanel}>{myTabNavigator()}</SafeAreaView>
      <View style={styles.rightPanel} />
    </View>
  );
};

export default Schedule;
