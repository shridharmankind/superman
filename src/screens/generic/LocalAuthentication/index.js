import React, {useState, useEffect} from 'react';
import {BackHandler, View, StyleSheet, Platform} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-community/async-storage';
import RouteHandler from '../RouteHandler';
import * as LocalAuthBelowVersion from 'react-native-local-auth';
import {Alert} from 'components/widgets';

const LocalAuth = () => {
  console.log('I came for local authentication');
  const [allowLogin, setLogin] = useState(false);

  const authBelowVersion = () => {
    console.log('came for older');
    LocalAuthBelowVersion.authenticate({
      reason: 'this is a secure area, please authenticate yourself',
      fallbackToPasscode: true, // fallback to passcode on cancel
    })
      .then(success => {
        console.log('you did it', success);
        Alert('Login Successful');
        setLogin(true);
      })
      .catch(error => {
        console.log(error);
        Alert('err', error);
        // BackHandler.exitApp();
      });
  };

  const authLaterVersion = isFallBackValue => {
    LocalAuthentication.authenticateAsync({
      disableDeviceFallback: isFallBackValue,
    })
      .then(response => {
        if (response.success) {
          console.log('response inside success', response);
          setLogin(true);
        } else {
          console.log('I was in error', response);
          Alert('res', response);
          // if (response.error === 'user_cancel') {
          //   BackHandler.exitApp();
          // }
        }
      })
      .catch(err => {
        Alert('err', err);
        console.log('err', err);
      });
  };

  useEffect(() => {
    const fn = async () => {
      const {Version} = Platform;
      const typeOfSupport = await LocalAuthentication.getEnrolledLevelAsync();
      console.log('typeOfSupport', typeOfSupport);
      if (Version > 29) {
        authLaterVersion(false);
      } else if (typeOfSupport === 2) {
        authLaterVersion(true);
      } else if (typeOfSupport === 1) {
        authBelowVersion();
      } else {
        setLogin(true);
      }
    };
    fn();
  }, []);

  return <View style={styles.container}>{allowLogin && <RouteHandler />}</View>;
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1C1837',
  },
});
export default LocalAuth;
