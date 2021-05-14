import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: theme.roundness,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  buttonContained: {
    backgroundColor: theme.colors.primary,
  },
  buttonOutlined: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  buttonOutlinedText: {
    color: theme.colors.primary,
  },
  button: {
    borderColor: 'transparent',
  },
  disabledButton: {
    backgroundColor: theme.colors.disabled,
    borderColor: 'transparent',
  },
});

export default styles;
