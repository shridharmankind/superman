import React, {useEffect, useState} from 'react';
import {
  View,
  Alert,
  BackHandler,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import NavMenu from './components/NavMenu';
import {NotificationIcon, SearchIcon, RefreshIcon} from 'assets';
import SyncAdapter from 'react-native-sync-adapter';
import {Routes} from 'navigations';
import ROUTES_DASHBOARD, {ROUTE_DIRECTORY} from './routes';
import {ROUTE_DIRECTORY_LANDING} from 'screens/directory/routes';

import theme from 'themes';
import {KeyChain} from 'helper';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import {Strings, Constants} from 'common';
import {LOGOUT_ITEM_ID} from './constants';
import {syncInterval,syncFlexTime} from 'utils/backgroundTask';
import {validateSearch} from 'screens/directory/helper';

export const DashboardStack = createStackNavigator();

const Dashboard = ({navigation}) => {
  const [searchState, toggleSearch] = useState(false);
  const [searhInput, updateVal] = useState(null);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  });

  const onSyncPress = () => {
    console.log("[EVENT_GENERATED_FOREGROUND_TASK] ");
    SyncAdapter.syncImmediately({
      syncInterval,
      syncFlexTime,
    });
  };

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

  // Function to open the search bar
  const openSearchBar = () => {
    updateVal(null);
    toggleSearch(true);
  };

  // Function to clear the input text
  const clearInputSearch = () => {
    updateVal(null);
  };

  // Function to validate the search input
  const validateSearchKeyword = () => {
    const [isValid, searchKeyword] = validateSearch(
      searhInput,
      clearInputSearch,
    );
    if (isValid) {
      return searchKeyword;
    } else {
      return undefined;
    }
  };

  // Function called on the click of search icon
  const navigateAndSearch = () => {
    if (searhInput === null) {
      toggleSearch(false);
      return;
    }
    const searchKeyword = validateSearchKeyword();
    if (!!searchKeyword && searchKeyword !== '') {
      //navigate to the landing page of directory
      navigation.push(ROUTE_DIRECTORY, {
        screen: ROUTE_DIRECTORY_LANDING,
        params: {inputKeyword: searchKeyword},
      });
      toggleSearch(false);
    }
  };

  /* Function to update the input of search bar */
  const updateSearchInput = input => {
    updateVal(input);
  };

  const renderSideMenu = () => (
    <View style={styles.sidemenuContainer}>
      <NavMenu onNavItemPress={onActivePageChanged} />
    </View>
  );

  const renderScreenActions = () => (
    <View style={styles.actionsContainer}>
      {!searchState && (
        <TouchableOpacity style={styles.action} onPress={openSearchBar}>
          <SearchIcon height={21.3} width={21.3} />
        </TouchableOpacity>
      )}

      {searchState && (
        <View>
          <TextInput
            placeholder="Search"
            style={styles.globalSearchBar}
            placeholderTextColor={theme.colors.white}
            autoFocus={true}
            value={searhInput}
            onChangeText={input => updateSearchInput(input)}
          />
          <SearchIcon
            style={styles.searchIcon}
            height={16}
            width={16}
            fill={theme.colors.white}
            onPress={navigateAndSearch}
          />
        </View>
      )}

      <View style={[styles.action, styles.actionPadding]}>
        <NotificationIcon height={21.3} width={21.3} />
      </View>
      <View style={[styles.action, styles.actionPadding]}>
        <RefreshIcon height={21.3} width={21.3} onPress={() => onSyncPress()} />
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
