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
    paddingHorizontal: theme.spacing(32),
    paddingVertical: theme.spacing(20),
    borderColor: theme.colors.grey[500],
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    marginBottom: theme.spacing(15),
  },
  heading: {
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(10),
  },
  nameContainer: {
    flexDirection: 'row',
    minWidth: theme.spacing(350),
  },
  specialization: {
    paddingRight: theme.spacing(10),
  },
  divisionContainer: {
    paddingVertical: theme.spacing(5),
    paddingHorizontal: theme.spacing(10),
    top: theme.spacing(-21),
    left: theme.spacing(-34),
  },
  image: {
    width: theme.spacing(64),
    height: theme.spacing(64),
    borderRadius: 32,
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(5),
  },
  removeCard: {
    height: '100%',
    paddingBottom: theme.spacing(20),
    justifyContent: 'center',
  },
  removeCardButton: {
    height: '100%',
    width: theme.spacing(100),
    backgroundColor: theme.colors.red[200],
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: theme.spacing(15),
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
    paddingBottom: theme.spacing(1),
  },
  swipeRow: {
    marginTop: theme.spacing(20),
  },
  modalView: {
    width: theme.spacing(300),
    height: theme.spacing(200),
  },
  modalContentView: {
    paddingTop: theme.spacing(50),
    paddingBottom: theme.spacing(30),
  },
  modalTitle: {
    paddingTop: theme.spacing(30),
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
  rowFront: {
    backgroundColor: theme.colors.white,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: theme.colors.transparent,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(15),
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(20),
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: theme.spacing(100),
  },
  backRightBtnRight: {
    backgroundColor: theme.colors.red[200],
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: theme.spacing(15),
    right: 0,
  },
});

export default styles;
