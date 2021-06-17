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
    paddingBottom: themes.spacing(20),
  },
  timelineItemInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  timelineItemRight: {
    paddingBottom: themes.spacing(20),
    width: '50%',
  },
  timelineLineContainer: {
    width: 1,
    overflow: 'hidden',
    zIndex: -1,
    height: '100%',
  },
  timelineLine: {
    width: 3,
    height: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: themes.colors.grey[200],
  },
});

export default styles;
