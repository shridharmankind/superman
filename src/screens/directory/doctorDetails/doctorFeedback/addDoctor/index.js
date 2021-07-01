import React, {useState} from 'react';
import {View, TextInput, FlatList, Image} from 'react-native';
import {Modal, Button, LabelVariant, Label} from 'components/elements';
import {DoctorTag, DivisionType} from 'components/widgets';
import styles from './styles';
import {SearchIcon} from 'assets';
import {partiesMock} from '../../../../../data/mock/api/parties.js';
import {Checkbox} from 'react-native-paper';
import theme from 'themes';
import {Constants} from 'common';

const AddDoctor = ({showModal, closeModal}) => {
  const [partyJson, setPartyJson] = useState([
    ...partiesMock.getParties.response,
  ]);
  const [searchText, setSearchText] = useState('');

  const [selectedList, setSelectedList] = useState([]);

  const onChecked = (item, checked) => {
    if (checked) {
      const partyIndex = partyJson.findIndex(
        dataItem => dataItem.id === item.id,
      );
      partyJson.splice(partyIndex, 1);
      item.isChecked = true;
      setPartyJson(partyJson);
      setSelectedList([...selectedList, item]);
    } else {
      const selectedIndex = selectedList.findIndex(
        dataItem => dataItem.id === item.id,
      );
      selectedList.splice(selectedIndex, 1);
      item.isChecked = false;
      setPartyJson([...partyJson, item]);
      setSelectedList(selectedList);
    }
  };

  const updateSearch = text => {
    let partyResult = [...partiesMock.getParties.response];
    partyResult = partyResult.filter(dataItem => !dataItem.isChecked);
    if (text?.length) {
      const seractText = text.trim().toLowerCase();
      const result = partyResult.filter(dataValue => {
        const name = dataValue.name?.toLowerCase();
        return name.includes(seractText);
      });
      setSearchText(seractText);
      setPartyJson(result);
    } else {
      setSearchText('');
      setPartyJson([...partyResult]);
    }
  };

  const Item = item => {
    return (
      <View style={styles.item}>
        <View style={styles.divisionContainer}>
          {item?.isKyc && (
            <DoctorTag
              division={DivisionType.KYC}
              title={`${DivisionType.KYC}`}
            />
          )}
          {item?.isCampaign && (
            <DoctorTag
              division={DivisionType.CAMPAIGN}
              title={`${DivisionType.CAMPAIGN}`}
            />
          )}
          {item?.category && (
            <DoctorTag
              division={item?.category}
              title={item?.category?.toUpperCase()}
            />
          )}
        </View>
        <View style={styles.mainCheckBox}>
          <Checkbox
            status={item.isChecked ? 'checked' : 'unchecked'}
            onPress={() => {
              onChecked(item, !item.isChecked);
            }}
            color={theme.colors.blue[100]}
          />
        </View>
        <View style={{marginTop: 0, alignItems: 'center'}}>
          <Image
            style={[styles.image]}
            source={
              Constants.GENDER.MALE === item.gender?.toUpperCase()
                ? require('assets/images/male.png')
                : require('assets/images/female.png')
            }
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 5}}>
          <Label
            variant={LabelVariant.body}
            style={styles.name}
            title={'Dr. ' + item.name}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 5}}>
          <Label
            variant={LabelVariant.label}
            title={
              (item?.specialities || []).map(spec => spec.name).join(', ') +
              (item?.location ? ' | ' + item?.location : '')
            }
          />
        </View>
      </View>
    );
  };
  const renderItem = ({item}) => Item(item);
  const getModalTitle = () => {
    return (
      <View style={styles.modalTitle}>
        <Label
          testID="eDetail-modal-title"
          variant={LabelVariant.h3}
          title="+ Add Doctor"
        />
        <View style={[styles.modalTitleDone]}>
          <Button
            testID="eDetail-done"
            title={
              'Add Selected  ' +
              (selectedList.length > 0 ? `(${selectedList.length})` : '')
            }
            onPress={closeModal}
            mode="outlined"
            contentStyle={styles.eDetailingStartContent}
            labelStyle={styles.eDetailingStartText}
          />
        </View>
      </View>
    );
  };

  const getModalContent = () => {
    return (
      <View style={styles.modelContent}>
        <View>
          <TextInput
            placeholder={'Search Doctors here'}
            style={styles.searchBar}
            value={searchText}
            onChangeText={text => updateSearch(text)}
          />
          <SearchIcon style={styles.searchIcon} height={18} width={18} />
        </View>
        {!!selectedList.length && (
          <>
            <View style={{maxHeight: 250, marginTop: 20}}>
              <FlatList
                data={selectedList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={5}
              />
            </View>
            <View
              style={{
                borderBottomColor: theme.colors.grey[1000],
                borderBottomWidth: 1,
              }}
            />
          </>
        )}
        <View style={{maxHeight: 450, marginTop: 20}}>
          <FlatList
            data={partyJson}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={5}
          />
        </View>
      </View>
    );
  };
  return (
    <View>
      <Modal
        animationType="fade"
        open={showModal}
        onClose={closeModal}
        modalTitle={getModalTitle()}
        modalContent={getModalContent()}
        presentationStyle="fullScreen"
        customModalPosition={styles.modalPosition}
        customModalCenteredView={styles.centerModal}
      />
    </View>
  );
};

export default AddDoctor;
