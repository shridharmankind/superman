import {StyleSheet, Platform} from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  scroll: {
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    position: 'relative',
    paddingVertical: theme.spacing(26.7),
    marginRight: theme.spacing(21.3),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidemenuContainer: {
    width: theme.sizing(181.3),
    height: '100%',
  },
  actionsContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
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
});
