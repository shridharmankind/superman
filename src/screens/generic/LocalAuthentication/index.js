import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text, View} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-community/async-storage';

const LocalAuth = ({navigation}) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    // AppState.addEventListener('change', _handleAppStateChange);
    console.log('test');
    let y = async () => {
      let x = await AsyncStorage.getItem('isLoggedIn');
      if (JSON.parse(x)) {
        return navigation.navigate('Login');
      }
    };
    checkForIsloggedIn();
    y();
    // return () => {
    //   // AppState.removeEventListener('change', _handleAppStateChange);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  // const _handleAppStateChange = async nextAppState => {
  //   if (
  //     appState.current.match(/inactive|background/) &&
  //     nextAppState === 'active'
  //   ) {
  //     console.log('App has come to the foreground!');
  //     const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
  //     console.log('');
  //     if (isLoggedIn === null) {
  //       checkForIsloggedIn();
  //     } else {
  //       navigation.navigate('Login');
  //     }
  //   }

  //   appState.current = nextAppState;
  //   setAppStateVisible(appState.current);
  //   console.log('AppState', appState.current);
  // };

  const checkForIsloggedIn = async () => {
    LocalAuthentication.authenticateAsync().then(response3 => {
      if (response3.success) {
        AsyncStorage.setItem('isLoggedIn', 'true');
        return navigation.navigate('Login');
      } else {
        return checkForIsloggedIn();
      }
    });
  };

  // eslint-disable-next-line react/react-in-jsx-scope
  return <Text>testing</Text>;
};

export default LocalAuth;
