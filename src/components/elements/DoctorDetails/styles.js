import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    marginTop: 20,
    zIndex: 1,
    width: '50%',
  },
  detailsContainer: {
    paddingHorizontal: 32,
    paddingVertical: 40,
    borderColor: theme.colors.borderColor,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'space-between',
    // margin: 10,
    // flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    right: -25,
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
