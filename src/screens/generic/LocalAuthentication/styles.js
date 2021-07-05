import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    marginTop: 200,
    alignSelf: 'center',
  },
  buttonTextStyle: {
    marginTop: 300,
    alignSelf: 'center',
    fontSize: 26,
    lineHeight: 27,
    textAlign: 'center',
    color: theme.colors.white,
    fontFamily: theme.fonts.fontSemiBold,
  },
  textStyle: {
    marginTop: 25,
    alignSelf: 'center',
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
    color: theme.colors.white,
    fontFamily: theme.fonts.fontSemiBold,
  },
  imageBg: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
