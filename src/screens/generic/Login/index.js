import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {authorize} from 'react-native-app-auth';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import styles from './styles';
import theme from 'themes';
import {KeyChain} from 'helper';
import {Button, Label} from 'components/elements';
import {Strings} from 'common';
import {LoginCover, LogoMankindWhite} from 'assets';
import {Helper} from 'database';
import {Routes} from 'navigations';

const config = {
  issuer: 'https://mankindpharma-sandbox.onelogin.com/oidc/2',
  clientId: '49ec86f0-96aa-0139-a9f5-02c2731a1c49186786',
  redirectUrl: 'com.superman://callback',
  scopes: ['openid', 'profile'],
  additionalParameters: {prompt: 'login'},
};

export const TOKEN_EXPIRY_TIME = 'token_expiry_time';
export const USER_ID = 'USER_ID';
export const AlertTitle = 'Info';

const Login = ({navigation}) => {
  const [animating, setAnimating] = useState(false);

  const loginHandler = useCallback(async () => {
    try {
      setAnimating(true);
      const newAuthState = await authorize(config);
      await KeyChain.saveAccessToken(newAuthState.accessToken);
      const decoded = jwt_decode(newAuthState.accessToken);
      AsyncStorage.setItem(TOKEN_EXPIRY_TIME, JSON.stringify(decoded.exp));
      AsyncStorage.setItem(USER_ID, decoded.sub);
      setAnimating(false);

      const isPending = await Helper.checkForPendingMasterDataDownload();
      if (isPending) {
        navigation.reset({
          routes: [{name: Routes.ROUTE_MASTER_DATA_DOWNLOAD}],
        });
      } else {
        navigation.reset({
          routes: [{name: Routes.ROUTE_DASHBOARD}],
        });
      }
    } catch (error) {
      setAnimating(false);
      Alert.alert(Strings.info, error.message);
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
