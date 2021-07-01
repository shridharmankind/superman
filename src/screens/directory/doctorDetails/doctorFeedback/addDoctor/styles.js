import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalPosition: {
    width: '85%',
    left: '4%',
    height: 700,
  },
  modalTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing(20),
  },
  modalTitleDone: {
    position: 'absolute',
    right: -80,
  },
  eDetailingStartContent: {
    width: 165,
    marginHorizontal: theme.spacing(8),
    height: 42,
  },
  eDetailingStartText: {
    fontSize: 12,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 16,
  },
  searchBar: {
    width: '60%',
    height: 50,
    borderRadius: 6.7,
    backgroundColor: theme.colors.grey[1700],
    paddingLeft: theme.spacing(40),
  },
  modelContent: {
    marginTop: theme.spacing(20),
  },
  container: {
    flex: 1,
  },
  location: {},
  item: {
    height: 120,
    width: 180,
    justifyContent: 'center',
    marginVertical: 8,
    marginLeft: 6,
    marginRight: 20,
    padding: 20,
    borderWidth: 0,
    borderRadius: 20,
    elevation: 10,
    backgroundColor: theme.colors.white,
  },
  divisionContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mainCheckBox: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  name: {
    color: theme.colors.grey[200],
  },
});

export default styles;
