import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Timeline} from 'components/widgets';
import {Label, LabelVariant} from 'components/elements';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {getFormatDate, startOf, isAfter} from 'utils/dateTimeHelper';
import {List} from 'react-native-paper';
import {DoctorVisit, MissedVisit} from 'assets';
import {fetchTimelineCreator, timelineActions} from './redux/timelineSlice';
import {timelineSelector} from './redux/timelineSelector';
import dayjs from 'dayjs';
import debounce from 'lodash.debounce';

const isCompleted = item => {
  const today = startOf(new Date());
  return isAfter(today, item.date);
};

const getDateContainerStyle = item => {
  const style = [styles.timelineDateContainer];
  if (item.isMissed) {
    style.push(styles.timelineDateContainerMissed);
  } else if (isCompleted(item)) {
    style.push(styles.timelineDateContainerCompleted);
  }
  return style;
};

const getDateStyle = item => {
  const style = [styles.timelineDate];
  if (item.isMissed) {
    style.push(styles.timelineDateMissed);
  } else if (isCompleted(item)) {
    style.push(styles.timelineDateCompleted);
  }
  return style;
};

const getMonthStyle = item => {
  const style = [styles.timelineMonth];
  if (item.isMissed) {
    style.push(styles.timelineMonthMissed);
  } else if (isCompleted(item)) {
    style.push(styles.timelineMonthCompleted);
  }
  return style;
};

function renderItemDetails(item) {
  if (item.isMissed) {
    return (
      <View style={[styles.itemPlain]}>
        <MissedVisit style={[styles.itemPlainIcon]} height={20} width={20} />
        <Label style={[styles.timelineItemTitle]} title="Missed Visit!" />
      </View>
    );
  } else if (isCompleted(item)) {
    return renderCompletedVisit(item);
  } else {
    return (
      <View style={[styles.itemPlain]}>
        <DoctorVisit style={[styles.itemPlainIcon]} height={20} width={20} />
        <Label style={[styles.timelineItemTitle]} title="Upcoming Visit" />
      </View>
    );
  }
}

function renderCompletedVisit(item) {
  return (
    <List.Accordion
      title="Completed Visit"
      titleStyle={[styles.timelineItemTitle]}
      style={[styles.timelineItemAccordion]}
      left={props => {
        return (
          <DoctorVisit
            style={[styles.timelineItemIcon]}
            height={20}
            width={20}
          />
        );
      }}>
      <View style={[styles.itemDetailsContainer]}>
        <Text style={[styles.itemDetailsSection]}>
          <Label
            style={[styles.itemDetailsTitle]}
            title="Detailed Products: "
          />
          <Label
            variant={LabelVariant.bodySmall}
            title="Amlokind AT, Cevakind I, Telmekind II"
          />
        </Text>
        <Text style={[styles.itemDetailsSection]}>
          <Label style={[styles.itemDetailsTitle]} title="Samples Given: " />
          <Label
            variant={LabelVariant.bodySmall}
            title="Amlokind, Cevakind, Telmekind"
          />
        </Text>
        <Text style={[styles.itemDetailsSection]}>
          <Label
            style={[styles.itemDetailsTitle]}
            title="Samples Requested: "
          />
          <Label
            variant={LabelVariant.bodySmall}
            title="Amlokind AT, Gudacef"
          />
        </Text>
        <Text style={[styles.itemDetailsSection]}>
          <Label style={[styles.itemDetailsTitle]} title="Items Given: " />
          <Label
            variant={LabelVariant.bodySmall}
            title="Booklet, Pens, Diary, Calendar"
          />
        </Text>
        <Text style={[styles.itemDetailsSection]}>
          <Label style={[styles.itemDetailsTitle]} title="Items Requested: " />
          <Label
            variant={LabelVariant.bodySmall}
            title="Faceshields(2), Masks(12), Sanitizer(4)"
          />
        </Text>
        <Text style={[styles.itemDetailsSection]}>
          <Label style={[styles.itemDetailsTitle]} title="Visit Notes: " />
          <Label
            variant={LabelVariant.bodySmall}
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </Text>
      </View>
    </List.Accordion>
  );
}

