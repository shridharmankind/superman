import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  Image,
  View,
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
import {authTokenActions} from '../RouteHandler/redux';
import {useDispatch} from 'react-redux';
import {Constants} from 'common';
import {Helper} from 'database';
import {
  ROUTE_MASTER_DATA_DOWNLOAD,
  ROUTE_DASHBOARD,
} from '../../../navigations/routes';
import env from '../../../../env.json';
import {Alert} from 'components/widgets';

const {oneLogin = {}} = env;
const {authority, clientID, redirectURL} = oneLogin;

const config = {
  issuer: authority,
  clientId: clientID,
  redirectUrl: redirectURL,
  scopes: ['openid', 'profile'],
  additionalParameters: {prompt: 'login'},
};

export const AlertTitle = 'Info';

const Login = () => {
  const [animating, setAnimating] = useState(false);
  const dispatch = useDispatch();

  const loginHandler = useCallback(async () => {
    try {
      setAnimating(true);
      const newAuthState = await authorize(config);
      await KeyChain.saveAccessToken(newAuthState.accessToken);
      const isPending = await Helper.checkForPendingMasterDataDownload();
      dispatch(
        authTokenActions.signIn({
          userToken: newAuthState.accessToken,
          screen: isPending ? ROUTE_MASTER_DATA_DOWNLOAD : ROUTE_DASHBOARD,
        }),
      );
      const decoded = jwt_decode(newAuthState.accessToken);
      AsyncStorage.setItem(
        Constants.TOKEN_EXPIRY_TIME,
        JSON.stringify(decoded.exp),
      );
      AsyncStorage.setItem(Constants.USER_ID, decoded.sub);
      setAnimating(false);
    } catch (error) {
      setAnimating(false);
      console.log(error);
      Alert(Strings.info, error.message);
    }
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={LoginCover} style={styles.image}>
        <Image style={styles.logo} source={LogoMankindWhite} />
      </ImageBackground>

      <View style={styles.loginViewContainer}>
        <Label
          title={Strings.superman}
          size={80}
          textColor={theme.colors.primary}
          type="semiBold"
        />

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
