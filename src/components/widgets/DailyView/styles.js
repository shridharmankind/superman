import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  dailyViewContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    borderBottomColor: theme.colors.grey[100],
    borderLeftColor: theme.colors.grey[100],
    height: 95,
    minWidth: 100,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
  },
  highVisitBar: {
    borderLeftColor: theme.colors.orange[300],
    borderLeftWidth: 5,
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
  categoryContent: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    height: 40,
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
    alignSelf: 'stretch',
    marginTop: theme.spacing(3),
    justifyContent: 'flex-start',
  },
  cellFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  locationContent: {
    flexDirection: 'row',
    marginTop: theme.spacing(3),
  },
  labelTextSpacing: {
    paddingHorizontal: theme.spacing(2),
  },
});

export default styles;
