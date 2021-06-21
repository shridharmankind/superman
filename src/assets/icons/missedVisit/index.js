import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function MissedVisit(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path
        fill="#322b7c"
        d="M3 20v-2h18v2zM5 8.41V13H3V5h8v2H6.407l5.591 5.59 7.587-7.592 1.414 1.408-9 9z"
      />
    </Svg>
  );
}

const MemoMissedVisit = React.memo(MissedVisit);
export default MemoMissedVisit;
