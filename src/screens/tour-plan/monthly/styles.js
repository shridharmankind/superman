import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  selectedTour: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: 250,
    minWidth: 250,
  },
  iconContainer: {
    marginLeft: 80,
    marginRight: 20,
  },
  selectedTourText: {
    color: theme.colors.black,
  },
  modalText: {
    paddingVertical: 10,
    color: theme.colors.primary,
  },
  modalTitleText: {
    paddingVertical: 10,
    color: theme.colors.black,
  },
  contentView: {
    justifyContent: 'flex-start',
  },
});

export default styles;
