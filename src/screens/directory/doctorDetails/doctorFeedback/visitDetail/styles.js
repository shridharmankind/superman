import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
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
  question: {
    fontSize: 22.7,
  },
  answerSection: {
    marginTop: themes.spacing(42.7),
    flexDirection: 'row',
  },
  avtarStyle: {
    resizeMode: 'contain',
    width: 51,
    height: 57,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  jointavtarStyle: {
    resizeMode: 'contain',
    width: 92,
    height: 60,
  },
  imgContainer: {
    width: 160,
    height: 160,
    borderRadius: 160,
    borderWidth: 1,
    borderColor: themes.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallImgContainer: {
    width: 86.7,
    height: 86.7,
    borderRadius: 160,
    borderWidth: 1,
    borderColor: themes.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    alignSelf: 'flex-end',
    marginLeft: themes.spacing(6.7),
  },
  centerHeading: {
    alignSelf: 'center',
  },
  leftAlign: {
    flexDirection: 'row',
  },
  rightAlign: {flexDirection: 'column', marginLeft: themes.spacing(25.7)},
  highlighted: {
    color: themes.colors.primary,
  },
  footerSection: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  highlightedVisitType: {
    backgroundColor: themes.colors.primary,
  },
  jointVisitorSection: {
    flexDirection: 'row',
    marginTop: themes.spacing(26.7),
  },
  flexRow: {
    flexDirection: 'row',
  },
  mrListSpacing: {
    marginRight: themes.spacing(26),
    flexDirection: 'row',
  },
  checkStyling: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  singleVisitCheckStyling: {
    position: 'absolute',
    left: 20,
    top: 0,
    zIndex: 1,
  },
});

export default styles;
