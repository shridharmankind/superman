import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 21,
    paddingVertical: 26,
    borderColor: theme.colors.borderColor,
    borderRadius: 7,
    position: 'relative',
    borderWidth: 1,
    marginTop: 14,
    flex: 1,
    minWidth: '48%',
    maxWidth: '48%',
    marginRight: 20,
    zIndex: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 32,
  },
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  divisionContainer: {
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: theme.colors.orange[100],
    padding: 10,
    position: 'absolute',
    top: -40,
    left: -32,
  },
  divisionText: {
    color: theme.colors.white,
  },
  checkContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  location: {
    borderLeftColor: theme.colors.grey[200],
    borderLeftWidth: 1,
    paddingHorizontal: 10,
  },
  frequecyContainer: {
    flexDirection: 'row',
  },
});

export default styles;
