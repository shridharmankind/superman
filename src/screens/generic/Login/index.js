import React, {useCallback, useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {authorize} from 'react-native-app-auth';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import theme from 'themes';
import {KeyChain} from 'helper';

const config = {
  issuer: 'https://mankindpharma-sandbox.onelogin.com/oidc/2',
  clientId: '49ec86f0-96aa-0139-a9f5-02c2731a1c49186786',
  redirectUrl: 'com.superman://callback',
  scopes: ['openid', 'profile'],
};

const TOKEN_EXPIRY_TIME = 'token_expiry_time';
const LOGIN_STATUS = 'loginStatus';
const AlertTitle = 'Info';

const Login = ({navigation}) => {
  const [animating, setAnimating] = useState(false);

  // Check if user is already logged in and Token not expired
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isUserLoggedIn = await AsyncStorage.getItem(LOGIN_STATUS);
      const tokenExpiryTime = await AsyncStorage.getItem(TOKEN_EXPIRY_TIME);
      const currentUTCTime = new Date().toISOString();
      const diff = new Date(currentUTCTime) - new Date(tokenExpiryTime);
      if (isUserLoggedIn && diff <= 0) {
        navigation.navigate('Home');
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const loginHandler = useCallback(async () => {
    try {
      setAnimating(true);
      const newAuthState = await authorize(config);
      await KeyChain.saveAccessToken(newAuthState.accessToken);
      AsyncStorage.setItem(
        TOKEN_EXPIRY_TIME,
        newAuthState.accessTokenExpirationDate,
      );
      AsyncStorage.setItem(LOGIN_STATUS, 'true');
      setAnimating(false);
      navigation.navigate('Home');
    } catch (error) {
      setAnimating(false);
      Alert.alert(AlertTitle, error.message);
    }
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/logo.png')}
        />
        <TouchableOpacity style={styles.button} onPress={loginHandler}>
          <Text style={styles.textStyle}>Login</Text>
        </TouchableOpacity>
        <ActivityIndicator
          animating={animating}
          color={theme.colors.white}
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
