import {StyleSheet} from 'react-native';
import theme from 'themes';
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
    fontSize: 10,
  },
  mainTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(21.3),
    paddingRight: theme.spacing(26.7),
    paddingTop: theme.spacing(32),
  },
  subHeading: {
    flexDirection: 'row',
    width: '100%',
    padding: theme.spacing(5),
    marginTop: theme.spacing(10),
  },
  listHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing(16),
    marginLeft: theme.spacing(10.3),
  },
  listBody: {maxHeight: 500},
  division: {
    width: '15%',
    fontSize: 10.7,
    fontFamily: theme.fonts.fontSemiBold,
    color: theme.colors.grey[1600],
    marginRight: theme.spacing(10),
  },
  colwidth: {
    width: '16%',
  },
  conflictRow: {
    flexDirection: 'row',
    paddingLeft: theme.spacing(10.3),
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(13.3),
    shadowColor: theme.colors.grey[200],
    shadowOpacity: 0.1,
    elevation: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.grey[1000],
  },
  dataStyle: {
    fontFamily: theme.fonts.fontRegular,
    fontSize: 12,
    color: theme.colors.grey[200],
    width: '17%',
    marginRight: theme.spacing(5),
  },
  buttonLayout: {
    marginRight: theme.spacing(8),
    paddingHorizontal: theme.spacing(8),
    width: 120,
    height: 45,
    alignSelf: 'flex-end',
  },
  scrollPad: {
    paddingRight: theme.spacing(10),
  },
  leftPadding: {
    paddingLeft: theme.spacing(40),
    marginRight: theme.spacing(20),
  },
  btnContent: {
    textAlign: 'center',
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '15%',
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});

export default styles;
