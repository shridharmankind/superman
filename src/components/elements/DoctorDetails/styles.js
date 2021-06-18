import {StyleSheet} from 'react-native';
import themes from 'themes';

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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'center',
    alignSelf: 'center',
  },
  divisionContainer: {
    position: 'absolute',
    top: -27,
    left: -22,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  divisionItem: {
    borderTopLeftRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: themes.colors.orange[100],
    paddingHorizontal: themes.spacing(10),
    paddingVertical: themes.spacing(4),
    marginRight: themes.spacing(5),
  },
  divisionText: {
    color: themes.colors.white,
    textTransform: 'uppercase',
  },
  checkContainer: {
    position: 'absolute',
    right: -8,
    top: -17,
  },
  location: {
    borderLeftColor: themes.colors.grey[200],
    borderLeftWidth: 1,
    paddingHorizontal: themes.spacing(10),
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
    paddingRight: themes.spacing(10),
  },
  doctorTile: {
    marginTop: themes.spacing(10),
  },
  borderOuterContainer: {
    height: 1,
    overflow: 'hidden',
    marginTop: themes.spacing(2),
    paddingBottom: themes.spacing(5),
  },
  borderInnerContainer: {
    height: 1,
    borderWidth: 0.5,
    borderColor: themes.colors.grey[200],
    borderStyle: 'dashed',
    borderRadius: 0.00000001,
  },
  tileContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: themes.spacing(5),
    marginRight: themes.spacing(5),
  },
  tileLeft: {
    flexDirection: 'row',
    flexGrow: 2,
    alignItems: 'center',
  },
  tileText: {
    fontSize: 12,
    color: themes.colors.grey[600],
  },
  titleTextSecondary: {
    marginLeft: themes.spacing(10),
  },
  container: {
    flex: 1,
  },
  name: {
    flex: 1,
    textTransform: 'capitalize',
  },
  capitalize: {textTransform: 'capitalize'},
});

export default styles;
