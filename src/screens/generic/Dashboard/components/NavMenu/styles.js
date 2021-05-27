import {StyleSheet, Platform} from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 40,
    width: 200,
  },
  navItemsContainer: {
    marginTop: 108,
  },
  navItem: {
    height: 88,
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
    marginRight: 32,
    ...Platform.select({web: {cursor: 'pointer'}}),
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
  logout: {
    height: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 0,
    paddingLeft: 56,
    width: '80%',
    backgroundColor: theme.colors.primary,
  },
  logoutText: {
    color: theme.colors.white,
  },
});
