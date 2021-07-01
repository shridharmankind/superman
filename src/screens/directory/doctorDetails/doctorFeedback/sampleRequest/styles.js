import {StyleSheet} from 'react-native';
import theme from 'themes';
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
  sampleImageStyle: {
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
    borderWidth: 1,
    padding: theme.spacing(20),
    marginRight: theme.spacing(10),
    borderRadius: 3,
  },
  checkStyling: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default styles;
