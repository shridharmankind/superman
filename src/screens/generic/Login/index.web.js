import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

import {stringify} from 'query-string';
import {nanoid} from 'nanoid';
import {Button, Label} from 'components/elements';
import {Strings} from 'common';
import theme from 'themes';
import {LoginCover, LogoMankindWhite} from 'assets';
import env from '../../../../env.json';

import styles from './styles';

const state = nanoid(32);
const nonce = nanoid(32);

const isLocalhost = ['localhost'].includes(window.location.hostname);
const {oneLogin = {}} = env;
const {authority, web = {}} = oneLogin;
const {localhostClientID, clientID, redirectURL} = web;

const config = {
  authority,
  client_id: isLocalhost ? localhostClientID : clientID,
  redirect_uri: `${window.location.origin}${redirectURL}`,
  state,
  nonce,
  response_type: 'id_token',
  scope: 'openid profile',
  additionalParameters: {prompt: 'login'},
};

const Login = () => {
  const [animating, setAnimating] = useState(false);
  const loginHandler = useCallback(async () => {
    try {
      setAnimating(true);
      const params = stringify(config);
      const authUrl = `${authority}${redirectURL}?${params}`;
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
