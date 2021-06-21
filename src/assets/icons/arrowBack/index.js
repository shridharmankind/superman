import * as React from 'react';
import Svg, {Defs, Path, G} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

function arrowBack(props) {
  return (
    <Svg
      id="prefix__icon_48_Move"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}>
      <Defs />
      <Path id="prefix__Path" d="M0 0h48v48H0z" className="prefix__cls-1" />
      <G id="prefix__Shape" fill="none" stroke="none">
        <Path
          d="M20 0A20 20 0 110 20 20 20 0 0120 0z"
          transform="translate(4 4)"
        />
        <Path
          fill="#322b7c"
          d="M20 2A17.882 17.882 0 007.272 7.272C3.872 10.672 2 15.192 2 20s1.872 9.328 5.272 12.728C10.672 36.128 15.192 38 20 38s9.328-1.872 12.728-5.272C36.128 29.328 38 24.808 38 20s-1.872-9.328-5.272-12.728C29.328 3.872 24.808 2 20 2m0-2c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0z"
          transform="translate(4 4)"
        />
      </G>
      <G id="prefix__icon_24_Arrow_3" transform="translate(11 12)">
        <Path id="prefix__Path-2" d="M0 0h24v24H0z" className="prefix__cls-1" />
        <Path
          id="prefix__Path-3"
          fill="#322b7c"
          d="M11.67 1.77L9.9 0 0 9.9l9.9 9.9 1.77-1.77L3.54 9.9z"
          transform="translate(6 2)"
        />
      </G>
    </Svg>
  );
}

const MemoarrowBack = React.memo(arrowBack);
export default MemoarrowBack;
