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
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(22),
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
    opacity: 1,
  },
  leftArrow: {
    left: 0,
    top: 0,
  },
  arrowContainer: {
    position: 'absolute',
    backgroundColor: theme.colors.grey[1700],
    alignItems: 'center',
    height: '100%',
    flexDirection: 'row',
    minWidth: 25,
    opacity: 0.5,
    elevation: 10,
    zIndex: 1,
  },
  rightArrow: {
    right: 0,
    top: 0,
  },
  swapDiv: {
    padding: 70,
    textAlign: 'center',
    borderWidth: 1,
  },
  eDetailingNav: {
    backgroundColor: theme.colors.grey[1700],
  },
  priorityProducts: {
    paddingVertical: theme.spacing(15),
  },
});

export default styles;
