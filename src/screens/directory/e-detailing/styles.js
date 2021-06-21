import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  eDetailingHead: {
    flexDirection: 'row',
    padding: theme.spacing(30),
    backgroundColor: theme.colors.grayishBlue,
    borderRadius: 16,
  },
  eDetailingHeadCol: {
    flexDirection: 'column',
  },
  eDetailingHeadBack: {
    paddingTop: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  eDetailingStart: {
    position: 'absolute',
    right: theme.spacing(20),
    top: theme.spacing(26),
  },
  eDetailingStartContent: {
    width: 165,
    marginHorizontal: theme.spacing(8),
    height: 42,
  },
  eDetailingStartText: {
    fontSize: 12,
  },
  eDetailingPriorityProducts: {
    marginBottom: 0,
  },
  eDetailingPriorityProductsList: {
    paddingTop: theme.spacing(13),
    height: 246,
  },
  swapMain: {
    marginLeft: 20,
  },
  swiperArrow: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.blue,
    borderWidth: 1,
    borderRadius: 1000,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    top: 80,
  },
  leftArrow: {
    position: 'absolute',
    left: 0,
  },
  rightArrow: {
    position: 'absolute',
    right: 0,
  },
  swapDiv: {
    padding: 70,
    textAlign: 'center',
    borderWidth: 1,
  },
});

export default styles;
