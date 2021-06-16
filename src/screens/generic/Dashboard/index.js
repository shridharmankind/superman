import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Alert,
  BackHandler,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import NavMenu from './components/NavMenu';
import {NotificationIcon, SearchIcon} from 'assets';

import {Routes} from 'navigations';
import ROUTES_DASHBOARD, {ROUTE_DIRECTORY} from './routes';
import {ROUTE_DIRECTORY_LANDING} from 'screens/directory/routes';

import theme from 'themes';
import {KeyChain} from 'helper';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import {Strings, Constants} from 'common';
import {LOGOUT_ITEM_ID} from './constants';
import {validateSearch} from 'screens/directory/helper';
import {AuthContext} from '../../../App';

export const DashboardStack = createStackNavigator();

const config = {
  issuer: 'https://mankindpharma-sandbox.onelogin.com/oidc/2',
  clientId: '49ec86f0-96aa-0139-a9f5-02c2731a1c49186786',
  redirectUrl: 'com.superman://callback',
  scopes: ['openid', 'profile'],
  additionalParameters: {prompt: 'login'},
};

const Dashboard = ({navigation}) => {
  const [searchState, toggleSearch] = useState(false);
  const [searhInput, updateVal] = useState(null);
  const { signOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  });

  useEffect(() => {
    if(isLoading && isRemoved && animating) {
      signOut();
    }
  }, [isLoading, isRemoved, animating])

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
            // await KeyChain.saveAccessToken('null');
            setAnimating(true);
            // signOutStateUpdate();
            removeResetPassword();
            removeItemValue();
            // signOutStateUpdate();
            // if (isLoading) {
            //   signOutStateUpdate();
            // }
            // setTimeout(() => {
            //   navigation.navigate(Routes.ROUTE_LOGIN);
            // }, 2000);
          } catch (error) {
            setAnimating(false);
            Alert.alert(Strings.error, error);
          }
        },
      },
    ]);
  };

  // async const removeItemValue = () => {
    const removeResetPassword = async () => {
      try {
        await KeyChain.resetPassword().then(() => {
          setIsRemoved(true);
        })
        return true;
      }
      catch(exception) {
          return false;
      }
    }

  // async const removeItemValue = () => {
  const removeItemValue = async () => {
    try {
    await AsyncStorage.removeItem('token_expiry_time').then(() => {
      setIsLoading(true);
      setTimeout(() => {
        setAnimating(false);
      }, 2000);
      
    })
  }
  catch(e) {
    setAnimating(false);
    return false;
  }
  }

  //sign out state update hook
  // const signOutStateUpdate = () => {
  //   signOut();
  // }

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
    // <AuthContext.Consumer>
    //   {
    //     context => {
    //       updateToken(context.userToken)
    //       return (
            <View style={styles.sidemenuContainer}>
              <NavMenu onNavItemPress={onActivePageChanged} />
            </View>
    //       )
    //     }
    //   }
    // </AuthContext.Consumer>
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
    <View style={styles.container}>
      {renderSideMenu()}
      {renderNavigator()}
      {renderScreenActions()}

      <ActivityIndicator
        animating={animating}
        color={theme.colors.darkBlue}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default Dashboard;
