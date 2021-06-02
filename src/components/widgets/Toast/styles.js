import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  toastStyleBase: {
    minHeight: 100,
    maxWidth: 300,
    minWidth: 300,
    borderRadius: 13,
    backgroundColor: theme.colors.grey[700],
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    position: 'relative',
  },
  toastText: {
    color: theme.colors.white,
  },
  success: {backgroundColor: theme.colors.green[100]},
  notification: {backgroundColor: theme.colors.blue[100]},
  warning: {backgroundColor: theme.colors.yellow[100]},

  alert: {
    backgroundColor: theme.colors.orange[200],
  },
  standard: {backgroundColor: theme.colors.grey[700]},
  confirm: {backgroundColor: theme.colors.yellow[200]},
  button: {
    height: 20,
    alignItems: 'flex-start',
    paddingTop: 4,
  },
  buttonText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.fontSemiBold,
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  closeIcon: {
    width: 32,
    height: 32,
    borderRadius: 26,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    top: -10,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
