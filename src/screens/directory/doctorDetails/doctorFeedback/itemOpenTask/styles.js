import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  question: {
    fontSize: 22.7,
  },
  answerSection: {
    marginTop: themes.spacing(42.7),
    flex: 1,
  },
  slideStyle: {
    height: '100%',
    padding: themes.spacing(32),
    marginRight: themes.spacing(32),
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.9,
    elevation: 5,
    backgroundColor: themes.colors.white,
    borderRadius: 13.3,
    borderWidth: 1,
    borderColor: themes.colors.grey[1000],
  },
  scrollPad: {
    paddingRight: themes.spacing(10),
  },
  sampleStyling: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.7,
    borderColor: themes.colors.primary,
    paddingVertical: themes.spacing(10),
    paddingLeft: themes.spacing(26.7),
    marginBottom: themes.spacing(8),
    borderRadius: 4,
  },
  highlightRow: {
    backgroundColor: themes.colors.primary,
  },
  rowText: {
    color: themes.colors.grey[200],
  },
  highLightRowText: {
    color: themes.colors.white,
  },
  leftAlign: {
    flexDirection: 'row',
  },
  rightAlign: {
    flexDirection: 'row',
  },
  stockData: {
    flexDirection: 'column',
    marginRight: themes.spacing(20),
  },
  searchSampleImageStyle: {
    width: 114,
    height: 66.7,
    marginRight: themes.spacing(20),
    marginBottom: themes.spacing(18),
  },
  rowSampleStyle: {
    width: 100,
    height: 46.7,
    marginRight: themes.spacing(20),
  },
  btnStyle: {
    width: 46.7,
    height: 46.7,
    borderRadius: 0,
    marginRight: themes.spacing(6.7),
  },
  highLightBtnStyle: {
    borderWidth: 1,
    borderColor: themes.colors.white,
    width: 46.7,
    height: 46.7,
    borderRadius: 0,
    marginRight: themes.spacing(6.7),
  },
  modalPosition: {
    width: '80%',
    left: '4%',
  },
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: themes.spacing(20),
  },
  addSelectedBtn: {
    width: 165,
    height: 42.7,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 13,
  },
  searchBar: {
    width: '80%',
    height: 42.7,
    borderRadius: 6.7,
    backgroundColor: themes.colors.grey[1700],
    paddingLeft: themes.spacing(24),
  },
  resultSection: {
    flexDirection: 'row',
    marginTop: themes.spacing(20),
  },
  searchSampleStyling: {
    borderWidth: 0.7,
    marginRight: themes.spacing(10),
    borderRadius: 6.7,
    width: 200,
    height: 133,
    borderColor: themes.colors.primary,
    paddingHorizontal: themes.spacing(16),
    paddingVertical: themes.spacing(13.3),
  },
  checkStyling: {
    position: 'absolute',
    top: 3.3,
    right: 3.3,
  },
  toastContainer: {
    position: 'absolute',
    top: '10%',
    left: '50%',
    zIndex: 100,
    width: 300,
    padding: themes.spacing(10),
    minHeight: 50,
    backgroundColor: themes.colors.yellow[100],
    borderRadius: 4,
  },
  noSampleCheck: {
    position: 'absolute',
    right: 60,
    top: 10,
    flexDirection: 'row',
  },
  iconStyling: {
    position: 'relative',
    top: 5,
    right: 5,
  },
  closeIconToast: {
    width: 32,
    height: 32,
    borderRadius: themes.spacing(26),
    backgroundColor: themes.colors.white,
    shadowColor: themes.colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    top: -10,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: -30,
    right: -80,
    width: 32,
    height: 32,
    borderRadius: themes.spacing(26),
    backgroundColor: themes.colors.primary,
    shadowColor: themes.colors.black,
  },
  sampleListContainer: {
    maxHeight: 300,
  },
  flexRow: {
    flexDirection: 'row',
  },
  errStyling: {
    color: themes.colors.white,
  },
});

export default styles;
