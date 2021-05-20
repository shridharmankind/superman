import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  dailyViewContainer: {
    padding: 10,
    alignSelf: 'stretch',
    borderRightWidth: 1,
    justifyContent: 'space-between',
    borderColor: theme.colors.grey[100],
    minHeight: 70,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignContent: 'flex-start',
  },
  bottomContent: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  disabledText: {
    color: theme.colors.grey[100],
  },
  activeText: {
    color: theme.colors.black,
  },
});

export default styles;
