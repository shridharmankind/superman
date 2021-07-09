import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ArrowRight(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path
        fill="#322b7c"
        d="M6 3.77L7.77 2l9.9 9.9-9.9 9.9L6 20.03l8.13-8.13z"
      />
    </Svg>
  );
}

const MemoArrowRight = React.memo(ArrowRight);
export default MemoArrowRight;
