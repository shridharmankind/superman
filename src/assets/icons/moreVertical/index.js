import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function moreVertical(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path
        fill="#1c1939"
        d="M10 19a2 2 0 112 2 2 2 0 01-2-2zm0-7a2 2 0 112 2 2 2 0 01-2-2zm0-7a2 2 0 112 2 2 2 0 01-2-2z"
      />
    </Svg>
  );
}

const MemomoreVertical = React.memo(moreVertical);
export default MemomoreVertical;
