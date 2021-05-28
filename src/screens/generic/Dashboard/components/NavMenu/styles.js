import {StyleSheet, Platform} from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    width: 133,
    backgroundColor: 'lightblue',
  },
  navItemsContainer: {
    marginTop: theme.spacing(11),
  },
  navItem: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 6.7,
    // paddingVertical: 18.7,
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({web: {cursor: 'pointer'}}),
    backgroundColor: 'lightblue',
  },
  navItemActive: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  navItemLabel: {
    marginLeft: 13,
    color: theme.colors.primary,
    fontSize: 12.7,
    lineHeight: 20,
    letterSpacing: 0,
  },
  navItemLabelActive: {
    fontFamily: theme.fonts.fontSemiBold,
  },
});
