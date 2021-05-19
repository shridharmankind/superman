import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Directory(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <Path fill="none" d="M0 0h32v32H0z" />
      <Path
        d="M8.5 28.001a.5.5 0 01-.5-.5v-3.5H4.5a.5.5 0 110-1H8v-3H4.5a.5.5 0 110-1H8v-3H4.5a.5.5 0 110-1H8v-3H4.5a.5.5 0 110-1H8v-3H4.5a.5.5 0 110-1H8v-3.5a.5.5 0 01.5-.5h20a.5.5 0 01.5.5v24a.5.5 0 01-.5.5zm.5-1h19v-23H9zm2.5-3a.5.5 0 01-.5-.5v-4a7.5 7.5 0 012.513-5.589.488.488 0 01.335-.13h.037a.507.507 0 01.348.183 5.5 5.5 0 008.536 0 .52.52 0 01.347-.183h.037a.479.479 0 01.335.13 7.5 7.5 0 012.513 5.589v4a.5.5 0 01-.5.5zm2.319-9a6.451 6.451 0 00-1.817 4.494v3.5h13v-3.5a6.446 6.446 0 00-1.817-4.494 6.493 6.493 0 01-9.364 0zm1.183-4.5a3.5 3.5 0 113.5 3.5 3.506 3.506 0 01-3.502-3.5zm1 0a2.5 2.5 0 102.5-2.5 2.505 2.505 0 00-2.502 2.5z"
        fill="#322b7c"
      />
    </Svg>
  );
}

const MemoDirectory = React.memo(Directory);
export default MemoDirectory;
