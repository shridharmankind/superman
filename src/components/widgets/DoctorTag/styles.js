import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 7,
    borderBottomRightRadius: 7,
    paddingVertical: themes.spacing(4),
    width: 37.3,
    height: 21.3,
  },
  labelContent: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default styles;
