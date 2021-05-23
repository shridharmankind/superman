import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  Monthlycontainer: {
    justifyContent: 'flex-end',
  },
  StandardContainer: {
    justifyContent: 'flex-start',
  },
  legendsContainer: {
    flexDirection: 'row',
    margin: 3,
    alignItems: 'center',
  },

  contentBasicStyle: {
    marginHorizontal: 6,
  },

  verticalBar: {
    width: 6,
    height: 15,
  },
  scheduleVisits: {
    backgroundColor: theme.colors.accent,
  },
  events: {
    backgroundColor: theme.colors.pink[100],
  },
  holiday: {
    backgroundColor: theme.colors.blueShades[100],
  },
  today: {
    width: 8,
    height: 8,
    borderRadius: 4,

    backgroundColor: theme.colors.primary,
  },

  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 13,
  },
  bar: {
    width: 1,
    height: 15,
    backgroundColor: theme.colors.grey[200],
    transform: [{rotate: '50deg'}],
    marginRight: 2,
  },
});

export default styles;
