import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Dropdown(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 40 40" {...props}>
      <Path fill="none" d="M0 0h40v40H0z" />
      <Path fill="#322b7c" d="M10.001 15.001l10 10 10-10z" />
    </Svg>
  );
}

const MemoDropdown = React.memo(Dropdown);
export default MemoDropdown;
