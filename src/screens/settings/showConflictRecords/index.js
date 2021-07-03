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
          style={[styles.division]}
          title={Strings.backgroundTask.conflictScreen.tableName}
        />
        <Label
          style={[styles.division, styles.colwidth]}
          title={Strings.backgroundTask.conflictScreen.lastModifiedTime}
        />
        <Label
          style={[styles.division, styles.colwidth]}
          title={Strings.backgroundTask.conflictScreen.conflictType}
        />
        <Label
          style={[styles.division, styles.colwidth]}
          title={Strings.backgroundTask.conflictScreen.conflictDesc}
        />
      </View>
      <FlatList
        nestedScrollEnabled
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollPad}
        data={records}
        onEndReachedThreshold={0.5}
        renderItem={({item, index}) => {
          console.log('item', item);
          let objectDetail =
            Object.values(item)[0] !== undefined
              ? Object.values(item)[0][0]
              : [];
          console.log(objectDetail);
          return (
            <View style={styles.conflictRow}>
              <Label
                style={styles.dataStyle}
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
                style={styles.dataStyle}
                title={`${objectDetail.syncParameters?.syncErrorDetails?.errorMessage}`}
              />
              <View style={styles.btnsContainer}>
                <Button
                  title={Strings.backgroundTask.useDevice}
                  mode="contained"
                  contentStyle={styles.buttonLayout}
                  labelStyle={styles.btnContent}
                />
              </View>
              <View style={styles.btnsContainer}>
                <Button
                  title={Strings.backgroundTask.useServer}
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
