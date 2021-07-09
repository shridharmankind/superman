import React from 'react';
import {View, FlatList} from 'react-native';
import {Label, LabelVariant} from 'components/elements';
import {Button} from 'components/elements';
import {Strings} from 'common';
import {translate} from 'locale';
import {getLocalTimeZone} from 'utils/dateTimeHelper';
import styles from './styles';

const ShowConflictRecords = ({records}) => {
  return (
    <View style={styles.listBody}>
      <View style={styles.subHeading}>
        <Label
          title={translate('backgroundTask.syncConflict')}
          variant={LabelVariant.h2}
        />
      </View>
      <View style={styles.listHeader}>
        <Label
          style={[styles.division, styles.firstCol]}
          title={translate('backgroundTask.conflictScreen.tableName')}
        />
        <Label
          style={[styles.division, styles.colwidth]}
          title={`${translate(
            'backgroundTask.conflictScreen.lastModifiedTime',
          )} \n (${translate('backgroundTask.conflictScreen.deviceDb')})`}
        />
        <Label
          style={[styles.division, styles.colwidth]}
          title={translate('backgroundTask.conflictScreen.conflictType')}
        />
        <Label
          style={[styles.division, styles.confDesc]}
          title={translate('backgroundTask.conflictScreen.conflictDesc')}
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
            Object.values(item)[0] !== undefined
              ? Object.values(item)[0][0]
              : [];
          return (
            <View style={styles.conflictRow}>
              <Label
                style={[styles.dataStyle, styles.firstCol]}
                title={`${Object.keys(item)[0]}`}
              />
              <Label
                style={styles.dataStyle}
                title={`${getLocalTimeZone(
                  objectDetail.syncParameters?.lastModifiedOn,
                )}`}
              />
              <Label
                style={styles.dataStyle}
                title={`${objectDetail.syncParameters?.syncErrorDetails?.conflictType}`}
              />
              <Label
                style={[styles.dataStyle, styles.confDesc]}
                title={`${objectDetail.syncParameters?.syncErrorDetails?.errorMessage}`}
              />
              <View style={styles.btnsContainer}>
                <Button
                  title={translate('backgroundTask.useDevice')}
                  mode="contained"
                  contentStyle={styles.buttonLayout}
                  labelStyle={styles.btnContent}
                />
                <Button
                  title={translate('backgroundTask.useServer')}
                  mode="contained"
                  contentStyle={styles.buttonLayout}
                  labelStyle={styles.btnContent}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ShowConflictRecords;
