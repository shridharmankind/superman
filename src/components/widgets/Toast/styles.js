import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  toastStyleBase: {
    minHeight: theme.spacing(120),
    maxWidth: theme.spacing(300),
    minWidth: theme.spacing(300),
    borderRadius: 13,
    backgroundColor: theme.colors.grey[700],
    justifyContent: 'flex-start',
    paddingHorizontal: theme.spacing(16),
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
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
    height: theme.spacing(25),
    alignItems: 'flex-start',
    paddingTop: theme.spacing(4),
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
    borderRadius: theme.spacing(26),
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
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default styles;
