import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  questionSection: {
    // marginBottom: themes.spacing(16),
  },
  question: {
    fontSize: 22.7,
  },
  swapMain: {
    // marginBottom: themes.spacing(20),
    // flexDirection: 'row',
    // width: '10%',
  },
  priorityProduct: {
    fontSize: 16,
    color: themes.colors.grey[200],
    marginBottom: themes.spacing(10),
    marginTop: themes.spacing(20),
  },
  discussProduct: {
    fontSize: 16,
    color: themes.colors.grey[200],
    marginBottom: themes.spacing(20),
    marginTop: themes.spacing(10),
  },
  subBrandList: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  subProduct: {
    marginRight: themes.spacing(13.3),
    marginBottom: themes.spacing(13.3),
  },
  eDetailed: {
    paddingVertical: themes.spacing(20),
    paddingHorizontal: themes.spacing(50),
    borderRadius: themes.spacing(5),
    marginRight: themes.spacing(10),
    color: themes.colors.white,
    backgroundColor: themes.colors.primary,
  },
  discussList: {
    paddingVertical: themes.spacing(20),
    paddingHorizontal: themes.spacing(50),
    borderRadius: themes.spacing(5),
    marginRight: themes.spacing(10),
    color: themes.colors.white,
    backgroundColor: themes.colors.blue[100],
  },
  eDetailedNonFeature: {
    paddingVertical: themes.spacing(20),
    paddingHorizontal: themes.spacing(50),
    borderRadius: themes.spacing(5),
    marginRight: themes.spacing(10),
    borderWidth: 1,
  },
  virtualList: {
    // flex: 1,
    //zIndex: 9999,
    marginBottom: themes.spacing(20),
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
  discussedMain: {
    marginTop: themes.spacing(10),
  },
  modalTitleBack: {
    marginLeft: themes.spacing(10.7),
  },
  modalPosition: {
    width: '80%',
    left: '4%',
  },
  modalTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: themes.spacing(20),
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
  eDetailingStartContent: {
    width: 165,
    marginHorizontal: themes.spacing(8),
    height: 42,
  },
  eDetailingStartText: {
    fontSize: 12,
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
    opacity: 1,
  },
  leftArrow: {
    left: 0,
    top: 0,
  },
  arrowContainer: {
    position: 'absolute',
    backgroundColor: themes.colors.white,
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
});

export default styles;
