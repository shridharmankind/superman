import React from 'react';
import {ScrollView, View} from 'react-native';

import {useNavigation} from '@react-navigation/core';
import {createStackNavigator} from '@react-navigation/stack';

import NavMenu from './components/NavMenu';
import {NotificationIcon, SearchIcon} from 'assets';

import {ROUTE_HOME} from 'navigations/routes';
import ROUTES_DASHBOARD from './routes';

import styles from './styles';
import theme from 'themes';

export const DashboardStack = createStackNavigator();

const Dashboard = () => {
  const navigation = useNavigation();
  const scrollRef = React.useRef();

  const onActivePageChanged = route => {
    route && navigation.navigate(route);
    requestAnimationFrame(() => {
      scrollRef && scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
    });
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
      {ROUTES_DASHBOARD.map(route => (
        <DashboardStack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
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
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
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
