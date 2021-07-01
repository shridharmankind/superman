import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing(32),
    paddingBottom: theme.spacing(66.7),
    flex: 1,
    marginHorizontal: theme.spacing(101),
    marginVertical: theme.spacing(53.3),
    borderRadius: 13.3,
    backgroundColor: theme.colors.white,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 2,
  },
  paginationItemActive: {
    width: 48,
    backgroundColor: theme.colors.primary,
    opacity: 1,
  },
  paginationItem: {
    width: 6.7,
    height: 6.7,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    opacity: 1,
  },
  pagination: {
    position: 'absolute',
    bottom: 0,
  },
  swiperList: {
    overflow: 'visible',
  },
  slideWrapper: {
    backgroundColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    marginRight: theme.spacing(20),
  },
  exitActionContent: {
    width: 66.7,
    marginHorizontal: theme.spacing(8),
    height: 42,
  },
  exitActionText: {
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: theme.spacing(10),
    marginBottom: theme.spacing(26.7),
  },
  headCol: {
    flex: 1,
  },
  exitAction: {
    flex: 1,
    position: 'absolute',
    right: 0,
  },
});

export default styles;
