import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  doctorDetailsContainer: {
    marginVertical: 20,
  },
  doctorSelectedContainer: {
    flexDirection: 'row',
  },
  doctorDetails: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  left: {
    marginRight: themes.spacing(7),
  },
  right: {
    marginLeft: themes.spacing(7),
  },
});

export default styles;
