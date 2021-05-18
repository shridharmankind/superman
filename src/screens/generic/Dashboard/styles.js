import {StyleSheet, Dimensions} from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: 32,
    paddingVertical: 40,
    backgroundColor: theme.colors.background,
    height: Dimensions.get('screen').height,
    flexDirection: 'row',
  },
  sidemenuContainer: {
    width: 240,
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: theme.colors.white,
  },
  actionsContainer: {
    position: 'absolute',
    top: 40,
    right: 32,
    display: 'flex',
    flexDirection: 'row',
  },
  action: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
});
