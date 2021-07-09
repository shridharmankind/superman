import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

function Check(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path fill="none" d="M0 0h24v24H0z" />
      <G fill={props.color}>
        <Path d="M9.008 19.179l-.07-.072-5.589-5.632-.07-.07.07-.071 1.397-1.408.071-.072.071.072 4.12 4.153 10.507-10.59.07-.072.072.072 1.397 1.408.07.07-.07.07-11.975 12.07-.07.072z" />
        <Path d="M9.008 19.037l11.975-12.07-1.397-1.408L9.008 16.221l-4.191-4.225-1.397 1.408 5.588 5.633m0 .284l-.142-.143-5.588-5.633-.14-.14.14-.142 1.397-1.408.142-.143.142.143 4.05 4.082L19.443 5.418l.142-.143.142.143 1.397 1.408.14.141-.14.141L9.15 19.178l-.142.143z" />
      </G>
    </Svg>
  );
}

const MemoCheck = React.memo(Check);
export default MemoCheck;
