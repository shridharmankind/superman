import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles.js';
import {Label, LabelVariant} from 'components/elements';
import {Strings} from 'common';
import dayjs from 'dayjs';
import theme from 'themes';
import {getFormatDate} from 'utils/dateTimeHelper';
import {fetchOpenTasksCreator} from './redux/openTaskSlice';
import {taskSelector} from './redux/openTaskSelector';

const OpenTask = () => {
  const LIMIT = 4; // limit of tasks to be fetched from server
  // toggling View All/View Less
  const [isViewAll, toggleViewAll] = useState(false);
  // Task ids Expansion list
  const [taskToExpand, setTask] = useState([]);
  const [skip, setSkip] = useState(0);

  const dispatch = useDispatch();
  // dispatching the action
  useEffect(() => {
    dispatch(
      fetchOpenTasksCreator({
        staffPositionID: 1,
        partyId: 1,
        skip: 0,
        limit: LIMIT,
      }),
    );
    setSkip(prev => prev + LIMIT);
  }, [dispatch]);

  let upcomingTask = [];
  const task = useSelector(taskSelector.getOpenTasks());
  const totalTaskCount = useSelector(taskSelector.getTaskCount());

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
    let result = dayjs().diff(dayjs(dueDate));
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
    return getFormatDate({date: dueDate, format: 'DD MMM YYYY'}).toUpperCase();
  };

  /* Function To load data on scroll*/
  const handleLoadMore = () => {
    if (skip < totalTaskCount) {
      dispatch(
        fetchOpenTasksCreator({
          staffPositionID: 1,
          partyId: 1,
          skip: skip,
          limit: LIMIT,
        }),
      );
      setSkip(prev => prev + LIMIT);
    }
  };

  // To differntiate upcoming task and other due tasks
  const findUpcomingTask = item => {
    if (upcomingTask.findIndex(ele => ele === item.id) === -1) {
      return {backgroundColor: theme.colors.grey[700]};
    } else {
      return {backgroundColor: theme.colors.yellow[100]};
    }
  };

  return (
    <View style={styles.taskList}>
      <View style={styles.header}>
        <View style={styles.leftAlign}>
          <Label
            variant={LabelVariant.h3}
            title={Strings.doctorDetail.openTasks.openTask}
          />
          <View style={styles.count}>
            <Label
              testID="task_count"
              variant={LabelVariant.bodySmall}
              title={totalTaskCount}
            />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        {!!task && (
          <FlatList
            keyExtractor={item => item.id}
            contentContainerStyle={styles.scrollPad}
            data={task}
            onEndReached={!isViewAll ? undefined : handleLoadMore}
            onEndReachedThreshold={0.5}
            renderItem={({item, index}) => {
              if (!isViewAll && index >= 3) {
                return null;
              } else {
                return (
                  <TouchableOpacity
                    style={styles.taskContainer}
                    onPress={() => expandTask(item.id)}>
                    <View style={styles.taskHeader}>
                      <Text style={styles.taskTitle}>{item.type}</Text>
                      <View
                        style={[
                          styles.taskDueDate,
                          isOverDue(item.dueOn, item.id)
                            ? {backgroundColor: theme.colors.orange[200]}
                            : findUpcomingTask(item),
                        ]}>
                        <Label
                          style={[
                            {fontSize: 8},
                            isOverDue(item.dueOn)
                              ? {color: theme.colors.white}
                              : {color: theme.colors.grey[200]},
                          ]}>
                          {Strings.doctorDetail.openTasks.due} :{' '}
                          {formatDate(item.dueOn)}
                        </Label>
                      </View>
                    </View>
                    <View>
                      <Text
                        style={styles.taskDesc}
                        numberOfLines={noOfLinesCal(item.id)}>
                        {item.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            }}
          />
        )}
      </View>
      {!!totalTaskCount && totalTaskCount > 3 && (
        <View>
          <Label
            style={styles.footer}
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
