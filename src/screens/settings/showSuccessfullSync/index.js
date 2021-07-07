import React from 'react';
import {View, FlatList} from 'react-native';
import {Label, LabelVariant} from 'components/elements';
import {translate} from 'locale';
import {ErrorIcon, Complaint} from 'assets';
import styles from './styles';

const ShowSuccessfullSync = ({records}) => {
  return (
    <View style={styles.listBody}>
      <View style={styles.listHeader}>
        <Label
          style={[styles.division]}
          title={translate('backgroundTask.conflictScreen.syncStatus')}
        />
        <Label
          style={[styles.division]}
          title={translate('backgroundTask.conflictScreen.name')}
        />
      </View>
      <FlatList
        nestedScrollEnabled
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollPad}
        data={records}
        onEndReachedThreshold={0.5}
        renderItem={({item, index}) => {
          let objectDetail =
            Object.values(item)[0].length <= 0 ? Object.values(item)[0] : '';
          return (
            <View style={styles.conflictRow}>
              {objectDetail ? (
                <Complaint style={styles.leftPadding} width={20} height={20} />
              ) : (
                <ErrorIcon style={styles.leftPadding} width={20} height={20} />
              )}
              <Label
                style={[styles.colwidth]}
                title={`${Object.keys(item)[0]}`}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default ShowSuccessfullSync;
