import {StyleSheet} from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 40,
    width: 200,
  },
  navToggleButton: {
    height: 40,
    width: 40,
    marginLeft: 16,
    marginTop: 52,
    marginBottom: 40,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  navItem: {
    height: 88,
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
  },
  navItemActive: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  navItemLabel: {
    marginLeft: 20,
    color: theme.colors.primary,
  },
  navItemLabelActive: {
    fontFamily: theme.fonts.fontSemiBold,
  },
});
