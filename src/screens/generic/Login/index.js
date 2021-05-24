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
import * as AuthSession from 'expo-auth-session';
import styles from './styles';
import theme from 'themes';
import * as KeyChain from '../../../helper/keychain/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fetchAllUsers} from '../../../api';
import {Button} from 'components/elements';
import {NetworkService} from 'services';
import {Constants, Strings} from 'common';
import {StandardPlanModal} from 'screens/tourPlan';

const config = {
  issuer: 'https://mankindpharma-sandbox.onelogin.com/oidc/2',
  clientId: '49ec86f0-96aa-0139-a9f5-02c2731a1c49186786',
  redirectUrl: 'com.superman://callback',
  scopes: ['openid', 'profile'],
};


const Login = ({navigation}) => {
  const [animating, setAnimating] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isUserLoggedIn = await AsyncStorage.getItem('isLogged');
      const isTokenExpired = await AsyncStorage.getItem(
        'token_expiry_time',
        null,
      );
      if (isUserLoggedIn) {
        navigation.navigate('Home');
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const loginHandler = useCallback(async () => {
    try {
      try {
        setAnimating(true);
        const newAuthState = await authorize(config);
        KeyChain.saveAccessToken(newAuthState.accessToken);
        AsyncStorage.setItem(
          'token_expiry_time',
          newAuthState.accessTokenExpirationDate,
        );
        AsyncStorage.setItem('isLogged', 'true');
        setAnimating(false);
        navigation.navigate('Home');
      } catch (error) {
        Alert.alert('Login Error', error.message);
      }
    } catch (error) {
      setAnimating(false);
      Alert.alert('Login Error', error.message);
    }
  }, [navigation]);
  const showModal = () => {
    setOpenModal(true);
  };

  return (
    <View>
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

      <Button mode="text" title={Strings.forgotpwd} />

      <Button
        mode="contained"
        title="Login"
        uppercase={true}
        contentStyle={styles.loginBtn}
      />

      <Button
        mode="contained"
        title="Open daily plan"
        uppercase={true}
        contentStyle={styles.loginBtn}
        onPress={() => setOpenModal(true)}
      />
      {/* <Button
        title="Login!"
        disabled={!request}
        onPress={() => promptAsync({useProxy})}
      />
      {result && <Text>{JSON.stringify(result, null, 2)}</Text>} */}
      {openModal && (
        <StandardPlanModal
          visible={openModal}
          hideModal={() => setOpenModal(false)}
        />
      )}
    </View>
  );
};

export default Login;
