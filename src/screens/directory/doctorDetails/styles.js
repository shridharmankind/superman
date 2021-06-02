import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.grayishBlue,
    paddingTop: 27,
    paddingRight: 27,
    paddingLeft: 27,
    borderRadius: 20,
  },
  tabMainContainer: {
    flexDirection: 'row',
  },
  productMainContainer: {
    flexDirection: 'column',
    width: '65%',
  },
  headerProduct: {
    flexDirection: 'row',
  },
  cardContainer: {
    borderStyle: 'solid',
    borderColor: theme.colors.grey[400],
    borderWidth: 1,
    width: '50%',
    padding: 9,
    borderRadius: 8,
  },
  openMainTask: {
    flexDirection: 'column',
    width: '35%',
    borderLeftWidth: 0.5,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  leftTabContainer: {
    width: '65%',
    flexDirection: 'row',
  },
  dispinsingContainer: {
    width: '28%',
    flexDirection: 'row',
  },
  rightTabContainer: {
    justifyContent: 'flex-end',
  },
  buttonTabBar: {
    width: 120,
    marginHorizontal: 8,
    height: 42,
  },
  buttonTabBarText: {
    fontSize: 12,
  },
  MainDoctorDetail: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  doctorDetail: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  seperator: {
    paddingRight: 10,
    height: 50,
  },
  doctorName: {
    fontStyle: 'normal',
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontRegular,
  },
  count: {
    fontSize: 10,
    fontStyle: 'normal',
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontSemiBold,
    backgroundColor: theme.colors.grey[800],
    borderRadius: 50,
    paddingTop: 2,
    borderWidth: 0.3,
    borderStyle: 'solid',
    textAlign: 'center',
    alignItems: 'center',
    width: 20,
    marginLeft: 10,
    marginTop: 3,
    height: 20,
  },
  arrowBack: {
    marginTop: 6,
  },
  doctorProfile: {
    marginLeft: 10,
    fontSize: 22,
    fontFamily: theme.fonts.fontSemiBold,
    color: theme.colors.grey[200],
  },
  mainHeader: {
    fontSize: 18,
    marginBottom: 14,
    fontStyle: 'normal',
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontSemiBold,
  },
  divisionContainer: {
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 10,
    backgroundColor: theme.colors.orange[100],
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    top: -30,
    left: -28,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divisionText: {
    color: theme.colors.white,
  },
  anniversy: {
    flexDirection: 'column',
    flexGrow: 1,
    borderStartWidth: 0.4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  dateClass: {
    fontStyle: 'normal',
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontRegular,
  },
  birthdayClass: {
    flexDirection: 'row',
    textAlign: 'center',
  },
  location: {
    flexDirection: 'row',
  },
  mainTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  engment: {
    flexDirection: 'column',
    flexGrow: 2,
    borderStartWidth: 0.4,
    paddingLeft: 10,
  },
  cardHeader: {
    flexDirection: 'row',
  },
  cardHeaderTitle: {
    flexDirection: 'column',
    width: '90%',
  },
  labelTitle: {
    fontSize: 14,
    fontStyle: 'normal',
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontSemiBold,
  },
  labelSubTitle: {
    fontSize: 10,
    fontStyle: 'normal',
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontSemiBold,
    backgroundColor: theme.colors.grey[800],
    borderRadius: 50,
    borderWidth: 0.3,
    borderStyle: 'solid',
    textAlign: 'center',
  },
  labelSubHeader: {
    fontSize: 10,
    fontStyle: 'normal',
    color: theme.colors.primary,
    fontFamily: theme.fonts.fontRegular,
  },
  progressText: {
    fontSize: 20,
    fontStyle: 'normal',
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontBold,
  },
  arrowUp: {
    marginTop: 10,
  },
  percentageText: {
    marginTop: 8,
    fontSize: 14,
    fontStyle: 'normal',
    color: theme.colors.green[200],
    fontFamily: theme.fonts.fontRegular,
  },
  cardHeaderRightTitle: {
    flexDirection: 'column',
    width: '10%',
  },
  cardDetail: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  progreeBar: {
    paddingBottom: 8,
  },
  descriptionText: {
    fontSize: 10,
    fontStyle: 'normal',
    color: theme.colors.grey[900],
    fontFamily: theme.fonts.fontRegular,
  },
  tabBarContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    fontSize: 10,
  },
});

export default styles;
