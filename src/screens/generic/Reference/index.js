import React, {useState, useEffect} from 'react';
import {View, Image, Text, TextInput} from 'react-native';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'components/elements';
import {NetworkService} from 'services';
import {Constants, Strings} from 'common';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTodoActionCreator, updateTodoDataActions} from './redux/todoSlice';
import {todoSelector} from './redux/todoSelector';
import {appSelector} from 'selectors';

export default function Reference({navigation}) {
  const {colors} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const todos1 = useSelector(todoSelector.makeGetPagedTodos());
  const selectedValue = useSelector(todoSelector.makeGetTodoSelectedState());
  const fetchState = useSelector(appSelector.makeGetAppFetch());

  useEffect(() => {
    dispatch(fetchTodoActionCreator());
  }, [dispatch]);

  //Post Request Example
  useEffect(() => {
    const fetchData = async () => {
      const result = await NetworkService.post('/api/Chemists', {
        id: 116,
        name: 'Name1',
        operatingYears: 0,
        location: 'location1',
      });
      if (result.status === Constants.HTTP_OK) {
        console.log('success');
      } else {
        console.log('error', result.statusText);
      }
    };
    fetchData();
  }, []);

  // Get Request Example
  useEffect(() => {
    const fetchData = async () => {
      const result = await NetworkService.get('/api/Chemists');
      if (result.status === Constants.HTTP_OK) {
        console.log('success');
      } else {
        console.log('error', result.statusText);
      }
    };
    fetchData();
  }, []);

  if (fetchState == 'FETCHING') {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../../assets/images/logo.png')}
      />
      <View style={styles.iconContainer}>
        <Icon name="rocket" size={30} color="#900" />
      </View>
      <View>
        <Text>List of Bundles - {JSON.stringify(fetchState)}</Text>
        {todos1 &&
          todos1.map(todo => (
            <View key={todo.id}>
              <Text
                onPress={() => dispatch(updateTodoDataActions.update(todo.id))}>
                {todo.title}
              </Text>
            </View>
          ))}
        <Text>Now Select one is :::: {selectedValue} </Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor={colors.black}
          onChangeText={emailText => setEmail(emailText)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor={colors.black}
          secureTextEntry={true}
          onChangeText={passwordText => setPassword(passwordText)}
        />
      </View>

      <Button mode="text" title={Strings.forgotpwd} />

      <Button
        mode="contained"
        title="Login"
        uppercase={true}
        contentStyle={styles.loginBtn}
      />
    </View>
  );
}
