import {StyleSheet} from 'react-native';
import theme from 'themes';

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
    width: 750,
    height: 800,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
  },

  logo: {
    width: 133,
    height: 18,
    marginTop: 70,
    marginLeft: 50,
  },
  loginViewContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  supermanTextStyle: {
    justifyContent: 'center',
    flex: 1,
  },
  loginButtonContainer: {
    position: 'absolute',
    bottom: 40,
  },
});

export default styles;
