import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing(12.7),
  },
  monthlycontainer: {
    justifyContent: 'flex-end',
  },
  standardContainer: {
    justifyContent: 'flex-start',
  },
  legendsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing(2),
    alignItems: 'center',
  },
  contentBasicStyle: {
    marginHorizontal: theme.spacing(4),
  },
  verticalBar: {
    width: 6,
    height: 15,
  },
  scheduleVisits: {
    backgroundColor: theme.colors.orange[300],
  },
  kyc: {
    backgroundColor: theme.colors.orange[100],
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
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: theme.spacing(4),
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
    marginRight: theme.spacing(2),
  },
  exStation: {
    marginRight: theme.spacing(2),
  },
});

export default styles;
