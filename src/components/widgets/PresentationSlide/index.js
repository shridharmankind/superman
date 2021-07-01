import React, {useEffect} from 'react';
import {View} from 'react-native';

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
  return <View />;
};

PresentationSlide.defaultProps = {
  onLoad: () => {},
  onUnload: () => {},
};

export default PresentationSlide;
