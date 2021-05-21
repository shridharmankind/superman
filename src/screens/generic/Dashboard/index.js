import React from 'react';
import {ScrollView, View} from 'react-native';

import {useNavigation} from '@react-navigation/core';
import {createStackNavigator} from '@react-navigation/stack';

import NavMenu from './components/NavMenu';

import {ROUTE_COMPONENT_MAPPING, ROUTE_HOME} from 'src/navigations/routes';
import {NotificationIcon, SearchIcon} from 'assets';

import styles from './styles';
import theme from 'themes';

export const DashboardStack = createStackNavigator();

// TODO navigating between feature level stack, home stack
const Dashboard = () => {
  const navigation = useNavigation();

  const onActivePageChanged = route => {
    route && navigation.navigate(route);
  };

  const renderSideMenu = () => (
    <View style={styles.sidemenuContainer}>
      <NavMenu onNavItemPress={onActivePageChanged} />
    </View>
  );

  const renderScreenActions = () => (
    <View style={styles.actionsContainer}>
      <View style={styles.action}>
        <SearchIcon height={32} width={32} />
      </View>
      <View style={[styles.action, styles.actionPadding]}>
        <NotificationIcon height={32} width={32} />
      </View>
    </View>
  );

  const renderNavigator = () => (
    <DashboardStack.Navigator initialRouteName={ROUTE_HOME}>
      {Object.keys(ROUTE_COMPONENT_MAPPING).map(route => (
        <DashboardStack.Screen
          name={route}
          component={ROUTE_COMPONENT_MAPPING[route]}
          options={{
            headerShown: false,
            cardStyle: {
              backgroundColor: theme.colors.background,
            },
          }}
        />
      ))}
    </DashboardStack.Navigator>
  );

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {renderSideMenu()}
        {renderNavigator()}
        {renderScreenActions()}
      </View>
    </ScrollView>
  );
};

export default Dashboard;
