import {StyleSheet} from 'react-native';
import theme from 'themes';

const borderRadius = 14;

const styles = StyleSheet.create({
  dailyViewContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    borderColor: theme.colors.grey[100],
    minHeight: 80,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
  },
  currentDailyContainer: {
    borderWidth: 1,

    borderColor: theme.colors.primary,
    alignSelf: 'stretch',
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
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
  currentDate: {
    minWidth: borderRadius * 2,
    minHeight: borderRadius * 2,
    borderRadius: borderRadius,
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
    alignContent: 'center',
    color: theme.colors.white,
    display: 'flex', // for web  flex support
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
