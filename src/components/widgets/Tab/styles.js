import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  radioButtonTextContainer: {
    flex: 5,
    height: 35,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  checkedButton: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 4,
    borderRadius: 0,
  },
});

export default styles;
