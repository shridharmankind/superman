import {PresentationSlide} from 'components/widgets';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import styles from './styles';
import {Button, Label, LabelVariant, Modal} from 'components/elements';
import dayjs from 'dayjs';

const {width} = Dimensions.get('window');

const Presentation = () => {
  const slides = [{}, {}];
  let caraouselRef = useRef(null);
  let currentSlideLoadTime = null;
  let unloadedSlide = null;
  const renderSlide = index => {
    return (
      <View style={[styles.slideWrapper, {width: width - 265}]}>
        {caraouselRef.current.getCurrentIndex() === index ? (
          <PresentationSlide
            key={index}
            onLoad={() => {
              if (unloadedSlide !== index) {
                currentSlideLoadTime = new Date();
                console.log('loading', index);
              }
            }}
            onUnload={() => {
              if (currentSlideLoadTime) {
                const seconds = dayjs(new Date()).diff(
                  dayjs(currentSlideLoadTime),
                  'seconds',
                );
                if (seconds > 0) {
                  console.log('Unloading', index, 'in seconds:', seconds);
                  unloadedSlide = index;
                }
              }
              currentSlideLoadTime = null;
            }}
          />
        ) : (
          <Text>Testing</Text>
        )}
      </View>
    );
  };
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={[styles.headCol]}>
          <Label
            testID="eDetail-title"
            variant={LabelVariant.h2}
            title="Introduction"
          />
        </View>
        <View style={[styles.exitAction]}>
          <Button
            testID="eDetail-end-presentation"
            title="Exit"
            mode="contained"
            contentStyle={styles.exitActionContent}
            labelStyle={styles.exitActionText}
          />
        </View>
      </View>
      <SwiperFlatList
        data={slides}
        renderAll={false}
        showPagination
        paginationStyleItemActive={styles.paginationItemActive}
        paginationStyleItem={styles.paginationItem}
        paginationStyle={styles.pagination}
        style={styles.swiperList}
        renderItem={({index}) => renderSlide(index)}
        ref={caraouselRef}
      />
    </View>
  );
};

export default Presentation;
