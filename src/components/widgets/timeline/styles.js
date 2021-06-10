import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  timeline: {
    flex: 1,
    flexDirection: 'row',
  },
  timelineList: {
    flex: 1,
  },
  timelineItemContainer: {
    display: 'flex',
  },
  timelineItem: {
    alignItems: 'flex-start',
    width: '50%',
    paddingBottom: 20,
  },
  timelineItemInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  timelineItemRight: {
    paddingBottom: 20,
    width: '50%',
  },
  borderContainer: {
    width: 1,
    overflow: 'hidden',
    zIndex: -1,
    height: '100%',
  },
  border: {
    width: 3,
    height: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: themes.colors.grey[200],
  },
});

export default styles;
