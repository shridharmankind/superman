import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  container: {
    padding: themes.spacing(32),
    paddingBottom: themes.spacing(66.7),
    flex: 1,
    marginHorizontal: themes.spacing(101),
    marginVertical: themes.spacing(53.3),
    borderRadius: 13.3,
    backgroundColor: themes.colors.white,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 2,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerDataStyle: {flexDirection: 'row', alignItems: 'center'},
  section: {
    flex: 1,
    overflow: 'visible',
    marginTop: themes.spacing(30),
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
  dateStyling: {
    fontSize: 12.7,
    fontFamily: themes.fonts.fontRegular,
    color: themes.colors.grey[200],
    marginLeft: themes.spacing(35),
  },
  heading: {
    alignSelf: 'flex-end',
  },
  leftAlign: {
    flexDirection: 'row',
  },
  rightAlign: {flexDirection: 'row', marginLeft: themes.spacing(25.7)},
  button: {
    paddingVertical: themes.spacing(12),
    paddingHorizontal: themes.spacing(66),
  },
  paginationItem: {
    width: 6.7,
    height: 6.7,
    borderRadius: 4,
    backgroundColor: themes.colors.primary,
    opacity: 1,
  },
  footerSection: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  paginationStyle: {
    position: 'absolute',
    bottom: -100,
  },
  activePaginationItem: {
    width: 72,
    backgroundColor: themes.colors.primary,
    opacity: 1,
  },
  backArrow: {
    marginRight: themes.spacing(8),
  },
  swiperListStyle: {
    overflow: 'visible',
  },
  nameStyling:{
    fontSize: 22.7,
    fontFamily: themes.fonts.fontLight,
    color: themes.colors.grey[200],
  },
  highlighted:{
    color:themes.colors.primary,
  }
});

export default styles;
