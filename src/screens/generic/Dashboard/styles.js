import {StyleSheet, Platform} from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  scroll: {
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    position: 'relative',
    paddingVertical: 40,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidemenuContainer: {
    width: 'auto',
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
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({web: {cursor: 'pointer'}}),
  },
  actionPadding: {
    marginLeft: 24,
  },
});
