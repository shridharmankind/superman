import React, {useState} from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'components/elements/Button';

export default function Login({navigation}) {
  const {colors} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      <Button
        mode="text"
        title="Forgot Password?">
      </Button>

      <Button mode="contained" title="Login" uppercase={true} contentStyle={styles.loginBtn}></Button>
    </View>
  );
}
