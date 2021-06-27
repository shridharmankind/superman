import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Compliant(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 18 18" {...props}>
      <Path
        fill="#34b53a"
        d="M1.5 9A7.5 7.5 0 019 1.5a7.426 7.426 0 014.29 1.357l-1.08 1.08A6 6 0 1015 9a6.038 6.038 0 00-.157-1.335l1.207-1.208A7.5 7.5 0 111.5 9zm3.263.27L5.82 8.212l2.122 2.123 7.5-7.5 1.058 1.05-8.558 8.565z"
      />
    </Svg>
  );
}

const MemoCompliant = React.memo(Compliant);
export default MemoCompliant;
