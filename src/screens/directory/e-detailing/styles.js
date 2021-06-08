import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  eDetailingHead: {
    flexDirection: 'row',
    padding: theme.spacing(30),
    backgroundColor: theme.colors.grayishBlue,
    borderRadius: 16,
  },
  eDetailingHeadCol: {
    flexDirection: 'column',
  },
  eDetailingHeadBack: {
    paddingTop: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  eDetailingStart: {
    position: 'absolute',
    right: theme.spacing(20),
    top: theme.spacing(26),
  },
  eDetailingStartContent: {
    width: 165,
    marginHorizontal: theme.spacing(8),
    height: 42,
  },
  eDetailingStartText: {
    fontSize: 12,
  },
  eDetailingPriorityProducts: {
    marginBottom: 0,
  },
  eDetailingPriorityProductsList: {
    paddingTop: theme.spacing(13),
    height: 246,
  },
});

export default styles;
