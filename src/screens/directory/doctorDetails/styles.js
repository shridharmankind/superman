import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.grayishBlue,
    paddingTop: theme.spacing(26.7),
    paddingRight: theme.spacing(26.7),
    paddingLeft: theme.spacing(26.7),
    borderRadius: 26.7,
  },
  tabMainContainer: {
    flexDirection: 'row',
  },
  productMainContainer: {
    flexDirection: 'column',
    width: '63%',
  },
  cardMainContainer: {
    flexDirection: 'row',
  },
  headerProduct: {
    flexDirection: 'row',
  },
  cardContainer: {
    borderStyle: 'solid',
    borderColor: theme.colors.grey[400],
    borderWidth: 1,
    width: '47%',
    padding: theme.spacing(8.7),
    marginRight: theme.spacing(13.7),
    borderRadius: 9.3,
  },
  openMainTask: {
    width: '37%',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingBottom: theme.spacing(30),
  },
  leftTabContainer: {
    flexDirection: 'row',
  },
  dispinsingContainer: {
    flexDirection: 'row',
  },
  rightTabContainer: {
    position: 'absolute',
    right: 0,
  },
  buttonTabBar: {
    width: 135,
    marginHorizontal: theme.spacing(8),
    height: 42,
  },
  buttonTabBarText: {
    fontSize: 12,
  },
  buttonMoreText: {
    width: 135,
    marginHorizontal: theme.spacing(8),
    height: 42,
    backgroundColor: theme.colors.grayishBlue,
  },
  MainDoctorDetail: {
    flexDirection: 'row',
    marginBottom: theme.spacing(30),
  },
  doctorDetail: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: theme.spacing(20),
  },
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  doctorName: {
    fontStyle: 'normal',
  },
  count: {
    fontStyle: 'normal',
    backgroundColor: theme.colors.grey[1000],
    borderRadius: 50,
    paddingTop: theme.spacing(2),
    borderWidth: 0.3,
    borderStyle: 'solid',
    textAlign: 'center',
    alignItems: 'center',
    width: 20,
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(3),
    height: 20,
  },
  arrowBack: {
    marginTop: theme.spacing(6),
  },
  doctorProfile: {
    marginLeft: theme.spacing(10),
    fontSize: 22,
    fontFamily: theme.fonts.fontSemiBold,
    color: theme.colors.grey[200],
  },
  mainHeader: {
    marginBottom: theme.spacing(14),
    fontStyle: 'normal',
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
    borderStartColor: theme.colors.grey[100],
    paddingLeft: theme.spacing(21.3),
  },
  dateClass: {
    fontStyle: 'normal',
    paddingLeft: theme.spacing(12),
  },
  birthdayClass: {
    flexDirection: 'row',
    textAlign: 'center',
    paddingBottom: theme.spacing(4),
  },
  birthdayBorder: {
    borderRadius: 50,
    borderColor: theme.colors.grey[100],
    borderWidth: 0.3,
    marginTop: theme.spacing(2),
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
    flexGrow: 6,
    borderStartWidth: 0.4,
    borderStartColor: theme.colors.grey[100],
    paddingLeft: theme.spacing(10),
  },
  engmentContainer: {
    flexDirection: 'row',
  },
  cardHeader: {
    flexDirection: 'row',
  },
  cardHeaderTitle: {
    flexDirection: 'column',
    width: '90%',
  },
  labelTitle: {
    fontStyle: 'normal',
  },
  labelSubTitle: {
    fontStyle: 'normal',
    paddingTop: theme.spacing(5),
    backgroundColor: theme.colors.grey[1000],
    borderRadius: 50,
    borderWidth: 0.3,
    borderStyle: 'solid',
    textAlign: 'center',
  },
  labelSubHeader: {
    fontStyle: 'normal',
  },
  progressText: {
    fontSize: 20,
    fontStyle: 'normal',
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontBold,
  },
  arrowUp: {
    marginTop: theme.spacing(10),
  },
  percentageText: {
    marginTop: theme.spacing(8),
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
    paddingBottom: theme.spacing(10),
  },
  progreesBar: {
    paddingBottom: theme.spacing(8),
  },
  descriptionText: {
    fontStyle: 'normal',
  },
  tabBarContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    fontSize: 10,
  },
});

export default styles;
