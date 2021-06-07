import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function arrowUp(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path
        fill="#01a685"
        d="M11 18.997V8.822l-3.588 3.581-1.41-1.41 6-6 6 6-1.41 1.41-3.59-3.581v10.175z"
      />
    </Svg>
  );
}

const MemoarrowUp = React.memo(arrowUp);
export default MemoarrowUp;
