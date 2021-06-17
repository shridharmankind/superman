import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  areaChip: {
    marginRight: themes.spacing(14),
  },
  areaFilter: {
    flex: 1,
    overflow: 'hidden',
    zIndex: 19,
  },
  swiperArrow: {
    backgroundColor: themes.colors.white,
    borderColor: themes.colors.blue,
    borderWidth: 1,
    borderRadius: 1000,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    top: 7,
  },
  leftArrow: {
    position: 'absolute',
    left: 0,
  },
  rightArrow: {
    position: 'absolute',
    right: 0,
  },
  selectAreaContainer: {
    flexDirection: 'column',
  },
  areaFilterContainer: {
    flexDirection: 'row',
    marginVertical: themes.spacing(20),
  },
  yesBtn: {
    justifyContent: 'space-between',
  },
});

export default styles;
