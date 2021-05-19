import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingVertical: 40,
    borderColor: theme.colors.borderColor,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    flex: 1,
    minWidth: '46%',
    marginRight: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 72 / 2,
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
    backgroundColor: theme.colors.orange,
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
    borderLeftColor: '#1C1939',
    borderLeftWidth: 1,
    paddingHorizontal: 10,
  },
  frequecyContainer: {
    flexDirection: 'row',
  },
});

export default styles;
