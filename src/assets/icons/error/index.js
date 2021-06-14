import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Error(props) {
  return (
    <Svg
      data-name="icon/18/Error"
      width="1em"
      height="1em"
      viewBox="0 0 18 18"
      {...props}>
      <Path
        data-name="Combined Shape"
        d="M7.5 14.25a1.5 1.5 0 111.5 1.5 1.5 1.5 0 01-1.5-1.5zm0-3v-9h3v9z"
        fill="#ff0e02"
      />
    </Svg>
  );
}

const MemoError = React.memo(Error);
export default MemoError;
