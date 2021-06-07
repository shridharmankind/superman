import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  timeline: {
    flex: 1,
    flexDirection: 'row',
  },
  timeline__list: {
    flex: 1,
  },
  timeline__itemContainer: {
    display: 'flex',
  },
  timeline__item: {
    alignItems: 'flex-start',
    width: '50%',
    paddingBottom: 20,
    borderStyle: 'dashed',
    borderRadius: 0.00001,
    borderRightWidth: 0.5,
    borderColor: themes.colors.grey[200],
  },
  timeline__itemInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  timeline__itemRight: {
    paddingBottom: 20,
    width: '50%',
  },
  timeline__line: {
    borderStyle: 'dashed',
    borderRadius: 0.00001,
    borderWidth: 0.5,
    borderColor: themes.colors.grey[200],
    height: '100%',
    zIndex: 1,
    elevation: 1,
  },
});

export default styles;
