import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  appButtonContainer: {
    borderRadius: theme.roundness,
  },
  appButtonText: {
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: theme.colors.disabled,
    borderColor: 'transparent',
  },
  disabledButtonColor: {
    color: theme.colors.white,
  },
});

export default styles;
