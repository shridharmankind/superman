import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Calendar(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <Path fill="none" d="M0 0h32v32H0z" />
      <Path
        d="M4.5 28.001a.5.5 0 01-.5-.5v-22a.5.5 0 01.5-.5H8v-1.5a.5.5 0 111 0v1.5h15v-1.5a.5.5 0 011 0v1.5h3.5a.5.5 0 01.5.5v22a.5.5 0 01-.5.5zm.5-1h23v-17H5zm0-18h23v-3H5zm18.5 14a.5.5 0 110-1h1a.5.5 0 110 1zm-5 0a.5.5 0 010-1h1a.5.5 0 010 1zm-5 0a.5.5 0 110-1h1a.5.5 0 010 1zm-5 0a.5.5 0 110-1h1a.5.5 0 010 1zm15-4a.5.5 0 110-1h1a.5.5 0 110 1zm-5 0a.5.5 0 010-1h1a.5.5 0 010 1zm-5 0a.5.5 0 110-1h1a.5.5 0 010 1zm-5 0a.5.5 0 110-1h1a.5.5 0 010 1zm15-4a.5.5 0 110-1h1a.5.5 0 110 1zm-5 0a.5.5 0 010-1h1a.5.5 0 010 1zm-5 0a.5.5 0 110-1h1a.5.5 0 010 1zm-5 0a.5.5 0 110-1h1a.5.5 0 010 1z"
        fill="#322b7c"
      />
    </Svg>
  );
}

const MemoCalendar = React.memo(Calendar);
export default MemoCalendar;
