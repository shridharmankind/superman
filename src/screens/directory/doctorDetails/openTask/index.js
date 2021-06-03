/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import taskStyles from './styles.js';
import {Label, LabelVariant} from 'components/elements';
import {Strings} from 'common';
import dayjs from 'dayjs';
import theme from 'themes';
var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const OpenTask = () => {
  // toggling View All/View Less
  const [isViewAll, toggleViewAll] = useState(false);
  // Task ids Expansion list
  const [taskToExpand, setTask] = useState([]);
  let upcomingTask = [];
  //const user = useSelector(state => state.openTaskState.task);

  const [taskData, updateTaskData] = useState([
    {
      id: 1,
      type: 'Sample Request',
      description: `Share samples of Crocin requested by doctor Share samples of Crocin requested by doctor Request
      Share samples of Crocin requested by doctor Share samples of Crocin requested by doctor Share samples 
      of Crocin requested by docto Share samples of Crocin requested by doctor Share samples of Crocin 
      requested by doctor`,
      dueOn: '2021-05-17T22:00:00.000Z',
    },
    {
      id: 2,
      type: 'Info Request',
      description: `Share samples of Crocin requested by doctor Share samples of Crocin requested by doctor Request
      Share samples of Crocin requested by doctor Share samples of Crocin requested by doctor Share samples 
      of Crocin requested by docto Share samples of Crocin requested by doctor Share samples of Crocin 
      requested by doctor Share samples of Crocin requested by doctor Share samples of Crocin requested by doctor Request
      Share samples of Crocin requested by doctor Share samples of Crocin requested by doctor Share samples 
      of Crocin requested by docto Share samples of Crocin requested by doctor Share samples of Crocin 
      requested by doctor`,
      dueOn: '2021-05-17T22:00:00.000Z',
    },
    {
      id: 3,
      type: 'Sample Request',
      description: 'Share samples of Crocin requested by doctor',
      dueOn: '2021-06-17T22:00:00.000Z',
    },
    {
      id: 4,
      type: 'Sample Request',
      description: 'Share samples of Crocin requested by doctor',
      dueOn: '2021-06-17T22:00:00.000Z',
    },
  ]);

  const moreData = [
    {
      id: 5,
      type: 'Sample Request',
      description: 'Share samples of Crocin requested by doctor',
      dueOn: '2021-06-17T22:00:00.000Z',
    },
    {
      id: 6,
      type: 'Sample Request',
      description: 'Share samples of Crocin requested by doctor',
      dueOn: '2021-06-17T22:00:00.000Z',
    },
    {
      id: 7,
      type: 'Sample Request',
      description: 'Share samples of Crocin requested by doctor',
      dueOn: '2021-06-17T22:00:00.000Z',
    },
    {
      id: 8,
      type: 'Sample Request',
      description: 'Share samples of Crocin requested by doctor',
      dueOn: '2021-06-17T22:00:00.000Z',
    },
    {
      id: 9,
      type: 'Sample Request',
      description: 'Share samples of Crocin requested by doctor',
      dueOn: '2021-06-17T22:00:00.000Z',
    },
  ];

  /* Function to toggle View All state.
  Called on click of View All link. When View All is set to true,
  all tasks will be displayed else only 3 tasks will be displayed.
  */
  const viewAllTask = () => {
    toggleViewAll(!isViewAll);
  };

  /*Function to expand/collapse the specific task.
  Called on Press of each task if clipped by ellipsis to view the full
  description of the specific task */
  const expandTask = taskId => {
    if (taskToExpand.length > 0) {
      const index = taskToExpand.findIndex(ele => ele === taskId);
      if (index === -1) {
        // if task id is not present then need to expand it
        setTask([...taskToExpand, taskId]);
      } else {
        let tempArr = taskToExpand;
        tempArr.splice(index, 1);
        setTask([...tempArr]); // if task id is  present then need to collpase it
      }
    } else {
      setTask([...taskToExpand, taskId]); // taskExpansion list is empty
    }
  };

  /*Function to calculate the number of lines to be assigned to each task based upon
  the values inside taskToExpand. For all the tasks present in taskToExpand, need to
  make numberofLines aa undefined else 2  */
  const noOfLinesCal = taskId => {
    if (taskToExpand.length > 0) {
      if (taskToExpand.findIndex(ele => ele === taskId) === -1) {
        return 2;
      } else {
        return undefined;
      }
    } else {
      return 2;
    }
  };

  /* Function to check if the task date is overdue or due or upcoming(next 2 immediate due tasks)*/
  const isOverDue = (dueDate, itemId) => {
    const currentDate = dayjs.utc().format();
    let result = dayjs(currentDate).diff(dayjs(dueDate));
    if (result > 0) {
      return true; // overdue
    } else {
      if (upcomingTask.length < 3) {
        upcomingTask.push(itemId);
      }
      return false;
    }
  };

  /* Function to format the date as per the design requirement */
  const formatDate = dueDate => {
    return dayjs(dueDate).format('DD MMM YYYY').toUpperCase();
  };

  const handlePressOut = () => {
    setTask([]);
    return;
  };

  /* To deal with infinite scrolling*/
  const handleLoadMore = () => {
    if (taskData.length === 9) {
      return;
    }
    updateTaskData([...taskData, ...moreData]);
  };

  return (
    <View style={taskStyles.taskList}>
      <View style={taskStyles.header}>
        <View style={taskStyles.leftAlign}>
          <Label
            variant={LabelVariant.h3}
            title={Strings.doctorDetail.openTasks.openTask}
            testID="label_opentasks_header_test"
          />
          <View style={taskStyles.count}>
            <Label variant={LabelVariant.bodySmall} title={taskData.length} />
          </View>
        </View>
        {/* To be added later */}
        {/* <View>
              <Label
                style={{
                  fontSize: 12.7,
                  color: theme.colors.primary,
                  fontFamily: themes.fonts.fontSemiBold,
                }}
                title="+ New Task"
              />
            </View> */}
      </View>
      <View style={taskStyles.section} onResponderRelease={handlePressOut}>
        <FlatList
          keyExtractor={item => item.id}
          data={taskData}
          onEndReached={!isViewAll ? undefined : handleLoadMore}
          onEndReachedThreshold={0.5}
          renderItem={({item, index}) => {
            if (!isViewAll && index >= 3) {
              return null;
            } else {
              return (
                <TouchableOpacity
                  style={taskStyles.taskContainer}
                  onPress={() => expandTask(item.id)}>
                  <View style={taskStyles.taskHeader}>
                    <Text style={taskStyles.taskTitle}>{item.type}</Text>
                    <View
                      style={[
                        taskStyles.taskDueDate,
                        isOverDue(item.dueOn, item.id)
                          ? {backgroundColor: theme.colors.alert}
                          : upcomingTask.findIndex(ele => ele === item.id) ===
                            -1
                          ? {backgroundColor: theme.colors.standard}
                          : {backgroundColor: theme.colors.warning},
                      ]}>
                      <Text
                        style={[
                          {fontSize: 8},
                          isOverDue(item.dueOn)
                            ? {color: theme.colors.white}
                            : {color: theme.colors.grey[200]},
                        ]}>
                        {' '}
                        {Strings.doctorDetail.openTasks.due} :{' '}
                        {formatDate(item.dueOn)}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={taskStyles.taskDesc}
                      numberOfLines={noOfLinesCal(item.id)}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
      {taskData.length > 3 && (
        <View>
          <Label
            style={[taskStyles.footer, !isViewAll ? null : {marginTop: 13.3}]}
            variant={LabelVariant.h5}
            onPress={viewAllTask}>
            {!isViewAll
              ? `${Strings.doctorDetail.openTasks.viewAll}`
              : `${Strings.doctorDetail.openTasks.viewLess}`}
          </Label>
        </View>
      )}
    </View>
  );
};

export default OpenTask;
