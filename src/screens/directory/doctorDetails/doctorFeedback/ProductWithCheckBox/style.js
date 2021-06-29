import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  eDetailedNonFeature: {
    paddingVertical: themes.spacing(20),
    paddingHorizontal: themes.spacing(50),
    borderRadius: themes.spacing(5),
    marginRight: themes.spacing(10),
    borderWidth: 1,
  },
  productCheck: {
    position: 'absolute',
    right: 13,
    top: 13,
    zIndex: 1,
  },
});

export default styles;
