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
    borderStyle: 'dashed',
    borderRadius: 0.00001,
    borderRightWidth: 0.5,
    borderColor: themes.colors.grey[200],
  },
  timelineItemInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  timelineItemRight: {
    paddingBottom: 20,
    width: '50%',
  },
  timelineLine: {
    borderStyle: 'dashed',
    borderRadius: 0.00001,
    borderWidth: 0.5,
    borderColor: themes.colors.grey[200],
    height: '100%',
  },
});

export default styles;
