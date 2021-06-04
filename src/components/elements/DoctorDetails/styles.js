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
    width: 48,
    height: 48,
    borderRadius: 1000,
    marginRight: 21,
  },
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  divisionContainer: {
    borderTopLeftRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: theme.colors.orange[100],
    paddingHorizontal: 9,
    paddingVertical: 4,
    position: 'absolute',
    top: -27,
    left: -22,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divisionText: {
    color: theme.colors.white,
  },
  checkContainer: {
    position: 'absolute',
    right: -8,
    top: -17,
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
    alignSelf: 'flex-end',
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
  container: {
    flex: 1,
  },
});

export default styles;
