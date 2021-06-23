import React, {useState, useEffect} from 'react';
import {BackHandler, View, StyleSheet} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-community/async-storage';

const LocalAuth = ({navigation}) => {
  const [loginfail, setLoginFail] = useState(false);
  useEffect(() => {
    const fn = () => {
      LocalAuthentication.authenticateAsync().then(response => {
        console.log(response, 'response');
        if (response.success) {
          AsyncStorage.setItem('isLoggedIn', 'true');
          navigation.replace('Login');
        } else {
          AsyncStorage.removeItem('isLoggedIn');
          if (response.error === 'user_cancel') {
            return BackHandler.exitApp();
          }
          setLoginFail(!loginfail);
        }
      });
    };
    fn();
  }, [navigation, loginfail]);

  return <View style={styles.container} />;
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1C1837',
  },
});
export default LocalAuth;
