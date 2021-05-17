import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor: theme.colors.white, 
        padding: 20,
        margin:10
    },
    container:{
        flexDirection:'column'        
    },
    modalHeader: {        
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'stretch'
    },
    headerButtonGroup:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'stretch'
    },
    doneBtn: {
       
    },
    closeBtn:{        
        marginRight:10
    },
    content: {
        flexDirection:'row'
    },
    leftContent: {
        flex: .8,
        flexDirection:'column'
    }, 
    rightContnet:{
        flex: 1
    },
    selectAreaContainer:{
        flexDirection: 'column'
    },
    doctorDetailsContainer:{

    },
    areaFilterContainer:{
        flexDirection:'row',
        marginVertical:20
    }
})

export default styles;