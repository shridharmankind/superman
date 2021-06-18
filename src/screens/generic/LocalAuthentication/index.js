import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text, View} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-community/async-storage';

const LocalAuth = ({navigation}) => {
  useEffect(() => {
    // AppState.addEventListener('change', _handleAppStateChange);
    checkForIsloggedIn();

    return () => {
      AsyncStorage.removeItem('isLoggedIn');
      // AppState.removeEventListener('change', _handleAppStateChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const response = await LocalAuthentication.authenticateAsync();
    console.log(response, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    if (response.success) {
      AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.navigate('Login');
      return '';
    } else {
      checkForIsloggedIn();
    }
  };

  // eslint-disable-next-line react/react-in-jsx-scope
  return <Text>testing</Text>;
};

export default LocalAuth;
