import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Label, DoctorDetailsWrapper, LabelVariant} from 'components/elements';
import {Strings} from 'common';
import styles from './styles';

const DoctorsByArea = ({
  areaSelected,
  doctorsSelected,
  handleDoctorCardPress,
  isPatchedData,
  selectedPartyByArea,
  partiesList,
  selectedDoctorType,
  isSameDayPatch,
  allPartiesByPatchID,
}) => {
  const isDoctorSelected = useCallback(
    (partyId, area) => {
      return (doctorsSelected || []).some(
        party => party.partyId === partyId && party.areaId === area,
      );
    },
    [doctorsSelected],
  );

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
      let newPartiesData = partiesData;
      if (!isPatchedData) {
        newPartiesData = partiesData?.filter(
          par => par.frequency > par.alreadyVisited,
        );
      }

      return newPartiesData;
    },
    [partiesList, selectedDoctorType, isPatchedData],
  );

  /** function to render parties by area selected from area chiklets
   * @param {Object} area area object passed
   */
  const renderDoctors = useCallback(
    area => {
      const doctorInArea = getDoctorsByArea(area?.id);
      return (
        doctorInArea.length > 0 && (
          <View style={styles.doctorDetails}>
            {doctorInArea.map((party, index) => (
              <DoctorDetailsWrapper
                key={party.id + area.id}
                id={party.id}
                title={party.shortName || party.name}
                specialization={party.specialities}
                category={party.category}
                isKyc={party.isKyc}
                isCampaign={party.isCampaign}
                selected={isDoctorSelected(party.id, area.id)}
                testID={`card_standard_plan_doctor_${party.id}_test`}
                party={party}
                isPatchedData={isPatchedData}
                onPress={id => handleDoctorCardPress(id, area.id)}
                containerStyle={index % 2 === 0 ? styles.left : styles.right}
                isSameDayPatch={isSameDayPatch}
                isPartyInPatch={isPartyInPatch(party.id)}
              />
            ))}
          </View>
        )
      );
    },
    [
      getDoctorsByArea,
      handleDoctorCardPress,
      isDoctorSelected,
      isPatchedData,
      isSameDayPatch,
      isPartyInPatch,
    ],
  );

  /** function to render area label by area selected from area chiklets
   * @param {Object} area area object passed
   */
  const renderAreaLabel = area => {
    return (
      <View style={styles.doctorSelectedContainer}>
        <Label
          title={area.name}
          variant={LabelVariant.subtitleSmall}
          testID={`label_stp_area_${area.id}_test`}
        />
        <Label
          title={` (${selectedPartyByArea(area.id)})`}
          type={'bold'}
          variant={LabelVariant.subtitleSmall}
        />
      </View>
    );
  };

  /**method to check if party is part of patch
   * @param {String} id party id
   * @return {Boolean}
   */
  const isPartyInPatch = useCallback(
    id => {
      return allPartiesByPatchID?.some(party => party.partyId === id);
    },
    [allPartiesByPatchID],
  );

  return (
    <View style={styles.doctorDetailsContainer}>
      {areaSelected.length > 0 ? (
        areaSelected?.map((area, i) => (
          <React.Fragment key={i}>
            {renderAreaLabel(area)}
            {renderDoctors(area)}
          </React.Fragment>
        ))
      ) : (
        <Label
          title={Strings.noRecordsForSelection}
          variant={LabelVariant.h4}
          type={'bold'}
        />
      )}
    </View>
  );
};

export default DoctorsByArea;
