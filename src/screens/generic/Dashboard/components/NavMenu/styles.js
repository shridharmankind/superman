import {StyleSheet, Platform} from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    width: 133,
    alignSelf: 'center',
  },
  navItemsContainer: {
    marginTop: theme.spacing(88),
  },
  navItem: {
    height: 58.7,
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
});
