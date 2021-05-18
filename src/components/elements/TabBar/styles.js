import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  tab: {
    flex: 1,
  },
  tabText: {
    color: theme.colors.primary,
    textAlign: 'center',
  },
  focusedTab: {
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedTabText: {
    fontFamily: theme.fonts.fontBold,
  },
  tabWrapper: {
    width: 110,
    height: 25,
  },
  tabBarContainer: {
    flexDirection: 'row',
    paddingTop: 20,
  },
});

export default styles;
