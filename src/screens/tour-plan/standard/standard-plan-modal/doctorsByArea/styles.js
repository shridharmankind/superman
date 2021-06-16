import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  doctorDetailsContainer: {
    marginVertical: themes.spacing(20),
  },
  doctorSelectedContainer: {
    flexDirection: 'row',
  },
  doctorDetails: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: themes.spacing(20),
  },
  left: {
    marginRight: themes.spacing(7),
  },
  right: {
    marginLeft: themes.spacing(7),
  },
});

export default styles;
