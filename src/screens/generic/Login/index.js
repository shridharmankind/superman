import React, {useState} from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchAllUsers } from '../../../api'

export default function Login({navigation}) {
  const {colors} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getUserList = () => {
    fetchAllUsers().then(res => console.log(res.data))
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

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => getUserList()}>
        <Text style={styles.loginText}>Get Users list</Text>
      </TouchableOpacity>
    </View>
  );
}
