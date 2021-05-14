import {StyleSheet} from 'react-native';
import theme from '../../themes';

const styles = StyleSheet.create({
    container: {              
        backgroundColor: theme.colors.white,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal:20,
        paddingVertical: 10,
        borderColor: theme.colors.borderColor,
        borderRadius:5,
        borderWidth:1
      },
      image:{
          width: 72,
          height: 72,
          borderRadius: 72/2,
          marginRight: 10
      },
      detailsContainer: {
          flex:1,
          flexDirection: 'column',          
          alignItems: 'flex-start',
          alignSelf: 'center'
      },
      divisionContainer: {
          borderTopLeftRadius: 5,
          borderBottomRightRadius: 5,
          backgroundColor: theme.colors.orange,
          paddingHorizontal: 5, 
          position: 'absolute',
          top:-1     
      },
      divisionText: {
          color: theme.colors.white,
          fontSize: 12
      },
      checkContainer: {
          position: 'absolute',
          right: 10,
          top: 10
      },
      location: {
          borderLeftColor: '#1C1939',
          borderLeftWidth: 1,
          paddingHorizontal: 10
      }
});

export default styles;