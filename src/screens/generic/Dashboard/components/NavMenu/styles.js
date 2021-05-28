import {StyleSheet, Platform} from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: theme.sizing(32),
    width: theme.sizing(133),
    alignSelf: 'center',
  },
  navItemsContainer: {
    marginTop: theme.spacing(64),
  },
  navItem: {
    height: theme.sizing(58.7),
    width: '100%',
    paddingHorizontal: theme.spacing(16),
    marginBottom: theme.spacing(6.7),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing(21.3),
    ...Platform.select({web: {cursor: 'pointer'}}),
  },
  navItemActive: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 10.7,
    borderBottomLeftRadius: 10.7,
  },
  navItemLabel: {
    marginLeft: theme.spacing(13.3),
    color: theme.colors.primary,
    lineHeight: 20,
    letterSpacing: 0,
  },
  navItemLabelActive: {
    fontFamily: theme.fonts.fontSemiBold,
  },
  logout: {
    height: theme.sizing(46),
    width: '80%',
    marginLeft: 0,
    paddingLeft: theme.spacing(40),
    backgroundColor: theme.colors.primary,
    borderTopRightRadius: 10.7,
    borderBottomRightRadius: 10.7,
  },
  logoutText: {
    color: theme.colors.white,
  },
});
