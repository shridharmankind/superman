import {StyleSheet, Platform, Dimensions} from 'react-native';
import theme from 'themes';

console.log('Dimensions window', Dimensions.get('window'));
console.log('Dimensions screen', Dimensions.get('screen'));

export default StyleSheet.create({
  scroll: {
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    position: 'relative',
    marginHorizontal: 21.3,
    paddingVertical: 26.7,
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
