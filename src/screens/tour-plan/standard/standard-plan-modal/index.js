import React, {useState, useEffect} from 'react';
import {Dimensions, ScrollView, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Area,
  Label,
  Button,
  Dropdown,
  DoctorDetailsWrapper,
} from 'components/elements';
import themes from 'themes';
import {Strings, Constants} from 'common';
import styles from './styles';
import {NetworkService} from 'services';

const data = [
  {
    name: 'Noida-Sec-1 (1)',
    value: 'Noida-Sec-1 (1)',
  },
  {
    name: 'Karol Bagh',
    value: 'Karol Bagh',
  },
  {
    name: 'Gurgaon',
    value: 'Gurgaon',
  },
  {
    name: 'Greater Noida',
    value: 'Greater Noida',
  },
];

/**
 * Standard Plan Modal component for setting daily standard plan.
 * This component use DoctorDetails, AreaChip, Label and Button component
 * @param {Function} handleSliderIndex to handle left/right movement of week
 */

const StandardPlanModal = ({handleSliderIndex, navigation}) => {
  const [patchValue, setPatchValue] = useState();
  const [areaSelected, setAreaSelected] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [patches, setPatches] = useState();
  const [patchSelected, setPatchSelected] = useState();
  const [partiesList, setPartiesList] = useState([]);
  const [parties, setParties] = useState([]);
  const [partiesType, setPartiesType] = useState([]);
  const [selectedDoctorType, setSelectedDoctorType] = useState(Strings.all);

  const handleIndex = direction => {
    handleSliderIndex(direction);
  };

  useEffect(() => {
    const getParty = async () => {
      const result = await NetworkService.get(`/party/${1}`);
      if (result.status === Constants.HTTP_OK) {
        setPartiesList(result.data);
        filterPartyByType(result.data);
      }
    };
    getParty();
  }, []);

  useEffect(() => {
    const getPatches = async () => {
      const result = await NetworkService.get(`/getPatches/${1}`);
      if (result.status === Constants.HTTP_OK) {
        setPatches(result.data);
      }
    };
    getPatches();
  }, []);

  const filterPartyByType = partyList => {
    const doctorType = [Strings.all];
    partyList.map(party => {
      if (doctorType.indexOf(party.partyType) === -1) {
        doctorType.push(party.partyType);
      }
    });
    setPartiesType(doctorType);
  };

  useEffect(() => {
    const getAreas = async () => {
      const result = await NetworkService.get(`/area/${1}`);
      if (result.status === Constants.HTTP_OK) {
        setAreaList(result.data);
      }
    };
    getAreas();
  }, []);

  useEffect(() => {
    const patch = patches && patches.filter(val => patchValue === val.name);
    setPatchSelected(patch && patch.length > 0 && patch[0].name);
  }, [patches, patchValue]);

  const handleAreaSelected = val => {
    const index = areaSelected.filter(area => area.id === val);
    if (index.length > 0) {
      setAreaSelected(areaSelected.filter(item => item.id !== val));
    } else {
      setAreaSelected([
        ...areaSelected,
        areaList.find(area => area.id === val),
      ]);
    }
    setSelectedDoctorType(Strings.all);
  };

  useEffect(() => {
    if (!patchValue) {
      const patchString =
        areaSelected.length > 0 &&
        areaSelected.map(area => area.name).join('+');
      setPatchSelected(patchString);
    }
  }, [areaSelected, patchValue]);

  const getDoctorsByArea = area => {
    const parties = partiesList.filter(party => {
      const isArea = party.areas.find(obj => {
        return obj.id === area;
      });
      if (isArea) {
        return party;
      }
    });
    return parties;
  };

  const handleDonePress = async () => {
    await NetworkService.post('/savePatch', {
      id: 0,
      name: 'Test_Internal_123',
      staffPositionId: 1,
      createdOn: '2021-05-21T05:04:39.746Z',
      createdBy: 1,
      modifiedOn: '2021-05-21T05:04:39.746Z',
      modifiedBy: 0,
      patchPartyMaps: [
        {
          id: 0,
          partyId: 1,
          patchId: 1,
        },
      ],
    }).then(res => {
      console.log(res.data);
      navigation.navigate('TourPlan');
    });
  };

  const handleDeletePatch = async () => {
    await NetworkService.get('/deletePatch/1').then(res =>
      console.log(res.data),
    );
  };

  const handlePartyByType = val => {
    if (val !== Strings.all) {
      setParties(parties.filter(party => party.partyType === val));
      setSelectedDoctorType(val);
    } else {
      setParties(parties);
      setSelectedDoctorType(Strings.all);
    }
  };

  return (
    <ScrollView style={[styles.containerStyle, {height}]}>
      <View style={styles.modalHeader}>
        <View>
          <Label title={Strings.selectDoctorAndChemist} />
          <View style={styles.week}>
            <TouchableOpacity onPress={() => handleIndex('left')}>
              <Icon iconStyle={styles.weekArrow} name="angle-left" size={30} />
            </TouchableOpacity>
            <Label
              style={styles.weekLabel}
              title={'Week 1 - Monday'}
              size={24}
              type={'bold'}
            />
            <TouchableOpacity onPress={() => handleIndex('right')}>
              <Icon iconStyle={styles.weekArrow} name="angle-right" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.patchInputCotainer,
            {opacity: patchValue || patchSelected ? 1 : 0.2},
          ]}>
          <Label
            title={
              patchSelected ||
              (patchValue && patchValue.name) ||
              Strings.patchName
            }
          />
          <View style={styles.patchIconContainer}>
            <TouchableOpacity style={[styles.patchIcon]}>
              <Icon name="edit" size={15} color={themes.colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.patchIcon}
              onPress={() => handleDeletePatch()}>
              <Icon name="trash" size={15} color={themes.colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerButtonGroup}>
          {/* <Button
            mode="contained"
            title={Strings.saveDraft}
            uppercase={true}
            contentStyle={styles.doneBtn}
          /> */}
          <Button
            mode="contained"
            title={Strings.done}
            uppercase={true}
            contentStyle={styles.doneBtn}
            onPress={() => handleDonePress()}
          />
          <Button
            mode="outlined"
            title={Strings.close}
            uppercase={true}
            contentStyle={styles.closeBtn}
            onPress={() => navigation.navigate('TourPlan')}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <View style={styles.selectAreaContainer}>
            <View>
              <Label title={Strings.selectArea} />
            </View>
            <View style={styles.areaFilterContainer}>
              <Dropdown
                valueSelected={val => setPatchValue(val)}
                data={getPatchesDropdownData(patches)}
                defaultLabel={Strings.selectPatch}
              />
              <View style={styles.areaFilter}>
                {areaList.map(area => {
                  return (
                    <Area
                      title={area.name}
                      value={area.id}
                      bgColor={'#524F670D'}
                      color={'#524F67'}
                      selectedColor={'#322B7C1A'}
                      selected={isAreaSelected(area.id, areaSelected)}
                      selectedTextColor={themes.colors.primary}
                      style={{marginRight: 20}}
                      onPress={handleAreaSelected}
                    />
                  );
                })}
              </View>
            </View>
          </View>

          <View style={styles.doctorDetailsContainer}>
            <View>
              <View style={styles.doctorDetailsHeader}>
                <View>
                  <Label title={Strings.selectVisit} />
                </View>
                <View style={styles.categoryFilterContainer}>
                  {partiesType.map(type => (
                    <Area
                      selectedTextColor={themes.colors.white}
                      selectedColor={themes.colors.primary}
                      selected={selectedDoctorType === type}
                      title={type}
                      value={type}
                      bgColor={themes.colors.white}
                      color={'#524F67'}
                      onPress={handlePartyByType}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.doctorDetailsContainer}>
                {areaSelected.map(area => (
                  <>
                    <Label title={area.name} />
                    <View style={styles.doctorDetails}>
                      {getDoctorsByArea(area.id).map(party => (
                        <DoctorDetailsWrapper
                          title={party.name}
                          specialization={party.speciality}
                          category={party.isKyc ? Strings.kyc : party.category}
                          selected={false}
                          testID={`card_standard_plan_doctor_${party.id}_test`}
                        />
                      ))}
                    </View>
                  </>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.rightContent}>
          <Label title={Strings.planCompliance} />
        </View>
      </View>
    </ScrollView>
  );
};

const {height} = Dimensions.get('window');

const isAreaSelected = (area, areaList) => {
  return areaList.filter(val => val.id === area).length > 0;
};

const getPatchesDropdownData = patches => {
  let patchData = [];
  patches && patches.map(patch => patchData.push({value: patch.name}));
  return patchData;
};

StandardPlanModal.defaultProps = {
  handleSliderIndex: () => {},
};

StandardPlanModal.propsTypes = {
  handleSliderIndex: PropTypes.func,
};

export default StandardPlanModal;
