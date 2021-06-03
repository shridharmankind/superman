import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  eDetailingHead: {
    flexDirection: 'row',
    padding: theme.spacing(30),
    backgroundColor: theme.colors.grayishBlue,
    borderRadius: theme.spacing(16),
  },
  eDetailingHead__Col: {
    flexDirection: 'column',
  },
  eDetailingHead__Back: {
    paddingTop: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  eDetailing__Start: {
    position: 'absolute',
    right: theme.spacing(20),
    top: theme.spacing(26),
  },
  eDetailing__Start__Content: {
    width: theme.spacing(165),
    marginHorizontal: theme.spacing(8),
    height: theme.spacing(42),
  },
  eDetailing__Start__Text: {
    fontSize: theme.spacing(12),
  },
  eDetailing__PriorityProducts: {
    marginBottom: 0,
  },
  eDetailing__PriorityProducts__List: {
    paddingTop: theme.spacing(13),
    height: theme.spacing(246),
  },
});

export default styles;
