import React from 'react';
import {ScrollView, View, Alert} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import NavMenu from './components/NavMenu';
import {NotificationIcon, SearchIcon} from 'assets';

import {Routes} from 'navigations';
import ROUTES_DASHBOARD from './routes';

import theme from 'themes';
import {isWeb, KeyChain} from 'helper';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import {Strings, Constants} from 'common';
import {LOGOUT_ITEM_ID} from './constants';

export const DashboardStack = createStackNavigator();

const Dashboard = ({navigation}) => {
  const scrollRef = React.useRef();
  const onActivePageChanged = (route, itemId) => {
    if (itemId === LOGOUT_ITEM_ID) {
      showLogOffConfirmationDialog();
    } else {
      route && navigation && navigation.navigate(route);
      requestAnimationFrame(() => {
        if (isWeb()) {
          window.scrollTo({top: 0, behavior: 'smooth'});
        } else {
          scrollRef && scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
        }
      });
    }
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
        <SearchIcon height={32} width={32} />
      </View>
      <View style={[styles.action, styles.actionPadding]}>
        <NotificationIcon height={32} width={32} />
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
