import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  time: {
    textAlign: 'center',
    backgroundColor: 'gray',
    fontSize: 12,
    color: 'white',
    padding: 5,
    borderRadius: 13,
    overflow: 'hidden',
  },
  description: {
    color: 'gray',
  },
});

export default styles;
