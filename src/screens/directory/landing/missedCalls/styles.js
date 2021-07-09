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
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(8),
    borderColor: theme.colors.grey[400],
    borderWidth: 1,
    width: '100%',
    marginBottom: theme.spacing(15),
    borderRadius: 10,
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
  listHeaderSpacing2Web: {
    width: '19.2%',
  },
  listHeaderSpacing3: {
    width: '17.5%',
  },
  listHeader: {
    ...parentStyles.listHeader,
    flexDirection: 'row',
    marginLeft: theme.spacing(34),
  },
  itemContainer: {
    width: '25%',
  },
  itemContainer1: {
    width: '18%',
  },
  name: {
    textTransform: 'capitalize',
    fontSize: 12,
  },
  listHeaderWeb: {
    marginLeft: theme.spacing(35),
  },
});

export default styles;
