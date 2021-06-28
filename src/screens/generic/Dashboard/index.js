import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Alert,
  BackHandler,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import NavMenu from './components/NavMenu';
import {Label} from 'components/elements';
import {NotificationIcon, SearchIcon, RefreshIcon} from 'assets';
import {Routes} from 'navigations';
import ROUTES_DASHBOARD, {ROUTE_DIRECTORY} from './routes';
import {ROUTE_DIRECTORY_LANDING} from 'screens/directory/routes';

import theme from 'themes';
import {KeyChain, isWeb} from 'helper';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import {Strings, Constants} from 'common';
import {LOGOUT_ITEM_ID} from './constants';
import {validateSearch} from 'screens/directory/helper';
import NetInfo from '@react-native-community/netinfo';
import {getLocalTimeZone} from 'utils/dateTimeHelper';
import {Sync, Constants as DBConstants, Schemas, getDBInstance} from 'database';
import {
  showToastie,
  setOnDemandSyncStatusRunning,
  getOnDemandSyncStatus,
  getBackgrounTaskValue,
} from 'utils/backgroundTask';

export const DashboardStack = createStackNavigator();

const Dashboard = ({navigation}) => {
  const [searchState, toggleSearch] = useState(false);
  const [searhInput, updateVal] = useState(null);
  const [onDemandSync, setOnDemandSync] = useState(true);
  const [lastSync, setLastSync] = useState('--:--:--');
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  });

  useEffect(() => {
    const fetchSyncTime = async () => {
      let masterData = getDBInstance().objects(
        Schemas.masterTablesDownLoadStatus.name,
      );
      setSyncListener(masterData);
      masterData.forEach(modifiedData => {
        if (modifiedData.name == DBConstants.APPLICATION_SYNC_STATUS) {
          setSync(modifiedData);
          return;
        }
      });
      return;
    };
    let subscribeNetworkCheck = null;
    if (!isWeb()) {
      fetchSyncTime();
      subscribeNetworkCheck = NetInfo.addEventListener(
        handleConnectivityChange,
      );
      //Sync.SyncService.RegisterBackgroundTask();
    }
    return async () => {
      if (!isWeb()) {
        if (subscribeNetworkCheck) {
          subscribeNetworkCheck();
          subscribeNetworkCheck = null;
        }
      }
    };
  });

  useEffect(() => {
    if (isConnected) {
      Sync.SyncService.syncNow();
    }
  }, [isConnected]);

  const handleConnectivityChange = connection => {
    setConnected(connection.isConnected);
  };

  const setSyncListener = useCallback(masterData => {
    masterData.addListener((masterData, changes) => {
      changes.insertions.forEach(index => {
        const modifiedData = masterData[index];
        setSync(modifiedData);
      });
      changes.modifications.forEach(index => {
        const modifiedData = masterData[index];
        setSync(modifiedData);
      });
    });
  }, []);

  const setSync = syncRecord => {
    if (syncRecord.name == DBConstants.APPLICATION_SYNC_STATUS) {
      let date = getLocalTimeZone(syncRecord.lastSync);
      setLastSync(date);
    }
  };

  const onSyncPress = () => {
    if (!isWeb()) {
      NetInfo.fetch().then(async state => {
        if (state.isConnected && onDemandSync) {
          let backgroundTaskStatus = await getBackgrounTaskValue();
          if (backgroundTaskStatus == Constants.BACKGROUND_TASK.NOT_RUNNING) {
            setOnDemandSync(false);
            await setOnDemandSyncStatusRunning();
            let onDemandValue = await getOnDemandSyncStatus();
            if (onDemandValue == Constants.BACKGROUND_TASK.RUNNING) {
              showToastie(
                Constants.TOAST_TYPES.SUCCESS,
                Strings.backgroundTask.toastBtns.syncInitiatedMessage,
              );
              Sync.SyncService.syncNow();
              const getBackgroundSync = await getBackgrounTaskValue();
              if (getBackgroundSync == Constants.BACKGROUND_TASK.NOT_RUNNING) {
                setOnDemandSync(true);
              }
            }
          } else {
            showToastie(
              Constants.TOAST_TYPES.WARNING,
              Strings.backgroundTask.toastBtns.syncInitiatedMessage,
            );
          }
        } else {
          Alert.alert(Strings.noInternet, Strings.checkInternet);
        }
      });
    }
  };

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

  const renderSyncButton = () => {
    if (!isWeb()) {
      return (
        <View style={[styles.action, styles.actionPadding]}>
          <RefreshIcon height={21.3} width={21.3} onPress={onSyncPress} />
        </View>
      );
    }
  };

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
      {renderSyncButton()}
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

  const renderSyncTime = () => {
    if (!isWeb()) {
      return (
        <View style={styles.syncContainer}>
          <Label
            size={12.5}
            title={`${Strings.backgroundTask.lastSync} ${lastSync}`}
          />
        </View>
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={closeSearchBar}>
      <View style={styles.container}>
        {renderSideMenu()}
        {renderNavigator()}
        {renderScreenActions()}
        {renderSyncTime()}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Dashboard;
