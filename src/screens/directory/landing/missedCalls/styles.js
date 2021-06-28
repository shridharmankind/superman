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
});

export default styles;
