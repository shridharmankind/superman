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
import {translate} from 'locale';

/**
 * Check if item is completed
 *
 * @param {Object} item
 * @return {boolean} isCompleted
 */
const isCompleted = item => {
  const today = startOf(new Date());
  return isAfter(today, item.date);
};

/**
 * Get containet style
 *
 * @param {Object} item
 * @return {Array} styles
 */
const getDateContainerStyle = item => {
  const style = [styles.timelineDateContainer];
  if (item.isMissed) {
    style.push(styles.timelineDateContainerMissed);
  } else if (isCompleted(item)) {
    style.push(styles.timelineDateContainerCompleted);
  }
  return style;
};

/**
 * Get date style based upon type
 *
 * @param {Object} item
 * @return {Array} styles
 */
const getDateStyle = item => {
  const style = [styles.timelineDate];
  if (item.isMissed) {
    style.push(styles.timelineDateMissed);
  } else if (isCompleted(item)) {
    style.push(styles.timelineDateCompleted);
  }
  return style;
};

/**
 * Get month style
 *
 * @param {Object} item
 * @return {Array} style
 */
const getMonthStyle = item => {
  const style = [styles.timelineMonth];
  if (item.isMissed) {
    style.push(styles.timelineMonthMissed);
  } else if (isCompleted(item)) {
    style.push(styles.timelineMonthCompleted);
  }
  return style;
};

/**
 * Render item details
 *
 * @param {Object} item
 * @return {JSX} Item details
 */
function renderItemDetails(item) {
  if (item.isMissed) {
    return (
      <View style={[styles.itemPlain]}>
        <TouchableOpacity style={[styles.itemPlainIcon]}>
          <MissedVisit height={20} width={20} />
        </TouchableOpacity>
        <Label
          style={[styles.timelineItemTitle]}
          title={translate('missedVisit')}
        />
      </View>
    );
  } else if (isCompleted(item)) {
    return renderCompletedVisit(item);
  } else {
    return (
      <View style={[styles.itemPlain]}>
        <TouchableOpacity style={[styles.itemPlainIcon]}>
          <DoctorVisit height={20} width={20} />
        </TouchableOpacity>
        <Label
          style={[styles.timelineItemTitle]}
          title={translate('upcomingVisit')}
        />
      </View>
    );
  }
}

/**
 * Completed item details
 *
 * @return {JSX} Completed Item Details
 */
const renderCompletedItemDetails = () => {
  return (
    <View style={[styles.itemDetailsContainer]}>
      <Text style={[styles.itemDetailsSection]}>
        <Label
          style={[styles.itemDetailsTitle]}
          title={translate('detailedProducts')}
        />
        <Label
          variant={LabelVariant.bodySmall}
          title="Amlokind AT, Cevakind I, Telmekind II"
        />
      </Text>
      <Text style={[styles.itemDetailsSection]}>
        <Label
          style={[styles.itemDetailsTitle]}
          title={translate('samplesGiven')}
        />
        <Label
          variant={LabelVariant.bodySmall}
          title="Amlokind, Cevakind, Telmekind"
        />
      </Text>
      <Text style={[styles.itemDetailsSection]}>
        <Label
          style={[styles.itemDetailsTitle]}
          title={translate('samplesRequested')}
        />
        <Label variant={LabelVariant.bodySmall} title="Amlokind AT, Gudacef" />
      </Text>
      <Text style={[styles.itemDetailsSection]}>
        <Label
          style={[styles.itemDetailsTitle]}
          title={translate('itemsGiven')}
        />
        <Label
          variant={LabelVariant.bodySmall}
          title="Booklet, Pens, Diary, Calendar"
        />
      </Text>
      <Text style={[styles.itemDetailsSection]}>
        <Label
          style={[styles.itemDetailsTitle]}
          title={translate('itemsRequested')}
        />
        <Label
          variant={LabelVariant.bodySmall}
          title="Faceshields(2), Masks(12), Sanitizer(4)"
        />
      </Text>
      <Text style={[styles.itemDetailsSection]}>
        <Label
          style={[styles.itemDetailsTitle]}
          title={translate('visitNotes')}
        />
        <Label
          variant={LabelVariant.bodySmall}
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </Text>
    </View>
  );
};

/**
 * Render Timeline item
 *
 * @param {Object} item
 * @param {number} index
 * @return {JSX} Timeline Item
 */
function renderItem(item, index) {
  return <View style={[styles.timelineItem]}>{renderItemDetails(item)}</View>;
}

/**
 * Render Item Date
 *
 * @param {number} item
 * @param {number} index
 * @return {JSX} Timeline Date
 */
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

/**
 * Render completed visit
 *
 * @return {JSX} Completed Visit
 */
const renderCompletedVisit = () => {
  return (
    <List.Accordion
      title={translate('completedVisit')}
      titleStyle={[styles.timelineItemTitle]}
      style={[styles.timelineItemAccordion]}
      left={() => {
        return (
          <TouchableOpacity style={[styles.timelineItemIcon]}>
            <DoctorVisit height={20} width={20} />
          </TouchableOpacity>
        );
      }}>
      {renderCompletedItemDetails()}
    </List.Accordion>
  );
};

/**
 * Timeline component
 *
 * @param {Object} props
 * @return {JSX} Doctor timeline
 */
const DocTimeline = props => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(prevExpanded => !prevExpanded);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onViewableItemsChanged = React.useCallback(
    debounce(({viewableItems}) => {
      const lastItem = viewableItems[viewableItems.length - 1];
      dispatch(timelineActions.handleScroll({index: lastItem?.index}));
    }, 500),
    [dispatch],
  );
  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 70,
  });

  /**
   * Render Navigation Dots
   *
   * @param {Object} {item, index}
   * @return {JSX} Dots
   */
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

  /**
   * Render last completed item
   *
   * @return {JSX} Last comleted item
   */
  const renderHightlight = () => {
    if (!lastCompleted) {
      return null;
    }
    return (
      <View style={[styles.timelineItem, styles.timelineHighlitedItem]}>
        <List.Accordion
          title={`${translate('lastCompletedVisit')} (${translate(
            'on',
          )} ${getFormatDate({
            date: lastCompleted.item.date,
            format: 'DD-MM-YYYY',
          })})`}
          expanded={expanded}
          onPress={handlePress}
          titleStyle={[styles.timelineItemTitle]}
          style={[styles.timelineItemAccordion]}
          left={() => {
            return (
              <TouchableOpacity style={[styles.timelineItemIcon]}>
                <DoctorVisit height={20} width={20} />
              </TouchableOpacity>
            );
          }}>
          {renderCompletedItemDetails()}
        </List.Accordion>
      </View>
    );
  };

  return (
    <View style={[styles.timelineWrapper]}>
      {renderHightlight(lastCompleted)}
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
          options={{
            ref: reference => {
              ref = reference;
            },
            viewabilityConfig: viewabilityConfig.current,
            onViewableItemsChanged: onViewableItemsChanged,
          }}
        />
      </View>
    </View>
  );
};

export default DocTimeline;
