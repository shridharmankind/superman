import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function arrowDown(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path
        fill="#ff0000"
        d="M-21118-5314v10.175l-3.588-3.581-1.41 1.41 6 6 6-6-1.41-1.41-3.59 3.581V-5314z"
        transform="translate(21129 5318.997)"
      />
    </Svg>
  );
}

const MemoarrowDown = React.memo(arrowDown);
export default MemoarrowDown;
