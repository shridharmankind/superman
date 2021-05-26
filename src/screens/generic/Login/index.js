import React, {useCallback, useState, useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  Alert,
  ActivityIndicator,
  Text,
  ImageBackground,
} from 'react-native';
import {authorize, revoke} from 'react-native-app-auth';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import styles from './styles';
import theme from 'themes';
import {KeyChain} from 'helper';
import {Button, Label} from 'components/elements';
import {Strings} from 'common';
import {LoginCover, LogoMankindWhite} from 'assets';

const config = {
  issuer: 'https://mankindpharma-sandbox.onelogin.com/oidc/2',
  clientId: '49ec86f0-96aa-0139-a9f5-02c2731a1c49186786',
  redirectUrl: 'com.superman://callback',
  scopes: ['openid', 'profile'],
  additionalParameters: {prompt: 'login'},
};

const TOKEN_EXPIRY_TIME = 'token_expiry_time';
const USER_ID = 'USER_ID';
const LOGIN_STATUS = 'loginStatus';
const AlertTitle = 'Info';

const Login = ({navigation}) => {
  const [animating, setAnimating] = useState(false);

  // Check if user is already logged in and Token not expired
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isUserLoggedIn = await AsyncStorage.getItem(LOGIN_STATUS);
      const tokenExpiryTime = await AsyncStorage.getItem(TOKEN_EXPIRY_TIME);
      const currentTime = Date.now();
      const diff = currentTime - tokenExpiryTime * 1000;
      if (isUserLoggedIn && diff <= 0) {
        navigation.navigate('MasterDataDownload');
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const loginHandler = useCallback(async () => {
    try {
      setAnimating(true);
      const newAuthState = await authorize(config);
      await KeyChain.saveAccessToken(newAuthState.accessToken);
      const decoded = jwt_decode(newAuthState.accessToken);
      AsyncStorage.setItem(TOKEN_EXPIRY_TIME, JSON.stringify(decoded.exp));
      AsyncStorage.setItem(USER_ID, decoded.sub);
      AsyncStorage.setItem(LOGIN_STATUS, 'true');
      setAnimating(false);
      navigation.navigate('MasterDataDownload');
    } catch (error) {
      setAnimating(false);
      Alert.alert(AlertTitle, error.message);
    }
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={LoginCover} style={styles.image}>
        <Image style={styles.logo} source={LogoMankindWhite} />
      </ImageBackground>

      <View style={styles.loginViewContainer}>
        <View style={styles.supermanTextStyle}>
          <Label
            title={Strings.superman}
            size={105}
            textColor={theme.colors.primary}
            type="semiBold"
          />
        </View>

        <View style={styles.loginButtonContainer}>
          <Button
            title={Strings.login}
            uppercase={true}
            contentStyle={styles.button}
            labelStyle={styles.textStyle}
            onPress={() => loginHandler()}
          />

          <ActivityIndicator
            animating={animating}
            color={theme.colors.darkBlue}
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
