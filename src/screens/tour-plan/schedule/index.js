import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Button, TabBar} from 'components/elements';

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text>Home!</Text>
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text>Settings!</Text>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const Schedule = () => {
  const {colors} = useTheme();
  const myTabNavigator = () => {
    return (
      <SafeAreaView style={{flex: 1}}>
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
        <Text>left panel</Text>
        <Button title="PlanMeet" mode="outlined" />
      </View>
      <SafeAreaView style={styles.mainPanel}>{myTabNavigator()}</SafeAreaView>
      <View style={styles.rightPanel}>
        <Text>Right panel</Text>
      </View>
    </View>
  );
};

export default Schedule;
