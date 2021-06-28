import parentStyles from '../styles';
import {StyleSheet} from 'react-native';
import theme from 'themes';
const styles = StyleSheet.create({
  division: {
    ...parentStyles.division,
    textTransform: 'uppercase',
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
    paddingHorizontal: theme.spacing(32),
    paddingVertical: theme.spacing(20),
    borderColor: theme.colors.grey[400],
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    // marginBottom: theme.spacing(15),
  },
  nameContainer: {
    flexDirection: 'row',
    // minWidth: 350,
  },
  specialization: {
    paddingRight: theme.spacing(10),
    textTransform: 'capitalize',
  },
  divisionContainer: {
    paddingVertical: theme.spacing(5),
    paddingHorizontal: theme.spacing(10),
    left: -43,
  },
  image: {
    width: 26.7,
    height: 26.7,
    borderRadius: 26.7,
    marginTop: theme.spacing(8),
  },
  detailsContainer: {
    // width: '100%',
  },
  nameRow: {
    flexDirection: 'row',
  },
  name: {
    flex: 0.26,
  },
});

export default styles;
