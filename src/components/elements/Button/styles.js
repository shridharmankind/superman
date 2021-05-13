import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  appButtonContainer: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appButtonText: {
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: theme.colors.veryLightGray,
  },
  btnColorContained: {
    color: theme.colors.white,
  },
  btnColorOutlined: {
    color: theme.colors.primary,
  },
});

export default styles;
