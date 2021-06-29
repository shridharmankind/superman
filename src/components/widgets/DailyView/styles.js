import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  dailyViewContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    borderColor: theme.colors.grey[100],
    minHeight: 95,
    minWidth: 100,
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
    paddingHorizontal: theme.spacing(8),
    paddingVertical: theme.spacing(6),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignContent: 'flex-start',
  },
  bottomContent: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  disabled: {
    color: theme.colors.grey[100],
    opacity: 0.4,
  },
  activeText: {
    color: theme.colors.black,
  },
  currentDate: {
    width: 18.7,
    height: 18.7,
    borderRadius: 9.35,
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    letterSpacing: -0.16,
    fontFamily: theme.fonts.fontBold,
  },

  weekendContainer: {
    backgroundColor: theme.colors.blueShades[100],
    opacity: 0.5,
  },

  locationLabelText: {
    paddingHorizontal: theme.spacing(2),
    alignContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  cellFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default styles;
