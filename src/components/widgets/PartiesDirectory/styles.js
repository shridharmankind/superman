import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    flexDirection: 'row',
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
  },
  divisionContainer: {
    position: 'absolute',
    top: -27,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: themes.spacing(5),
    paddingHorizontal: themes.spacing(10),
    left: -43,
  },
  borderOuterContainer: {
    height: 1,
    overflow: 'hidden',
    marginTop: themes.spacing(2),
    paddingBottom: themes.spacing(5),
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
    width: '30%',
  },
});

export default styles;
