import React, {useState, useEffect, useRef, useCallback} from 'react';
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

/**
 * Standard Plan Modal component for setting daily standard plan.
 * This component use DoctorDetails, AreaChip, Label and Button component
 * @param {Function} handleSliderIndex to handle left/right movement of week
 */

const StandardPlanModal = ({handleSliderIndex, navigation, weekTitle}) => {
  const [patchValue, setPatchValue] = useState();
  const [areaSelected, setAreaSelected] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [patches, setPatches] = useState();
  const [patchSelected, setPatchSelected] = useState();
  const [partiesList, setPartiesList] = useState([]);
  const [parties, setParties] = useState([]);
  const [partiesType, setPartiesType] = useState([]);
  const [selectedDoctorType, setSelectedDoctorType] = useState(Strings.all);
  const [doctorsSelected, setDoctorSelected] = useState([]);
  const swiperRef = useRef(null);

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
    const patch = (patches || []).filter(val => patchValue === val.name);
    setPatchSelected(patch && patch.length > 0 && patch[0].name);
  }, [patches, patchValue]);

  const handleAreaSelected = val => {
    const index = (areaSelected || []).filter(area => area.id === val);
    if (index.length > 0) {
      setAreaSelected(areaSelected.filter(item => item.id !== val));
    } else {
      setAreaSelected([
        ...areaSelected,
        areaList.find(area => area.id === val),
      ]);
    }
    removeSelectedDoctorFromArea(val);
    setSelectedDoctorType(Strings.all);
  };

  const getPartyCountFromArea = useCallback(() => {
    const areaData = (areaList || []).map(area => {
      return {
        name: area.name,
        id: area.id,
        totalPartiesInArea: getDoctorsByArea(area.id).length,
      };
    });
    return areaData;
  }, [getDoctorsByArea, areaList]);

  const removeSelectedDoctorFromArea = useCallback(
    areaId => {
      const doctorToRemove = partiesList.find(party =>
        doctorsSelected.some(
          obj =>
            obj.partyId === party.id &&
            party.areas.some(par => par.id === areaId),
        ),
      );
      if (doctorToRemove) {
        setDoctorSelected(
          doctorsSelected.filter(doc => doc.partyId !== doctorToRemove.id),
        );
      }
    },
    [doctorsSelected, partiesList],
  );

  const createPatchString = useCallback(() => {
    let patchString = (areaSelected || [])
      .filter(area => {
        const partyData = partiesList.find(party =>
          doctorsSelected.some(
            obj =>
              obj.partyId === party.id &&
              party.areas.some(par => par.id === area.id),
          ),
        );
        return partyData ? true : false;
      })
      .map(patch => patch.name)
      .join(' + ');
    const patchCount = (patches || []).filter(p => p.name === patchString);
    if (patchCount && patchCount.length > 0) {
      patchString = patchString ? patchString + ` (${patchCount.length})` : '';
    }
    return patchString;
  }, [areaSelected, doctorsSelected, partiesList, patches]);

  useEffect(() => {
    if (!patchValue) {
      setPatchSelected(createPatchString());
    }
  }, [
    areaSelected,
    patchValue,
    doctorsSelected,
    partiesList,
    createPatchString,
  ]);

  const getDoctorsByArea = useCallback(
    area => {
      const partiesData = partiesList.filter(party => {
        const isArea = party.areas.find(obj => {
          return (
            obj.id === area &&
            (party.partyType === selectedDoctorType ||
              selectedDoctorType === Strings.all)
          );
        });
        if (isArea) {
          return party;
        }
      });
      return partiesData;
    },
    [partiesList, selectedDoctorType],
  );

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

  const handlePartyByType = val => {
    if (val !== Strings.all) {
      setParties(parties.filter(party => party.partyType === val));
      setSelectedDoctorType(val);
    } else {
      setParties(parties);
      setSelectedDoctorType(Strings.all);
    }
  };

  /**
   *  Handles Card click event& accept an id of party
   * @param {Number} id
   */
  const handleDoctorCardPress = id => {
    const indexAvailable = doctorsSelected.some(doc => doc.partyId === id);
    if (indexAvailable) {
      setDoctorSelected(doctorsSelected.filter(doc => doc.partyId !== id));
    } else {
      setDoctorSelected([...doctorsSelected, {partyId: id}]);
    }
  };

  const handleAreaLeftArrow = () => {
    swiperRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  const handleAreaRightArrow = () => {
    swiperRef.current.scrollTo({x: 400, y: 0, animated: true});
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
              title={weekTitle}
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
            patchValue || patchSelected
              ? styles.opacity_full
              : styles.opacity_light,
          ]}>
          <Label
            title={
              (patchSelected && patchSelected) ||
              (patchValue && patchValue.name) ||
              Strings.patchName
            }
          />
          {/* <View style={styles.patchIconContainer}>
            <TouchableOpacity style={[styles.patchIcon]}>
              <Icon name="edit" size={15} color={themes.colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.patchIcon}
              onPress={() => handleDeletePatch()}>
              <Icon name="trash" size={15} color={themes.colors.white} />
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={styles.headerButtonGroup}>
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
                <TouchableOpacity
                  onPress={() => handleAreaLeftArrow()}
                  style={[styles.swiperArrow, styles.leftArrow]}>
                  <Icon
                    name={'chevron-left'}
                    size={15}
                    color={themes.colors.grey[200]}
                  />
                </TouchableOpacity>
                <ScrollView
                  horizontal={true}
                  ref={swiperRef}
                  showsHorizontalScrollIndicator={false}>
                  {getPartyCountFromArea().map(area => {
                    return (
                      <Area
                        title={area.name}
                        value={area.id}
                        count={area.totalPartiesInArea}
                        bgColor={'#524F670D'}
                        color={'#524F67'}
                        selectedColor={'#322B7C1A'}
                        selected={isAreaSelected(area.id, areaSelected)}
                        selectedTextColor={themes.colors.primary}
                        style={styles.areaChip}
                        onPress={handleAreaSelected}
                      />
                    );
                  })}
                </ScrollView>
                <TouchableOpacity
                  onPress={() => handleAreaRightArrow()}
                  style={[styles.swiperArrow, styles.rightArrow]}>
                  <Icon
                    name={'chevron-right'}
                    size={15}
                    color={themes.colors.grey[200]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.doctorDetailsContainer}>
            <View>
              <View style={styles.doctorDetailsHeader}>
                <View style={styles.doctorSelectedContainer}>
                  <Label title={Strings.selectVisit} />
                  <Label
                    title={` - ${doctorsSelected.length} selected`}
                    type={'bold'}
                  />
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
                          id={party.id}
                          title={party.name}
                          specialization={party.speciality}
                          category={party.isKyc ? Strings.kyc : party.category}
                          selected={false}
                          testID={`card_standard_plan_doctor_${party.id}_test`}
                          party={party}
                          onPress={handleDoctorCardPress}
                        />
                      ))}
                    </View>
                  </>
                ))}
              </View>
              <View styles={styles.bottom}>
                <View style={styles.bottomContent}>
                  <Button
                    mode="text"
                    title={Strings.addOtherDoctors}
                    uppercase={false}
                    labelStyle={styles.addDoctors}
                  />
                  <Button
                    mode="contained"
                    title={`${Strings.doctorUniverse} (${partiesList.length})`}
                    uppercase={false}
                    contentStyle={styles.doneBtn}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={styles.rightContent}>
          <Label title={Strings.planCompliance} />
        </View> */}
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
