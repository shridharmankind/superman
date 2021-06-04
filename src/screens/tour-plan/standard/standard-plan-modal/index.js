import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Area,
  Label,
  LabelVariant,
  Button,
  Dropdown,
  DoctorDetailsWrapper,
} from 'components/elements';
import themes from 'themes';
import {Strings, Constants} from 'common';
import styles from './styles';
import {PARTY_TYPE} from 'screens/tourPlan/constants';
import {
  fetchPartiesCreator,
  fetchAreasCreator,
  fetchPatchesCreator,
  fetchPartiesByPatchIdCreator,
  standardTourPlanSelector,
  savePatchCreator,
  standardPlanActions,
} from '../redux';
import {showToast, hideToast} from 'components/widgets/Toast';

/**
 * Standard Plan Modal component for setting daily standard plan.
 * This component use DoctorDetails, AreaChip, Label and Button component
 * @param {Function} handleSliderIndex to handle left/right movement of week
 * @param {Object} navigation contains react navigation method
 * @param {String} week week has been passed from parent component
 * @param {String} weekDay weekDay has been passed from parent component
 */

const StandardPlanModal = ({
  handleSliderIndex,
  navigation,
  week,
  weekDay,
  year,
}) => {
  const dispatch = useDispatch();
  const [patchValue, setPatchValue] = useState();
  const [areaSelected, setAreaSelected] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [patches, setPatches] = useState();
  const [patchSelected, setPatchSelected] = useState();
  const [patchDefaultValue, setPatchDefaultValue] = useState();
  const [partiesList, setPartiesList] = useState([]);
  const [parties, setParties] = useState([]);
  const [partiesType, setPartiesType] = useState([]);
  const [selectedDoctorType, setSelectedDoctorType] = useState(Strings.all);
  const [doctorsSelected, setDoctorSelected] = useState([]);
  const [showPatchError, setShowPatchError] = useState(false);
  const [patchError, setPatchError] = useState();
  const swiperRef = useRef(null);
  const [hideRightArrow, setHideRightArrow] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isPatchedData, setIsPatchedData] = useState(false);
  const [patchEdited, setPatchEdited] = useState(false);
  const [patchRequest, setPatchRequest] = useState({});
  const weekNum = parseInt(week.split(' ')[1], 2);
  const staffPositionId = 1;
  /**
   * callback function to return direction left/right of day swiper
   * @param {String} direction
   */
  const handleIndex = direction => {
    if (!patchSelected) {
      resetState();
    }
    handleSliderIndex(direction);
  };

  const resetState = async () => {
    setAreaSelected([]);
    setDoctorSelected([]);
    setIsPatchedData(false);
    setPatchEdited(false);
    setShowPatchError(false);
    setPatchError();
    setPatchSelected();
    setPatchDefaultValue();
    setPatchValue(null);
    await dispatch(standardPlanActions.resetPartiesByPatchID());
  };

  const allParties = useSelector(standardTourPlanSelector.getParties());
  const allAreas = useSelector(standardTourPlanSelector.getAreas());
  const allPatches = useSelector(standardTourPlanSelector.getPatches());
  const savePatchRes = useSelector(standardTourPlanSelector.savePatch());

  useEffect(() => {
    dispatch(
      fetchPartiesCreator({
        staffPositionId,
      }),
    );
    dispatch(
      fetchAreasCreator({
        staffPositionId,
      }),
    );
    dispatch(
      fetchPatchesCreator({
        staffPositionId,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    setPartiesList(allParties);
    filterPartyByType(allParties);
  }, [allParties]);

  useEffect(() => {
    setAreaList(allAreas);
  }, [allAreas]);

  useEffect(() => {
    setPatches(allPatches);
  }, [allPatches]);

  useEffect(() => {
    if (savePatchRes) {
      validateSaveResponse(patchRequest, patchValue?.id);
    }
  }, [savePatchRes, validateSaveResponse, patchRequest, patchValue]);

  const allPartiesByPatchID = useSelector(
    standardTourPlanSelector.getPartiesByPatchID(),
  );

  useEffect(() => {
    if (allPartiesByPatchID) {
      setDoctorSelected(allPartiesByPatchID.partyIds);
      getSelectedArea(allPartiesByPatchID.partyIds);
    }
  }, [getSelectedArea, allPartiesByPatchID, patchValue]);

  /** function to set area selected on chip click and update areaSelected state*/
  const getSelectedArea = useCallback(
    ids => {
      if (ids.length > 0) {
        let patchAreaList = [];
        (partiesList || []).map(party => {
          if (ids.some(id => id === party.id)) {
            party.areas.map(area => {
              if (patchAreaList.indexOf(area.id) === -1) {
                patchAreaList.push(area.id);
              }
            });
          }
        });
        const a = areaList.filter(
          area => patchAreaList.indexOf(area.id) !== -1,
        );
        setAreaSelected(a);
      }
    },
    [partiesList, areaList],
  );

  /** function to filter party by type and update partiesType
   * @param {Array} partyList list of parties passed
   */
  const filterPartyByType = partyList => {
    const doctorType = [Strings.all];
    partyList.map(party => {
      if (doctorType.indexOf(party.partyTypes.name) === -1) {
        doctorType.push(party.partyTypes.name);
      }
    });
    setPartiesType(doctorType);
  };

  /** function to handle and update state with area selected
   * @param {Number} val area id passed
   */
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

  /** function to count party for all areas and return an obj*/
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

  /** function to removed doctors from specific area on press
   * @param {Number} areaId area id passed
   */
  const removeSelectedDoctorFromArea = useCallback(
    areaId => {
      const doctorToRemove = partiesList.find(party =>
        doctorsSelected.some(
          obj => obj === party.id && party.areas.some(par => par.id === areaId),
        ),
      );
      if (doctorToRemove) {
        setDoctorSelected(
          doctorsSelected.filter(doc => doc !== doctorToRemove.id),
        );
      }
    },
    [doctorsSelected, partiesList],
  );

  /** function to create patch string to be put in patch input field*/
  const createPatchString = useCallback(() => {
    let patchString = (areaSelected || [])
      .filter(area => {
        const partyData = partiesList.find(party =>
          doctorsSelected.some(
            obj =>
              obj === party.id && party.areas.some(par => par.id === area.id),
          ),
        );
        return partyData ? true : false;
      })
      .map(patch => patch.name)
      .join(' + ');
    const patchCount = (patches || []).filter(
      p => p.displayName === patchString || p.defaultName === patchString,
    );
    if (patchCount) {
      patchString = patchString
        ? patchString +
          ` (${patchCount.length === 0 ? 1 : patchCount.length + 1})`
        : '';
    }
    return patchString;
  }, [areaSelected, doctorsSelected, partiesList, patches]);

  useEffect(() => {
    if (!isPatchedData) {
      const string = createPatchString();
      if (!patchEdited) {
        setPatchSelected(string);
      }
      setPatchDefaultValue(string);
    }
  }, [
    areaSelected,
    isPatchedData,
    doctorsSelected,
    partiesList,
    createPatchString,
    patchEdited,
  ]);

  /** function to filter parties by area selected from area chiklets
   * @param {Number} area area id passed as number
   */
  const getDoctorsByArea = useCallback(
    area => {
      const partiesData = (partiesList || []).filter(party => {
        const isArea = party.areas.find(obj => {
          return (
            obj.id === area &&
            (party.partyTypes.name === selectedDoctorType ||
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

  /** function to validate the response from endpoint in case of save and updating the patch */
  const validateSaveResponse = useCallback(
    async (obj, id) => {
      if (savePatchRes) {
        if (savePatchRes?.status === Constants.HTTP_OK) {
          //await resetState();
        } else if (
          savePatchRes?.status === Constants.HTTP_PATCH_CODE.VALIDATED
        ) {
          if (
            savePatchRes?.data?.details[0]?.code ===
            Constants.HTTP_PATCH_CODE.ALREADY_EXITS
          ) {
            setPatchError(Strings.patchAlreadyExists);
          } else if (
            savePatchRes?.data?.details[0]?.code ===
            Constants.HTTP_PATCH_CODE.PATCH_EXITS_FOR_OTHER_DAY
          ) {
            showOverrideNotification(obj, id);
          } else {
            setPatchError(Strings.already30PatchesCreated);
          }
          setShowPatchError(true);
        } else {
          setPatchError(Strings.somethingWentWrong);
          setShowPatchError(true);
        }
      }
    },
    [savePatchRes, showOverrideNotification],
  );

  /** function to save the patch */
  const handleDonePress = async () => {
    const obj = {
      displayName: patchSelected,
      defaultName: patchDefaultValue,
      partyIds: doctorsSelected,
      week: weekNum,
      weekDay,
      year: year,
    };

    setPatchRequest(obj);
    const isPatchOfSameDay = isSameDayPatch(patchValue, weekNum, weekDay, year);

    if (!patchValue) {
      savePatch(obj);
    } else if (patchValue && isPatchOfSameDay) {
      updatePatch(obj, patchValue.id, false);
    } else if (patchValue && !isPatchOfSameDay) {
      savePatch(obj);
    }
  };

  /** function to show notification in case of updating the patch
   * @param {Object} obj patch request has been passed as object
   */
  const showOverrideNotification = useCallback(
    (obj, id) => {
      showToast({
        type: Constants.TOAST_TYPES.NOTIFICATION,
        autoHide: false,
        props: {
          onPress: () => {
            hideToast();
          },
          onClose: () => hideToast(),
          heading: Strings.confirmation,
          subHeading: Strings.patchUsedForOtherWeekDay,
          actionLeftTitle: Strings.yes,
          actionRightTitle: Strings.no,
          onPressLeftBtn: () => updatePatch(obj, id, true),
          onPressRightBtn: () => savePatch(obj),
        },
        // onHide: () => {},
      });
    },
    [savePatch, updatePatch],
  );

  /** function to save patch
   * @param {Object} obj patch request has been passed as object
   */
  const savePatch = useCallback(
    obj => {
      dispatch(
        savePatchCreator({
          obj,
          type: 'post',
          staffPositionId,
        }),
      );
      hideToast();
    },
    [dispatch],
  );

  /** function to update patch
   * @param {Object} obj patch request has been passed as object
   */
  const updatePatch = useCallback(
    (obj, id, acknowledge) => {
      dispatch(
        savePatchCreator({
          obj: {
            ...(obj || patchRequest),
            patchId: id,
            isUserAcknowledge: acknowledge,
          },
          type: 'put',
          staffPositionId,
        }),
      );
      hideToast();
    },
    [dispatch, patchRequest],
  );

  /** function to filter parties by doctors, chemist, all
   * @param {Object} obj patch request has been passed as object
   */
  const handlePartyByType = val => {
    if (val !== Strings.all) {
      setParties(parties.filter(party => party.partyTypes.name === val));
      setSelectedDoctorType(val);
    } else {
      setParties(parties);
      setSelectedDoctorType(Strings.all);
    }
  };

  /**
   *  Handles Card click event& accept an id of party
   * @param {Number} id party id passed as int
   */
  const handleDoctorCardPress = id => {
    const indexAvailable = doctorsSelected.some(party => party === id);
    if (indexAvailable) {
      setDoctorSelected(doctorsSelected.filter(party => party !== id));
    } else {
      setDoctorSelected([...doctorsSelected, id]);
    }
    if (!isSameDayPatch(patchValue, weekNum, weekDay, year)) {
      setIsPatchedData(false);
    }
  };

  /** function to handle area left swipe*/
  const handleAreaLeftArrow = () => {
    swiperRef.current.scrollTo({x: scrollOffset - 150, y: 0, animated: true});
    setScrollOffset(scrollOffset - 100);
  };

  /** function to handle area right swipe*/
  const handleAreaRightArrow = () => {
    swiperRef.current.scrollTo({x: scrollOffset + 150, y: 0, animated: true});
    setScrollOffset(scrollOffset + 100);
  };

  /** function to handle value of patch input field and check validation on string
   * @param {String} val string passed from input field
   */
  const handlePatchInputChange = val => {
    const regex = /^[ A-Za-z0-9-+&()]*$/;
    if (val.length < 64 && regex.test(val)) {
      setPatchSelected(val);
      setPatchEdited(true);
    }
  };

  /** handle value of dropdown if patch selected
   * @param {Object} val passed from dropdown
   */
  const handleDropDownValue = useCallback(
    val => {
      if (val) {
        setIsPatchedData(true);
        setPatchValue(val);
        setPatchSelected(val.value);
        setPatchDefaultValue(val.defaultName);
        dispatch(
          fetchPartiesByPatchIdCreator({
            patchID: val.id,
          }),
        );
      }
    },
    [dispatch],
  );

  /** function to filter parties by area selected
   * @param {Number} id area id passed from party object
   */
  const getSelectedPartyByArea = id => {
    let count = 0;
    getDoctorsByArea(id).map(party => {
      if (doctorsSelected.filter(doc => doc === party.id).length > 0) {
        count = count + 1;
      }
    });
    return count;
  };

  /**
   *  Handle singular & plural
   * @param {Number} count
   * @returns string
   */
  const getSuffix = count => (count > 1 ? 's' : '');

  /** function to filter parties by party type eg. doctors,chemist and all*/
  const getSelectedPartyByType = useCallback(() => {
    const obj = {doctors: 0, chemist: 0};
    partiesList.map(party => {
      if (doctorsSelected.some(id => id === party.id)) {
        if (party.partyTypes.name === 'Doctor') {
          obj.doctors = obj.doctors + 1;
        } else {
          obj.chemist = obj.chemist + 1;
        }
      }
    });

    if (selectedDoctorType === PARTY_TYPE.CHEMIST) {
      let partyCount = obj.chemist;
      return (
        partyCount > 0 &&
        ` - ${partyCount} ${PARTY_TYPE.CHEMIST.toLowerCase()}${getSuffix(
          partyCount,
        )}`
      );
    } else if (selectedDoctorType === PARTY_TYPE.DOCTOR) {
      let partyCount = obj.doctors;
      return (
        partyCount > 0 &&
        ` - ${partyCount} ${PARTY_TYPE.DOCTOR.toLowerCase()}${getSuffix(
          partyCount,
        )}`
      );
    }
    return `${
      doctorsSelected.length > 0 ? ` - ${doctorsSelected.length} (` : ''
    }${
      obj.doctors > 0
        ? `${obj.doctors} doctor${obj.doctors > 1 ? 's' : ''}`
        : ''
    }${obj.doctors > 0 && obj.chemist > 0 ? ', ' : ''}${
      obj.doctors > 0 && obj.chemist === 0 ? ')' : ''
    }${obj.chemist > 0 ? `${obj.chemist} chemist)` : ''}`;
  }, [doctorsSelected, partiesList, selectedDoctorType]);

  /** function toh hide/show right arrow of area scroll
   * @param {Object} nativeEvent native events of scrollView passed
   */
  const hideScrollArrow = ({layoutMeasurement, contentOffset, contentSize}) => {
    if (layoutMeasurement.width + contentOffset.x >= contentSize.width) {
      setHideRightArrow(true);
    } else {
      setHideRightArrow(false);
    }
  };

  return (
    <ScrollView style={[styles.containerStyle, {height}]}>
      <View style={styles.modalHeader}>
        <View>
          <Label title={Strings.selectDoctorAndChemist} size={18.7} />
          <View style={styles.week}>
            <TouchableOpacity
              onPress={() => handleIndex(Constants.DIRECTION.LEFT)}>
              <Icon iconStyle={styles.weekArrow} name="angle-left" size={24} />
            </TouchableOpacity>
            <Label
              style={styles.weekLabel}
              title={`${week} - ${weekDay}`}
              variant={LabelVariant.h3}
              type={'bold'}
            />
            <TouchableOpacity
              onPress={() => handleIndex(Constants.DIRECTION.RIGHT)}>
              <Icon iconStyle={styles.weekArrow} name="angle-right" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.patchContainer]}>
          <View style={styles.patchInputCotainer}>
            <TextInput
              value={patchSelected}
              placeholder={Strings.patchName}
              style={styles.patchInput}
              editable={!patchValue && !patchDefaultValue ? false : true}
              onChangeText={val => handlePatchInputChange(val)}
              maxLength={64}
            />
          </View>
          {showPatchError && (
            <Label
              size={14}
              title={patchError}
              textColor={themes.colors.red[100]}
            />
          )}
        </View>
        <View style={styles.headerButtonGroup}>
          <Button
            mode="contained"
            title={Strings.done}
            uppercase={true}
            disabled={!patchSelected || false}
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
              <Label title={Strings.selectArea} size={14} />
            </View>
            <View style={styles.areaFilterContainer}>
              <Dropdown
                valueSelected={handleDropDownValue}
                data={getPatchesDropdownData(patches)}
                defaultLabel={Strings.selectPatch}
                isPatchedData={isPatchedData}
              />
              <View style={styles.areaFilter}>
                {scrollOffset > 0 && (
                  <TouchableOpacity
                    onPress={() => handleAreaLeftArrow()}
                    style={[styles.swiperArrow, styles.leftArrow]}>
                    <Icon
                      name={'chevron-left'}
                      size={10}
                      color={themes.colors.blue}
                    />
                  </TouchableOpacity>
                )}
                <ScrollView
                  horizontal={true}
                  ref={swiperRef}
                  onScroll={({nativeEvent}) => {
                    // if (isAreaViewScrollable(nativeEvent)) {
                    // enableSomeButton();
                    hideScrollArrow(nativeEvent);
                    // }
                  }}
                  showsHorizontalScrollIndicator={false}>
                  {getPartyCountFromArea().map(area => {
                    return (
                      <Area
                        key={area.id}
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
                {!hideRightArrow && (
                  <TouchableOpacity
                    onPress={() => handleAreaRightArrow()}
                    style={[styles.swiperArrow, styles.rightArrow]}>
                    <Icon
                      name={'chevron-right'}
                      size={10}
                      color={themes.colors.blue}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <View style={styles.doctorDetailsContainer}>
            <View>
              <View style={styles.doctorDetailsHeader}>
                <View style={styles.doctorSelectedContainer}>
                  <Label title={Strings.selectVisit} size={14} />
                  <Label
                    title={getSelectedPartyByType()}
                    type={'bold'}
                    size={14}
                  />
                </View>
                <View style={styles.categoryFilterContainer}>
                  {partiesType.map((type, i) => (
                    <Area
                      key={i}
                      selectedTextColor={themes.colors.white}
                      selectedColor={themes.colors.primary}
                      selected={selectedDoctorType === type}
                      title={type}
                      value={type}
                      bgColor={themes.colors.white}
                      color={'#524F67'}
                      onPress={handlePartyByType}
                      testID={`btn_stp_party_type_${type}_test`}
                      textStyle={styles.areaType}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.doctorDetailsContainer}>
                {areaSelected.map((area, i) => (
                  <React.Fragment key={i}>
                    <View style={styles.doctorSelectedContainer}>
                      <Label
                        title={area.name}
                        testID={`label_stp_area_${area.id}_test`}
                        size={14}
                      />
                      <Label
                        title={` (${getSelectedPartyByArea(area.id)})`}
                        type={'bold'}
                        size={14}
                      />
                    </View>

                    <View style={styles.doctorDetails}>
                      {getDoctorsByArea(area.id).map((party, index) => (
                        <DoctorDetailsWrapper
                          key={party.id}
                          id={party.id}
                          title={party.name}
                          specialization={party.specialities}
                          category={party.category}
                          isKyc={party.isKyc}
                          selected={(doctorsSelected || []).some(id => {
                            if (id === party.id) {
                              return true;
                            }
                          })}
                          testID={`card_standard_plan_doctor_${party.id}_test`}
                          party={party}
                          isPatchedData={isPatchedData}
                          onPress={handleDoctorCardPress}
                          containerStyle={
                            index % 2 === 0 ? styles.left : styles.right
                          }
                        />
                      ))}
                    </View>
                  </React.Fragment>
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
        <View style={styles.rightContent}>
          <Label variant={LabelVariant.h4} title={Strings.planCompliance} />
        </View>
      </View>
    </ScrollView>
  );
};

const {height} = Dimensions.get('window');

const isAreaSelected = (area, areaList) => {
  return areaList.filter(val => val.id === area).length > 0;
};

const isSameDayPatch = (patch, week, day, year) => {
  return week === patch?.week && day === patch?.weekDay && year === patch?.year;
};

const getPatchesDropdownData = patches => {
  let patchData = [];
  patches &&
    patches.map(patch =>
      patchData.push({
        value: patch.displayName,
        ...patch,
      }),
    );
  return patchData;
};

StandardPlanModal.defaultProps = {
  handleSliderIndex: () => {},
};

StandardPlanModal.propsTypes = {
  handleSliderIndex: PropTypes.func,
};

export default StandardPlanModal;
