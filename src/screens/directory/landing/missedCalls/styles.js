import parentStyles from '../styles';
import {StyleSheet} from 'react-native';
import theme from 'themes';
const styles = StyleSheet.create({
  division: {
    ...parentStyles.division,
    textTransform: 'uppercase',
    marginRight: 0,
    // flex: 0.25,
    width: '100%',
  },
  doctorDataRowFirstChild: {
    ...parentStyles.doctorDataRow,
    borderRadius: 6.7,
    borderTopWidth: 2,
  },
  doctorDetailWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  doctorDetailContainer: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: theme.spacing(32),
    paddingRight: theme.spacing(16),
    paddingVertical: theme.spacing(20),
    borderColor: theme.colors.grey[400],
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    // marginBottom: theme.spacing(15),
  },
  btnAddToToday: {
    height: 42.7,
    width: 150,
  },
  listHeaderSpacing1: {
    width: '30%',
  },
  listHeaderSpacing2: {
    width: '23%',
  },
  listHeader: {
    ...parentStyles.listHeader,
    marginLeft: theme.spacing(34),
  },
});

export default styles;
