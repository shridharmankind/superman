/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import theme from 'themes';
const styles = StyleSheet.create({
  calendar: {
    display: 'block',
    position: 'relative',
    width: '100%',
    borderWidth: 1,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: theme.colors.grey[100],
    borderTopColor: 'transparent',
  },

  col:{
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: '100%',
  },
  colCenter :{
    justifyContent: 'center',
    textAlign: 'center',
  },
  days :{
    fontWeight: '400',
    fontSize: '70%',
    paddingVertical:theme.spacing(5),

  },
  row: {
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    borderBottomWidth:1,
    borderBottomColor: theme.colors.grey[100],
  },
  rowMiddle :{
    alignItems: 'center',
  },
  cell :{
    position: 'relative',
    height: '5.6em',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  number: {
    position: 'absolute',
    fontSize: '82.5%',
    lineHeight: 1,
    top: '0.75em',
    right:' 0.75em',
    fontWeight: '700',
  },
  cellLastchild: {
    borderRight: 'none',
    borderRightColor:'transparent',
  },

  rowLastChild:{
    borderBottom: 'none',
  },
  currentDailyContainer: {
    borderWidth: 1,
    borderTopColor: theme.colors.primary,
    borderLeftColor: theme.colors.primary,
    borderRightColor: theme.colors.primary,
    borderBottomColor: theme.colors.primary,
    alignSelf: 'stretch',
    flex: 1,
  },

});

export default styles;
