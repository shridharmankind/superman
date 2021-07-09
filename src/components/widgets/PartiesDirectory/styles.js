import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  detailsContainerWeb: {
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  image: {
    marginRight: 21,
    width: 26.7,
    height: 26.7,
    borderRadius: 26.7,
    marginTop: themes.spacing(8),
  },
  nameContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  divisionContainer: {
    position: 'absolute',
    top: -31,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: themes.spacing(5),
    paddingHorizontal: themes.spacing(10),
    left: -43,
  },
  divisionContainerWeb: {
    top: -30,
  },
  container: {
    flex: 1,
  },
  name: {
    textTransform: 'capitalize',
    fontSize: 12,
  },
  capitalize: {textTransform: 'capitalize'},
  itemContainer: {
    width: '25%',
  },
  itemContainer1: {
    width: '22%',
  },
  itemContainer2: {
    width: '21.5%',
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
    alignSelf: 'flex-start',
    marginTop: themes.spacing(5),
    marginRight: themes.spacing(5),
  },
  tileLeft: {
    flexDirection: 'row',
  },
  missedCountTitle: {
    color: themes.colors.red[300],
    fontSize: 12,
  },
});

export default styles;
