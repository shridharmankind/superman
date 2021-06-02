import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  eDetailingHead: {
    flexDirection: 'row',
    padding: 30,
    backgroundColor: themes.colors.grayishBlue,
    borderRadius: 16,
  },
  eDetailingHead__Col: {
    flexDirection: 'column',
  },
  eDetailing__Start: {
    position: 'absolute',
    right: 20,
    top: 26,
  },
  eDetailing__Start__Content: {
    width: 165,
    marginHorizontal: 8,
    height: 42,
  },
  eDetailing__Start__Text: {
    fontSize: 12,
  },
  eDetailing__PriorityProducts: {
    marginBottom: 0,
  },
  eDetailing__PriorityProducts__List: {
    paddingTop: 13,
    height: 246,
  },
});

export default styles;
