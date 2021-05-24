import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 26,
    paddingVertical: 28,
    borderColor: theme.colors.borderColor,
    borderRadius: 10,
    position: 'relative',
    borderWidth: 1,
    marginTop: 20,
    flex: 1,
    minWidth: '45%',
    marginRight: 20,
    zIndex: 1,
    // width: '80%',
  },
  detailsContainer: {
    flexDirection: 'row',
    width: '80%',
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
    width: '60%',
  },
  divisionContainer: {
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: theme.colors.orange,
    padding: 10,
    position: 'absolute',
    top: -40,
    left: -32,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
  visitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  seperator: {
    paddingRight: 10,
  },
});

export default styles;
