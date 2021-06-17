import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text, View} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-community/async-storage';
import {ROUTE_LOCALAUTHENTICATION} from '../../../navigations/routes';

const LocalAuth = ({navigation}) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    LocalAuthentication.hasHardwareAsync()
      .then(response => {
        LocalAuthentication.supportedAuthenticationTypesAsync().then(
          response2 => {
            console.log('available', response2);
          },
        );
        LocalAuthentication.getEnrolledLevelAsync().then(response2 => {
          console.log('enrolled - ', response2);

          LocalAuthentication.authenticateAsync().then(response3 => {
            console.log(response3, 'response 3');
            if (response3.success) {
              AsyncStorage.setItem('isLocalAuth', 'true');
              navigation.navigate('Login');
            } else {
              AsyncStorage.removeItem('isLocalAuth');
              // navigation.navigate(ROUTE_LOCALAUTHENTICATION);
            }
          });
        });
      })
      .catch(error => {
        console.log(error.message);
        AsyncStorage.removeItem('isLocalAuth');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      LocalAuthentication.authenticateAsync().then(response3 => {
        console.log(response3, 'response 3');
        if (response3.success) {
          AsyncStorage.setItem('isLocalAuth', 'true');
          navigation.navigate('Login');
        } else {
          AsyncStorage.removeItem('isLocalAuth');
          // navigation.navigate(ROUTE_LOCALAUTHENTICATION);
        }
      });
      console.log('App has come to the foreground!');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };
  return null;
};

export default LocalAuth;
