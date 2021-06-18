import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Power(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 18 18" {...props}>
      <Path fill="none" d="M0 0h18v18H0z" />
      <Path fill="#fff" d="M5.25 1.5v8.25H7.5v6.75l5.25-9h-3l2.25-6z" />
    </Svg>
  );
}

const MemoPower = React.memo(Power);
export default MemoPower;
