import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  detailsContainer: {
    justifyContent: 'space-between',
    width: '50%',
    flexGrow: 1,
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 32,
  },
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  divisionContainer: {
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: theme.colors.orange,
    padding: 10,
    position: 'absolute',
    top: -41,
    left: -33,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divisionText: {
    color: theme.colors.white,
  },
  checkContainer: {
    position: 'absolute',
    right: -21,
    top: -35,
  },
  location: {
    borderLeftColor: theme.colors.grey[200],
    borderLeftWidth: 1,
    paddingHorizontal: 10,
  },
  frequecyContainer: {
    flexDirection: 'row',
  },
  visitContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  seperator: {
    paddingRight: 10,
  },
});

export default styles;
