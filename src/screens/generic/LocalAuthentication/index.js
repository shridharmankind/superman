import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text, View, Alert} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-community/async-storage';

const LocalAuth = ({navigation}) => {
  const [loginfail, setLoginFail] = useState(false);
  useEffect(() => {
    const fn = () => {
      LocalAuthentication.authenticateAsync().then(response3 => {
        console.log(response3);
        if (response3.success) {
          AsyncStorage.setItem('isLoggedIn', 'true');
          navigation.navigate('Login');
        } else {
          AsyncStorage.removeItem('isLoggedIn');
          navigation.navigate('LocalAuthentication');
          setLoginFail(!loginfail);
        }
      });
    };
    fn();
  }, [navigation, loginfail]);

  return <Text>test</Text>;
};

export default LocalAuth;
