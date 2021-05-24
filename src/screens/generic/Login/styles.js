import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    marginTop: 50,
    width: 354,
    height: 76,
    borderRadius: 10,
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 200,
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 28,
    lineHeight: 49,
    textAlign: 'center',
    color: theme.colors.black,
    fontFamily: theme.fonts.fontSemiBold,
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});

export default styles;
