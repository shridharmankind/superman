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
}) => {
  const isDoctorSelected = partyId => {
    return (doctorsSelected || []).some(id => {
      if (id === partyId) {
        return true;
      }
    });
  };

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
      if (!isSameDayPatch) {
        newPartiesData = partiesData?.filter(
          par => par.frequency !== par.alreadyVisited,
        );
      }
      //setDoctorsByArea(newPartiesData);
      return newPartiesData;
    },
    [partiesList, selectedDoctorType, isSameDayPatch],
  );

  const renderDoctors = area => {
    const doctorInArea = getDoctorsByArea(area?.id);
    return (
      <View style={styles.doctorDetails}>
        {doctorInArea.length > 0 ? (
          doctorInArea.map((party, index) => (
            <DoctorDetailsWrapper
              key={party.id + area.id}
              id={party.id}
              title={party.shortName || party.name}
              specialization={party.specialities}
              category={party.category}
              isKyc={party.isKyc}
              selected={isDoctorSelected(party.id)}
              testID={`card_standard_plan_doctor_${party.id}_test`}
              party={party}
              isPatchedData={isPatchedData}
              onPress={id => handleDoctorCardPress(id)}
              containerStyle={index % 2 === 0 ? styles.left : styles.right}
            />
          ))
        ) : (
          <Label
            title={Strings.noRecordsForSelection}
            variant={LabelVariant.h4}
          />
        )}
      </View>
    );
  };

  const renderAreaLabel = area => {
    return (
      <View style={styles.doctorSelectedContainer}>
        <Label
          title={area.name}
          testID={`label_stp_area_${area.id}_test`}
          size={14}
        />
        <Label
          title={` (${selectedPartyByArea(area.id)})`}
          type={'bold'}
          size={14}
        />
      </View>
    );
  };

  return (
    <View style={styles.doctorDetailsContainer}>
      {areaSelected?.map((area, i) => (
        <React.Fragment key={i}>
          {renderAreaLabel(area)}
          {renderDoctors(area)}
        </React.Fragment>
      ))}
    </View>
  );
};

export default DoctorsByArea;
