import * as React from 'react';
import { View } from 'react-native';
import {StyleSheet} from 'react-native';
import theme from 'themes';
import {CustomDownload} from 'components/elements';

const Downloading = ({navigation}) => {

    return (
        <View style={styles.container}>
            <CustomDownload navigate={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    }
});

export default Downloading;