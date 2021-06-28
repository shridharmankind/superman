import React, {useEffect, useState} from 'react';
import {
  View,
  Alert,
  BackHandler,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';

import NavMenu from './components/NavMenu';
import {NotificationIcon, SearchIcon} from 'assets';

import ROUTES_DASHBOARD, {ROUTE_DIRECTORY} from './routes';
import {ROUTE_DIRECTORY_LANDING} from 'screens/directory/routes';

import theme from 'themes';
import styles from './styles';
import {Strings} from 'common';
import {LOGOUT_ITEM_ID} from './constants';
import {validateSearch} from 'screens/directory/helper';
import {authTokenActions} from '../RouteHandler/redux';

export const DashboardStack = createStackNavigator();

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const [searchState, toggleSearch] = useState(false);
  const [searhInput, updateVal] = useState(null);
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
      closeSearchBar();
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
            signOutStateUpdate();
          } catch (error) {
            Alert.alert(Strings.error, error);
          }
        },
      },
    ]);
  };

  //sign out state update hook
  const signOutStateUpdate = () => {
    dispatch(authTokenActions.signOut());
  };

  // Function to open the search bar
  const openSearchBar = () => {
    updateVal(null);
    toggleSearch(true);
  };

  /* Function to close Search bar on clicking anywher
  on the dashboard*/
  const closeSearchBar = () => {
    updateVal(null);
    toggleSearch(false);
  };

  // Function to clear the input text
  const clearInputSearch = () => {
    updateVal(null);
  };

  // Function to validate the search input
  const validateSearchKeyword = () => {
    const [isValid] = validateSearch(searhInput, clearInputSearch);
    if (isValid) {
      return searhInput.trim();
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
    <TouchableWithoutFeedback onPress={closeSearchBar}>
      <View style={styles.container}>
        {renderSideMenu()}
        {renderNavigator()}
        {renderScreenActions()}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Dashboard;
