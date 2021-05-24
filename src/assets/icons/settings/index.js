import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Settings(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <Path fill="none" d="M0 0h32v32H0z" />
      <Path
        d="M10.053 23H7.559a.5.5 0 110-1h2.494a2.5 2.5 0 110 1zm1.04-.5a1.408 1.408 0 101.409-1.407 1.412 1.412 0 00-1.409 1.407zm5.462.5a.5.5 0 110-1h8.89a.5.5 0 110 1zm1.447-7.5a2.5 2.5 0 014.949-.5h2.49a.5.5 0 110 1h-2.49a2.5 2.5 0 01-4.949-.5zm1.093 0a1.407 1.407 0 101.406-1.406 1.41 1.41 0 00-1.406 1.406zM7.553 16a.5.5 0 110-1h8.894a.5.5 0 110 1zm3.5-7H7.606a.509.509 0 110-1h3.447a2.5 2.5 0 014.948.455.563.563 0 01.588-.455h8.821a.507.507 0 110 1h-8.821a.563.563 0 01-.588-.455A2.5 2.5 0 0111.053 9zm1.04-.5a1.408 1.408 0 101.409-1.41 1.41 1.41 0 00-1.409 1.41z"
        fill="#322b7c"
      />
    </Svg>
  );
}

const MemoSettings = React.memo(Settings);
export default MemoSettings;
