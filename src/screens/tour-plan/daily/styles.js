import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  doctorDetailWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  doctorDetailContainer: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderColor: theme.colors.grey[500],
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    marginBottom: 15,
  },
  heading: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    minWidth: 350,
  },
  specialization: {
    paddingRight: 10,
  },
  divisionContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    top: -21,
    left: -34,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginTop: 8,
  },
  dailyTitle: {
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontRegular,
    fontSize: 16,
  },
  visitText: {
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontBold,
  },
  removeCardButtonContainer: {
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    marginTop: 5,
  },
  removeCard: {
    height: '100%',
    paddingBottom: 20,
    justifyContent: 'center',
  },
  removeCardButton: {
    height: '100%',
    width: 100,
    backgroundColor: theme.colors.red[200],
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 15,
  },
  removeCardButtonClose: {
    fontSize: 28,
  },
  removeCardButtonText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.fontRegular,
    fontSize: 11,
    textAlign: 'center',
  },
  closeLabel: {
    paddingBottom: 1,
  },
  swipeRow: {
    marginTop: 20,
  },
  modalView: {
    width: 300,
    height: 200,
  },
  modalContentView: {
    paddingTop: 50,
    paddingBottom: 30,
  },
  modalTitle: {
    paddingTop: 30,
    justifyContent: 'center',
  },
  modalTitleText: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    width: '100%',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    // alignItems: 'center',
    backgroundColor: 'white',
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
    // justifyContent: 'center',
    // height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginTop: 8,
    marginBottom: 20,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 95,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    // backgroundColor: 'red',
    backgroundColor: theme.colors.red[200],
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 15,
    right: 0,
  },
});

export default styles;
