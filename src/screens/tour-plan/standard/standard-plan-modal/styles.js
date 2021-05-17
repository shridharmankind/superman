import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor: theme.colors.white, 
        padding: 40,
        marginHorizontal:100,
        marginVertical:40
    },
    container:{
        flexDirection:'column'        
    },
    modalHeader: {        
        flexDirection: 'row',
        justifyContent:'space-between',
        alignContent:'center',
        alignItems:'center',
        marginBottom:40
    },
    headerButtonGroup:{
        flexDirection: 'row',
        justifyContent: 'center',
    },
    doneBtn: {
        paddingVertical:10,
        paddingHorizontal: 60,
    },
    closeBtn:{        
        paddingVertical:10,
        paddingHorizontal: 60,
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
        marginVertical:20
    },
    areaFilterContainer:{
        flexDirection:'row',
        marginVertical:20
    },
    categoryFilterContainer: {
        flexDirection:'row',
        borderWidth: 1,
        borderColor: '#322B7C',
        borderRadius:20                
    },
    doctorDetailsHeader: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom: 20,
        borderBottomColor: theme.colors.borderColor,
        borderBottomWidth: 1
    },
    doctorDetails:{
        flexDirection: 'row',
        alignContent: 'flex-start',
        flexWrap: 'wrap'
    }
})

export default styles;