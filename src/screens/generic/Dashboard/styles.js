import {StyleSheet, Platform} from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    paddingVertical: theme.spacing(26.7),
    paddingRight: theme.spacing(21.3),
    backgroundColor: theme.colors.background,
  },
  sidemenuContainer: {
    width: 181.3,
    height: '100%',
  },
  actionsContainer: {
    position: 'absolute',
    top: theme.spacing(26.7),
    right: theme.spacing(21.3),
    display: 'flex',
    flexDirection: 'row',
  },
  action: {
    height: 26.7,
    width: 26.7,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({web: {cursor: 'pointer'}}),
  },
  actionPadding: {
    marginLeft: theme.spacing(26.7),
  },
  globalSearchBar: {
    width: 266.7,
    height: 37.3,
    borderWidth: 1,
    borderRadius: 13.3,
    backgroundColor: theme.colors.grey[200],
    paddingHorizontal: theme.spacing(16),
    paddingVertical: theme.spacing(10.7),
    color: theme.colors.white,
  },
  searchIcon: {
    position: 'absolute',
    right: 16,
    top: 10.7,
  },
});
