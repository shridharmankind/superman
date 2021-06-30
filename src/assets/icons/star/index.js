import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Star(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path
        fill="#FFA088"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </Svg>
  );
}

const MemoStar = React.memo(Star);
export default MemoStar;
