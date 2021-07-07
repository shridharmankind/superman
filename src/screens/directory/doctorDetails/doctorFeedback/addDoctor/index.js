import React, {useState, useEffect} from 'react';
import {View, TextInput, FlatList, Image, TouchableOpacity} from 'react-native';
import {Modal, Button, LabelVariant, Label} from 'components/elements';
import {DoctorTag, DivisionType} from 'components/widgets';
import styles from './styles';
import {SearchIcon} from 'assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from 'themes';
import {Constants} from 'common';
import {dcrSelector} from 'screens/directory/doctorDetails/doctorFeedback/redux';
import {useSelector} from 'react-redux';
import {translate} from 'locale';

const AddDoctor = ({showModal, closeModal, updateSelectedData}) => {
  const [partyJson, setPartyJson] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [selectedList, setSelectedList] = useState([]);

  const doctorList = useSelector(dcrSelector.getDoctors());
  const selectedDocList = useSelector(dcrSelector.getSelectedDoc());
  useEffect(() => {
    if (doctorList?.length > 0) {
      setPartyJson([...doctorList]);
    }
  }, [doctorList]);
  useEffect(() => {
    if (selectedDocList?.length > 0) {
      setSelectedList([...selectedDocList]);
    }
  }, [selectedDocList]);

  const addSelectedHandler = () => {
    updateSelectedData(partyJson, selectedList);
  };

  const onChecked = (item, checked) => {
    if (checked) {
      const partyIndex = partyJson.findIndex(
        dataItem => dataItem.id === item.id,
      );
      const itemObject = {...item, isChecked: true};
      partyJson.splice(partyIndex, 1);
      setPartyJson(partyJson);
      setSelectedList([...selectedList, itemObject]);
    } else {
      const selectedIndex = selectedList.findIndex(
        dataItem => dataItem.id === item.id,
      );
      selectedList.splice(selectedIndex, 1);
      const itemObject = {...item, isChecked: false};
      setPartyJson([...partyJson, itemObject]);
      setSelectedList(selectedList);
    }
  };

  const updateSearch = text => {
    let partyResult = [...doctorList];
    partyResult = partyResult?.filter(dataItem => !dataItem.isChecked);
    if (text?.length) {
      const seractText = text?.trim().toLowerCase();
      const result = partyResult?.filter(dataValue => {
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
          {!!item?.isKyc && (
            <DoctorTag
              division={DivisionType.KYC}
              title={translate('categories.kyc')}
            />
          )}
          {!!item?.isCampaign && (
            <DoctorTag
              division={DivisionType.CAMPAIGN}
              title={translate('categories.campaign')}
            />
          )}
          {!!item?.category && (
            <DoctorTag
              division={item?.category}
              title={item?.category?.toUpperCase()}
            />
          )}
        </View>
        <View style={styles.mainCheckBox}>
          <TouchableOpacity
            onPress={() => {
              onChecked(item, !item.isChecked);
            }}>
            {item?.isChecked ? (
              <Icon
                name="check-circle"
                size={20}
                color={theme.colors.checkCircleBlue}
              />
            ) : null}
            {!item.isChecked ? <View style={[styles.uncheck]} /> : null}
          </TouchableOpacity>
        </View>
        <View style={styles.avtarClass}>
          <Image
            style={[styles.image]}
            source={
              Constants.GENDER.MALE === item.gender?.toUpperCase()
                ? require('assets/images/male.png')
                : require('assets/images/female.png')
            }
          />
        </View>
        <View style={styles.avtarName}>
          <Label
            variant={LabelVariant.body}
            style={styles.name}
            title={translate('AddDoctor.DR') + item.name}
          />
        </View>
        <View style={styles.avtarName}>
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
          testID="adddoctor-modal-title"
          variant={LabelVariant.h3}
          title={'+' + translate('AddDoctor.label')}
        />
        <View style={[styles.modalTitleDone]}>
          <Button
            testID="adddoctor-done"
            title={
              translate('AddDoctor.addSelected') +
              (selectedList.length > 0 ? `(${selectedList.length})` : '')
            }
            onPress={addSelectedHandler}
            mode="outlined"
            contentStyle={styles.eDetailingStartContent}
            labelStyle={styles.eDetailingStartText}
          />
          <Button
            testID="adddoctor-close"
            title={translate('AddDoctor.close')}
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
            placeholder={translate('AddDoctor.searchText')}
            style={styles.searchBar}
            value={searchText}
            onChangeText={text => updateSearch(text)}
          />
          <SearchIcon style={styles.searchIcon} height={18} width={18} />
        </View>
        {!!selectedList?.length && (
          <>
            <View style={styles.selectedMainList}>
              <FlatList
                data={selectedList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={5}
              />
            </View>
            <View style={styles.horizontal} />
          </>
        )}
        <View
          style={
            selectedList?.length > 0 ? styles.maxClass : styles.mainMaxClass
          }>
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
