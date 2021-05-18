import React, {useState, useEffect} from 'react';
import {View, Image, TextInput} from 'react-native';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fetchAllUsers} from '../../../api';
import {Button} from 'components/elements';
import {NetworkService} from 'services';
import {Constants, Strings} from 'common';

export default function Login({navigation}) {
  const {colors} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getUserList = () => {
    fetchAllUsers().then(res => console.log(res.data));
  };
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
