import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Strings} from 'common';
import themes from 'themes';
import styles from './styles';
import {Label} from 'components/elements';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {List} from 'react-native-paper';
import {
  dcrActions,
  dcrSelector,
} from 'screens/directory/doctorDetails/doctorFeedback/redux';
const InfoOpenTasks = ({index, width}) => {
  const dispatch = useDispatch();

  const doctors = useSelector(dcrSelector.getPartyData());

  // For incrementing the sample strips
  const renderIcon = item => {
    if (item.completed) {
      return <Icon name="check" size={16} color={themes.colors.white} />;
    } else {
      return <Icon name="check" size={16} color={themes.colors.primary} />;
    }
  };

  const statusHandler = (doctorId, task) => {
    let tempTask = {...task};
    tempTask.completed = !tempTask.completed;
    const partyIndex = doctors.findIndex(item => item.partyId === doctorId);
    const sampleIndex = doctors[partyIndex].infoOpenTasks.findIndex(
      item => item.taskId === task.taskId,
    );
    let tempSampleArray = [...doctors[partyIndex].infoOpenTasks];
    tempSampleArray.splice(sampleIndex, 1, tempTask);
    let tempDocObj = {...doctors[partyIndex]};
    tempDocObj.infoOpenTasks = tempSampleArray;
    let newArr = [...doctors]; // copying the old datas array
    newArr[partyIndex] = tempDocObj;
    dispatch(dcrActions.updateDoctorDetails(newArr));
  };

  // To render the specific data related to specific doctor
  const renderInfoTasks = (docId, infoTaskArray, noTaskUpdate) => {
    return (
      <View style={styles.sampleListContainer}>
        <FlatList
          nestedScrollEnabled
          keyExtractor={item => item.taskId}
          contentContainerStyle={styles.scrollPad}
          data={infoTaskArray}
          renderItem={({item, index}) => {
            return (
              <View style={styles.sampleStyling}>
                <View style={styles.leftAlign}>
                  <Label title={`Task ${index + 1}`} style={styles.rowText} />
                  <Label title={item.infoDescription} />
                </View>
                {!noTaskUpdate && (
                  <View style={styles.rightAlign}>
                    <TouchableOpacity
                      style={
                        item.completed
                          ? [styles.statusContainer, styles.highlightedbkgColor]
                          : styles.statusContainer
                      }
                      onPress={() => statusHandler(docId, item)}>
                      {renderIcon(item)}
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
        />
      </View>
    );
  };

  const noTaskUpdateHandler = docId => {
    const checkIndex = doctors.findIndex(item => item.partyId === docId);
    if (checkIndex >= 0) {
      let tempObj = {...doctors[checkIndex]};
      tempObj.noTaskUpdate = !doctors[checkIndex].noTaskUpdate;

      let tempArray = [...doctors];
      tempArray[checkIndex] = tempObj;

      dispatch(dcrActions.updateDoctorDetails(tempArray));
    }
  };

  const renderCheckIcon = ind => {
    if (doctors[ind]?.noTaskUpdate) {
      if (doctors[ind].noTaskUpdate === true) {
        return (
          <Icon name="check-circle" size={16} color={themes.colors.primary} />
        );
      } else {
        return (
          <Icon name="check-thin" size={16} color={themes.colors.primary} />
        );
      }
    } else {
      return (
        <Icon name="circle-thin" size={16} color={themes.colors.primary} />
      );
    }
  };
  return (
    <View style={[{width: width - 300}, styles.slideStyle]}>
      <View style={styles.questionSection}>
        <Text style={styles.question}>
          <Text style={{fontFamily: themes.fonts.fontBold}}>{index + 1}.</Text>
          {` ${Strings.doctorDetail.dcr.task.question.leftPart} `}
          <Text style={{fontFamily: themes.fonts.fontBold}}>
            {`${Strings.doctorDetail.dcr.task.question.midPart} `}
          </Text>
          {`${Strings.doctorDetail.dcr.task.question.rightPart}`}
        </Text>
      </View>
      {doctors && doctors.length > 0 && (
        <View style={styles.answerSection}>
          <List.AccordionGroup>
            {doctors.map((docObj, ind) => {
              return (
                <View>
                  <View style={styles.noSampleCheck}>
                    <TouchableOpacity
                      style={styles.iconStyling}
                      onPress={() => noTaskUpdateHandler(docObj.partyId)}>
                      {renderCheckIcon(ind)}
                    </TouchableOpacity>
                    <Label title={Strings.doctorDetail.dcr.task.noTaskUpdate} />
                  </View>
                  <List.Accordion
                    title={`Dr. ${docObj.partyName}`}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{width: 500}}
                    // eslint-disable-next-line react-native/no-inline-styles
                    titleStyle={{justifyContent: 'flex-start', fontSize: 18}}
                    id={docObj.partyId}>
                    {renderInfoTasks(
                      docObj.partyId,
                      docObj.infoOpenTasks,
                      docObj.noTaskUpdate,
                    )}
                  </List.Accordion>
                </View>
              );
            })}
          </List.AccordionGroup>
        </View>
      )}
    </View>
  );
};

export default InfoOpenTasks;
