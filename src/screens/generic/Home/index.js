import React, { useEffect } from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Alert,
  BackHandler,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyChain} from 'helper';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTodoActionCreator, updateTodoDataActions } from 'reducers';
import { todoSelector, appSelector } from 'selectors';

const Separator = () => <View style={styles.separator} />;

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const todos1 = useSelector(todoSelector.makeGetPagedTodos());
  const selectedValue = useSelector(todoSelector.makeGetTodoSelectedState());
  const fetchState = useSelector(appSelector.makeGetAppFetch())
  useEffect(() => {
    dispatch(fetchTodoActionCreator());
  }, []);

  if(fetchState == 'FETCHING'){
    return <Text>Loading...</Text>
  }
  const handleLogOff = async () => {
    try {
      await KeyChain.resetPassword();
      await AsyncStorage.removeItem('token_expiry_time');
      await AsyncStorage.removeItem('isLogged');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('LogOff Error', error);
    }
  };

  const handleExitApp = async () => {
    try {
      BackHandler.exitApp();
    } catch (error) {
      Alert.alert('Exit Error', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home Screen</Text>
        <Text>List of Bundles - {JSON.stringify(fetchState)}</Text>
        {(todos1) && todos1.map(todo => (
          <View key={todo.id}>
            <Text onPress={() => dispatch(updateTodoDataActions.update(todo.id))}>{todo.title}</Text>
          </View>
          
        ))}
        <Text>Now Select one is :::: {selectedValue} </Text>
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
