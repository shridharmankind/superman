import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {stringify, parse} from 'query-string';
import {nanoid} from 'nanoid';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import styles from './styles';
import theme from 'themes';
import {Button, Label} from 'components/elements';
import {Strings} from 'common';
import {LoginCover, LogoMankindWhite} from 'assets';
import {TOKEN_EXPIRY_TIME, USER_ID, LOGIN_STATUS} from './index';
import {isLocalHost} from 'utils/util';
import {Routes} from 'navigations';

const state = nanoid(32);
const nonce = nanoid(32);

const config = {
  authority: 'https://mankindpharma-sandbox.onelogin.com/oidc/2',
  client_id: isLocalHost()
    ? '4cadc330-b176-0139-61ed-066569480319186786'
    : '9dcc6560-9a92-0139-202d-0a8697f39ec7186786',
  redirect_uri: isLocalHost()
    ? 'http://localhost:3000/auth'
    : 'https://services-all.0a6418a61f9c4aeb86ee.centralindia.aksapp.io/auth',
  state,
  nonce,
  response_type: 'id_token',
  scope: 'openid profile',
};

const Login = () => {
  const [animating, setAnimating] = useState(false);
  const loginHandler = useCallback(async () => {
    try {
      setAnimating(true);
      const params = stringify(config);
      const authUrl = `${config.authority}/auth?${params}`;
      window.location.assign(authUrl);
    } catch (error) {
      setAnimating(false);
    }
  }, []);

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

        <View style={styles.loginButtonContainerWeb}>
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
const AuthComp = ({navigation}) => {
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      const response = parse(hash);
      const decoded = jwt_decode(response.id_token);
      AsyncStorage.setItem(TOKEN_EXPIRY_TIME, JSON.stringify(decoded.exp));
      AsyncStorage.setItem(USER_ID, decoded.sub);
      AsyncStorage.setItem(LOGIN_STATUS, 'true');
      // window.location.assign(window.location.origin);
      navigation.reset({
        routes: [{name: Routes.ROUTE_DASHBOARD}],
      });
    }
  }, [navigation]);
  return null;
};
const WebRouterComp = ({navigation}) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/auth">
          <AuthComp navigation={navigation} />
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default WebRouterComp;
