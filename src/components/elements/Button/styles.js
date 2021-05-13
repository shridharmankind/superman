import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  appButtonContainer: {
    borderRadius: theme.roundness,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: theme.colors.disabled,
    borderColor: 'transparent',
  },
});

export default styles;
