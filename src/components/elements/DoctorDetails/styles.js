import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  detailsContainer: {
    justifyContent: 'space-between',
    width: '100%',
    flexGrow: 1,
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
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
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    alignSelf: 'center',
  },
  visitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  seperator: {
    paddingRight: 10,
  },
  doctorTile: {
    marginTop: 10,
  },
  borderOuterContainer: {
    height: 1,
    overflow: 'hidden',
    marginTop: 2,
    paddingBottom: 5,
  },
  borderInnerContainer: {
    height: 1,
    borderWidth: 0.5,
    borderColor: theme.colors.grey[200],
    borderStyle: 'dashed',
    borderRadius: 0.00000001,
  },
  tileContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginRight: 5,
  },
  tileLeft: {
    flexDirection: 'row',
    flexGrow: 2,
    alignItems: 'center',
  },
  tileText: {
    fontSize: 12,
    color: theme.colors.grey[600],
  },
  titleTextSecondary: {
    marginLeft: 10,
  },
});

export default styles;
