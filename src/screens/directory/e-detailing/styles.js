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
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    height: '100%',
    flexDirection: 'row',
    minWidth: 25,
    opacity: 0.7,
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
  otherProduct: {
    elevation: 0,
    borderWidth: 1,
    borderColor: theme.colors.grey[2300],
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 133,
    padding: 10,
  },
  otherProductImage: {
    width: 80,
    height: 53,
    marginBottom: theme.spacing(4),
  },
  otherProductTitle: {
    fontSize: 12.7,
    fontFamily: theme.fonts.fontRegular,
    marginBottom: 0,
    padding: 0,
  },
  modalTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(20),
  },
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalTitleDone: {
    position: 'absolute',
    right: -80,
  },
  subBrandList: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  subProduct: {
    marginRight: theme.spacing(13.3),
    marginBottom: theme.spacing(13.3),
  },
  modalTitleBack: {
    marginLeft: theme.spacing(10.7),
  },
  modalPosition: {
    width: '80%',
    left: '4%',
  },
});

export default styles;
