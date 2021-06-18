import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text, View, Alert} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-community/async-storage';

const LocalAuth = ({navigation}) => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
    AppState.addEventListener('change', _handleAppStateChange);
    checkForIsloggedIn();

    return () => {
      AsyncStorage.removeItem('isLoggedIn');
      AppState.removeEventListener('change', _handleAppStateChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fallBackToDefaultAuth = async () => {
    const response = await LocalAuthentication.authenticateAsync();
    if (response.success) {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.navigate('Login');
      return '';
    } else {
      checkForIsloggedIn();
    }
  };

  const alertComponent = (title, mess, btnTxt, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };
  const _handleAppStateChange = async nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (JSON.parse(isLoggedIn)) {
        navigation.navigate('Login');
      }
    }

    appState.current = nextAppState;
    console.log('AppState', appState.current);
  };

  const checkForIsloggedIn = async () => {
    // Check if hardware supports biometrics
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    // Fallback to default authentication method (password) if Fingerprint is not available
    if (!isBiometricAvailable)
      return alertComponent(
        'Please enter your password',
        'Biometric Authentication not supported',
        'OK',
        () => fallBackToDefaultAuth(),
      );
    const response = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
    });
    console.log(response, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    if (response.success) {
      await AsyncStorage.setItem('isLoggedIn', 'true');
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