function renderItem(item, index) {
  return <View style={[styles.timelineItem]}>{renderItemDetails(item)}</View>;
}

function renderDate(item, index) {
  return (
    <View style={getDateContainerStyle(item)}>
      <Label
        testID="timeline-date"
        title={getFormatDate({date: item.date, format: 'DD'})}
        style={getDateStyle(item)}
      />
      <Label
        testID="timeline-month"
        title={getFormatDate({date: item.date, format: 'MMM'})}
        style={getMonthStyle(item)}
      />
    </View>
  );
}

const DocTimeline = props => {
  const dispatch = useDispatch();
  let ref = null;
  // dispatching the action
  useEffect(() => {
    const {staffPositionId, partyId} = props;
    dispatch(
      fetchTimelineCreator({
        staffPositionId,
        partyId,
        start: getFormatDate({
          date: dayjs().subtract(2, 'months').startOf('month'),
          format: 'YYYY-MM-DD',
        }),
        end: getFormatDate({
          date: dayjs().endOf('month'),
          format: 'YYYY-MM-DD',
        }),
      }),
    );
  }, [dispatch, props]);
  const data = useSelector(timelineSelector.getVisits());
  const buttons = useSelector(timelineSelector.getButtons());
  const lastCompleted = useSelector(timelineSelector.getLastCompleted());

  function renderHightlight() {
    if (!lastCompleted) {
      return null;
    }
    return (
      <View style={[styles.timelineItem]}>
        <View style={[styles.itemPlain]}>
          <DoctorVisit style={[styles.itemPlainIcon]} height={20} width={20} />
          <Text>
            <Label
              style={[styles.timelineItemTitle]}
              title="Last Completed Visit"
            />
            <Label
              style={[styles.timelineItemTitle]}
              title={` (On ${getFormatDate({
                date: lastCompleted.item.date,
                format: 'DD-MM-YYYY',
              })})`}
            />
          </Text>
        </View>
      </View>
    );
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onViewableItemsChanged = React.useCallback(
    debounce(({viewableItems}) => {
      const lastItem = viewableItems[viewableItems.length - 1];
      dispatch(timelineActions.handleScroll({index: lastItem.index}));
    }, 500),
    [dispatch],
  );
  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 70,
  });

  const renderDot = ({item, index}) => {
    if (item.selected) {
      return (
        <Label
          testID="timeline-dot-selected"
          title={item.label}
          style={[styles.timelineDotSelected]}
        />
      );
    }
    return (
      <TouchableOpacity
        testID="timelineMonthDot"
        onPress={() => {
          ref.scrollToIndex({index: item.itemIndex, animated: true});
          dispatch(timelineActions.setSelectedButtonIndex({index}));
        }}>
        <View style={[styles.timelineDot]} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.timelineWrapper]}>
      <Label
        testID="timeline-year"
        variant={LabelVariant.h4}
        title={getFormatDate({date: new Date(), format: 'YYYY'})}
        style={[styles.timelineYear]}
      />
      <FlatList
        style={[
          styles.timelineDots,
          // eslint-disable-next-line react-native/no-inline-styles
          {left: buttons.length > 1 ? (buttons.length - 1) * -10 : 0},
        ]}
        contentContainerStyle={styles.timelineDotsContent}
        data={buttons}
        renderItem={renderDot}
        numColumns={3}
        keyExtractor={(item, index) => index + ''}
      />
      <View style={[styles.timelineScrollContainer]}>
        <Timeline
          style={[styles.timeline]}
          data={data}
          renderItem={renderItem}
          renderDate={renderDate}
          renderHighlight={renderHightlight}
          options={{
            ref: reference => {
              ref = reference;
            },
            // viewabilityConfig: viewabilityConfig.current,
            // onViewableItemsChanged: onViewableItemsChanged,
          }}
        />
      </View>
    </View>
  );
};

export default DocTimeline;
