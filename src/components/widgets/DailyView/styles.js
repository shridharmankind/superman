import {StyleSheet} from 'react-native';
import theme from 'themes';

const borderRadius = 14;
const styles = StyleSheet.create({
  dailyViewContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
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
  currentDate: {
    minWidth: borderRadius * 2,
    minHeight: borderRadius * 2,
    borderRadius: borderRadius,
    textAlign: 'center',
    backgroundColor: theme.colors.blueShades[100],
    alignContent: 'center',
    color: theme.colors.white,
    display: 'flex', // for web  flex support
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
