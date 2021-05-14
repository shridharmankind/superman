import {StyleSheet} from 'react-native';
import theme from '../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
    width: 300,
    height: 300,
  },

  inputView: {
    backgroundColor: theme.colors.accent,
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: theme.colors.primary,
  },
  logo: {
    height: 80,
  },
  loginText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.fontBold,
  },
  iconContainer: {
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default styles;
