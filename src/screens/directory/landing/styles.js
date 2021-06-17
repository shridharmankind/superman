import { StyleSheet } from 'react-native';
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
  searchContainer: {
    flexDirection: 'row',
    width: '80%',
    marginBottom: theme.spacing(24),
  },
  searchBar: {
    width: '100%',
    height: 42.7,
    borderRadius: 6.7,
    backgroundColor: theme.colors.grey[1700],
    paddingLeft: theme.spacing(24),
  },
  searchIcon: {
    position: 'absolute',
    top: 14,
    right: 18.7,
  },
  listHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing(16),
    marginLeft: theme.spacing(57.3),
  },
  listBody: { maxHeight: 500 },
  division: {
    width: '23%',
    fontSize: 10.7,
    fontFamily: theme.fonts.fontSemiBold,
    color: theme.colors.grey[1600],
    marginRight:theme.spacing(10),
  },
  colwidth:{
    width:'19%'
  },
  doctorDataRow: {
    flexDirection: 'row',
    paddingLeft: theme.spacing(57.3),
    paddingTop: theme.spacing(30),
    paddingBottom:theme.spacing(13.3),
    shadowColor: "#000",
    shadowOpacity: 0.10,
    elevation: 1,
    alignItems: 'center',
    borderWidth:1,
    borderColor: theme.colors.grey[1000],
  },
  dataStyle: {
    fontFamily: theme.fonts.fontRegular,
    fontSize: 12,
    color: theme.colors.grey[200],
    width: '19%',
    marginRight:theme.spacing(10),
  },
  docImage: {
    width: 26.7,
    height: 26.7,
    marginRight: theme.spacing(4),
  },
  todayPlanbuttonLayout: {
    marginRight: theme.spacing(8),
    paddingHorizontal: theme.spacing(8),
    width: 155,
    height: 35,
    alignSelf:'flex-end',
  },
  eDetailbuttonLayout: {
    marginRight: theme.spacing(8),
    paddingHorizontal: theme.spacing(8),
    width: 80,
    height: 35,
    alignSelf:'flex-end'
  },
  scrollPad: {
    paddingRight: theme.spacing(10),
  },
  category: {
    borderTopLeftRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: theme.colors.orange[100],
    paddingHorizontal: theme.spacing(10),
    paddingVertical: theme.spacing(4),
    marginRight: theme.spacing(5),
  },
  kycCatContainer:{
    position: 'absolute',
     top:0,
     left:0,
     flexDirection:'row'
  },
  btnContent:{
    textAlign:'center'
  },
  btnsContainer:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'flex-end',
    width:'35%',
  },

});

export default styles;
