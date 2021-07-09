import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ArrowLeft(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path
        fill="#322b7c"
        d="M17.67 3.77L15.9 2 6 11.9l9.9 9.9 1.77-1.77-8.13-8.13z"
      />
    </Svg>
  );
}

const MemoArrowLeft = React.memo(ArrowLeft);
export default MemoArrowLeft;
