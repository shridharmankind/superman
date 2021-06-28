import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 7,
    borderBottomRightRadius: 7,
    paddingVertical: themes.spacing(4),
    paddingHorizontal: themes.spacing(6),
    alignSelf: 'flex-end',
    height: 21.3,
    marginBottom: themes.spacing(2),
    marginRight: themes.spacing(2),
  },
  labelContent: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default styles;
