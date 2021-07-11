import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  radioGroupWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 155,
  },
  radioLabel: {
    color: theme.colors.blue[600],
  },
  radioButton: {
    color: theme.colors.blue[500],
  },
});

export default styles;
