import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

function Notification(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 40 40" {...props}>
      <Path fill="none" d="M0 0h40v40H0z" />
      <Path
        d="M20 36.666a3.387 3.387 0 003.333-3.419h-6.666A3.387 3.387 0 0020 36.666zM30 26.41v-8.547c0-5.248-2.717-9.641-7.5-10.8V5.897a2.5 2.5 0 10-5 0v1.162c-4.767 1.162-7.5 5.538-7.5 10.8v8.547l-3.333 3.427v1.709h26.667v-1.709zm-3.333 1.709H13.334V17.863c0-4.239 2.517-7.692 6.667-7.692s6.666 3.453 6.666 7.692z"
        fill="#322b7c"
      />
      <Circle
        cx={5}
        cy={5}
        r={5}
        transform="translate(23.333 3.333)"
        fill="#ff0020"
      />
    </Svg>
  );
}

const MemoNotification = React.memo(Notification);
export default MemoNotification;
