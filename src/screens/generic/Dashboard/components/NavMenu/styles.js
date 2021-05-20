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
});
