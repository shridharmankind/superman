import React from 'react';
import {View, FlatList} from 'react-native';
import {Label, LabelVariant} from 'components/elements';
import {translate} from 'locale';
import {ErrorIcon, Complaint} from 'assets';
import styles from './styles';

const ShowSuccessfullSync = ({records}) => {
  return (
    <View style={styles.listBody}>
      <FlatList
        nestedScrollEnabled
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollPad}
        data={records}
        onEndReachedThreshold={0.5}
        renderItem={({item, index}) => {
          let objectDetail =
            Object.values(item)[0].length <= 0 ? Object.values(item)[0] : '';
          if (objectDetail) {
            return (
              <View style={styles.conflictRow}>
                <Complaint style={styles.leftPadding} width={20} height={20} />
                <Label title={`${Object.keys(item)[0]}`} />
              </View>
            );
          } else {
            return (
              <View style={styles.conflictRow}>
                <ErrorIcon style={styles.leftPadding} width={20} height={20} />
                <Label title={`${Object.keys(item)[0]}`} />
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default ShowSuccessfullSync;
