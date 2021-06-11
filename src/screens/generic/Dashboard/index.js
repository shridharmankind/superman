import React, {useEffect} from 'react';
import {View, Alert, BackHandler} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import NavMenu from './components/NavMenu';
import {NotificationIcon, SearchIcon} from 'assets';

import {Routes} from 'navigations';
import ROUTES_DASHBOARD from './routes';

import theme from 'themes';
import {KeyChain} from 'helper';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import {Strings, Constants} from 'common';
import {LOGOUT_ITEM_ID} from './constants';

export const DashboardStack = createStackNavigator();

const Dashboard = ({navigation}) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  });

  const onActivePageChanged = (route, itemId) => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    if (itemId === LOGOUT_ITEM_ID) {
      showLogOffConfirmationDialog();
    } else {
      route && navigation && navigation.navigate(route);
    }
  };

  const handleBackButton = () => {
    Alert.alert(
      Strings.info,
      Strings.exitConfirmation,
      [
        {
          text: Strings.cancel,
          style: Strings.cancel,
        },
        {
          text: Strings.ok,
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  const showLogOffConfirmationDialog = () => {
    Alert.alert(Strings.info, Strings.logOffmsg, [
      {
        text: Strings.cancel,
        onPress: () => {},
        style: Strings.cancel,
      },
      {
        text: Strings.ok,
        onPress: async () => {
          try {
            await KeyChain.resetPassword();
            await AsyncStorage.removeItem(Constants.TOKEN_EXPIRY_TIME);
            setTimeout(() => {
              navigation.navigate(Routes.ROUTE_LOGIN);
            }, 2000);
          } catch (error) {
            Alert.alert(Strings.error, error);
          }
        },
      },
    ]);
  };

  const renderSideMenu = () => (
    <View style={styles.sidemenuContainer}>
      <NavMenu onNavItemPress={onActivePageChanged} />
    </View>
  );

  const renderScreenActions = () => (
    <View style={styles.actionsContainer}>
      <View style={styles.action}>
        <SearchIcon height={21.3} width={21.3} />
      </View>
      <View style={[styles.action, styles.actionPadding]}>
        <NotificationIcon height={21.3} width={21.3} />
      </View>
    </View>
  );

  const renderNavigator = () => (
    <DashboardStack.Navigator initialRouteName={ROUTES_DASHBOARD.ROUTE_HOME}>
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
    <View style={styles.container}>
      {renderSideMenu()}
      {renderNavigator()}
      {renderScreenActions()}
    </View>
  );
};

export default Dashboard;
