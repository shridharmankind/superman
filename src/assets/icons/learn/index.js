import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Learn(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <Path fill="none" d="M0 0h32v32H0z" />
      <Path
        d="M15.5 27.999a.5.5 0 010-1h2a.5.5 0 110 1zm-1-3a2.5 2.5 0 01-2.5-2.5v-3.8a8.49 8.49 0 119 0v3.8a2.5 2.5 0 01-2.5 2.5zM9 11.499a7.519 7.519 0 003.754 6.489.512.512 0 01.248.432v4.08a1.5 1.5 0 001.5 1.5h4a1.5 1.5 0 001.5-1.5v-4.08a.5.5 0 01.249-.432A7.5 7.5 0 109 11.499zm3.055 1.226a.5.5 0 01.224-.671l2-1a.513.513 0 01.447 0l1.775.888 1.776-.888a.511.511 0 01.446 0l2 1a.5.5 0 01.227.671.5.5 0 01-.671.224l-1.778-.888-1.776.888a.515.515 0 01-.447 0l-1.775-.888-1.776.888a.5.5 0 01-.671-.224z"
        fill="#322b7c"
      />
    </Svg>
  );
}

const MemoLearn = React.memo(Learn);
export default MemoLearn;
