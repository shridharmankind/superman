import React from 'react';
import {View, FlatList} from 'react-native';
import {Label} from 'components/elements';
import {Button} from 'components/elements';
import {Strings} from 'common';
import {getLocalTimeZone} from 'utils/dateTimeHelper';
import styles from './styles';

const ShowConflictRecords = ({records}) => {
  return (
    <View style={styles.listBody}>
      <View style={styles.listHeader}>
        <Label
          style={styles.division}
          title={Strings.backgroundTask.lastModifiedTime}
        />
        <Label
          style={[styles.division, styles.colwidth]}
          title={Strings.backgroundTask.conflictMessage}
        />
        <Label
          style={[styles.division, styles.colwidth]}
          title={Strings.backgroundTask.errorMessage}
        />
      </View>
      <FlatList
        nestedScrollEnabled
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollPad}
        data={records}
        onEndReachedThreshold={0.5}
        renderItem={({item, index}) => {
          console.log(item);
          return (
            <View style={styles.doctorDataRow}>
              <Label
                style={styles.dataStyle}
                title={`${getLocalTimeZone(
                  item.syncParameters?.lastModifiedOn,
                )}`}
              />
              <Label
                style={styles.dataStyle}
                title={`${item.syncParameters?.syncErrorDetails?.conflictType}`}
              />
              <Label
                style={styles.dataStyle}
                title={`${item.syncParameters?.syncErrorDetails?.errorMessage}`}
              />
              <View style={styles.btnsContainer}>
                <Button
                  title={Strings.backgroundTask.useDevice}
                  mode="contained"
                  contentStyle={styles.eDetailbuttonLayout}
                  labelStyle={styles.btnContent}
                />
              </View>
              <View style={styles.btnsContainer}>
                <Button
                  title={Strings.backgroundTask.useServer}
                  mode="contained"
                  contentStyle={styles.eDetailbuttonLayout}
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
