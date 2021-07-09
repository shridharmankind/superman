import {Platform, StyleSheet, Dimensions} from 'react-native';
import theme from 'themes';

const {width} = Dimensions.get('window');
const vh = window.innerHeight * 0.01;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: theme.colors.primary,
    marginTop: 50,
    width: 400,
    height: 86,
    borderRadius: 10,
  },

  textStyle: {
    fontSize: 22,
    lineHeight: 27,
    textAlign: 'center',
    color: theme.colors.white,
    fontFamily: theme.fonts.fontSemiBold,
  },
  activityIndicator: {
    alignSelf: 'center',
    height: 80,
  },

  image: {
    height: 800,
    width: 0.64 * width,
    resizeMode: 'contain',
    justifyContent: 'flex-start',
    ...Platform.select({
      web: {
        height: 100 * vh,
        width: 0.64 * window.innerWidth,
      },
    }),
  },

  logo: {
    width: 133,
    height: 18,
    marginTop: 70,
    marginLeft: 50,
  },
  loginViewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonContainer: {
    position: 'absolute',
    bottom: 40,
    ...Platform.select({
      web: {
        position: 'relative',
      },
    }),
  },
});

export default styles;
