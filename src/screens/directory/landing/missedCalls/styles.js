import parentStyles from '../styles';
import {StyleSheet} from 'react-native';
import theme from 'themes';
const styles = StyleSheet.create({
  division: {
    ...parentStyles.division,
    textTransform: 'uppercase',
    marginRight: 0,
    width: '100%',
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
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    borderColor: theme.colors.grey[400],
    borderWidth: 0.5,
    width: '100%',
  },
  doctorDetailContainerFirstChild: {
    borderTopLeftRadius: 6.7,
    borderTopRightRadius: 6.7,
  },
  btnAddToToday: {
    height: 42.7,
    width: 150,
  },
  listHeaderSpacing1: {
    width: '25%',
  },
  listHeaderSpacing2: {
    width: '17.5%',
  },
  listHeaderSpacing3: {
    width: '17.5%',
  },
  listHeader: {
    ...parentStyles.listHeader,
    marginLeft: theme.spacing(34),
  },
});

export default styles;
