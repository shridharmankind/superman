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
});
