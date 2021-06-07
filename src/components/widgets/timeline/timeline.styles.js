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
  timeline__date: {
    textAlign: 'center',
    position: 'absolute',
    right: '47.5%',
    borderColor: themes.colors.blue[200],
    padding: 10,
    borderWidth: 1,
    backgroundColor: themes.colors.white,
    borderRadius: 60,
  },
  timeline__itemContainer: {
    display: 'flex',
  },
  timeline__item: {
    alignItems: 'flex-start',
    width: '50%',
    borderStyle: 'dashed',
    borderRadius: 1,
    borderRightWidth: 1,
    borderColor: themes.colors.grey[200],
    paddingBottom: 50,
  },
  timeline__itemInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  timeline__itemRight: {
    paddingBottom: 40,
  },
});

export default styles;
