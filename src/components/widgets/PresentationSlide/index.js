import React, {useEffect} from 'react';
import {View, Image, ScrollView} from 'react-native';
import styles from './styles';

/**
 * Presentation Slide
 *
 * @param {Object} props
 * @return {JSX} PresentationSlide
 */
const PresentationSlide = props => {
  useEffect(() => {
    props?.onLoad(props?.key);
    return () => {
      props?.onUnload(props?.key);
    };
  }, [props]);
  return (
    <ScrollView style={[styles.slide]}>
      <Image style={styles.slideImage} source={props.image} />
    </ScrollView>
  );
};

PresentationSlide.defaultProps = {
  onLoad: () => {},
  onUnload: () => {},
};

export default PresentationSlide;
