import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  BackHandler,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyChain} from 'helper';
import {Alert} from 'components/widgets';

const Separator = () => <View style={styles.separator} />;

const Home = ({navigation}) => {
  const handleLogOff = async () => {
    try {
      await KeyChain.resetPassword();
      await AsyncStorage.removeItem('TOKEN_EXPIRY_TIME');
      await AsyncStorage.removeItem('isLogged');
      navigation.navigate('Login');
    } catch (error) {
      Alert('LogOff Error');
    }
  };

  const handleExitApp = async () => {
    try {
      BackHandler.exitApp();
    } catch (error) {
      Alert('Exit Error');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home Screen</Text>
      </View>
      <View>
        <Button title="Exit App" onPress={() => handleExitApp()} />
      </View>
      <Separator />
      <View>
        <Button
          title="Log Off"
          color="#f194ff"
          onPress={() => handleLogOff()}
        />
      </View>
      <Separator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Home;
