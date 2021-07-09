import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function PerformanceInside(props) {
  return (
    <Svg width="48" height="48" viewBox="0 0 48 48">
      <Path fill="#F08395" d="M1274.7-9543a.667.667,0,0,1-.667-.667V-9563a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v19.33a.667.667,0,0,1-.667.667Zm.667-20v18.663h5.333V-9563a.67.67,0,0,0-.667-.668h-4A.67.67,0,0,0,1275.366-9563Zm-11.333,20a.667.667,0,0,1-.667-.667v-14a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v14a.667.667,0,0,1-.667.667Zm.667-14.665v13.331h5.333v-13.331a.67.67,0,0,0-.667-.668h-4A.67.67,0,0,0,1264.7-9557.668ZM1253.366-9543a.667.667,0,0,1-.667-.667v-18a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v18a.667.667,0,0,1-.667.667Zm.667-18.664v17.33h5.333v-17.33a.666.666,0,0,0-.667-.667h-4A.667.667,0,0,0,1254.033-9561.667ZM1242.7-9543a.667.667,0,0,1-.667-.667v-8.666a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v8.666a.667.667,0,0,1-.667.667Zm.667-9.333v8h5.333v-8a.67.67,0,0,0-.667-.667h-4A.67.67,0,0,0,1243.366-9552.336Zm.092-10.932a4,4,0,0,1-.691-5.369,4,4,0,0,1,5.294-1.139l5.589-6.642a4,4,0,0,1,.087-5.274,4,4,0,0,1,5.243-.6,4,4,0,0,1,1.272,5.12l4.363,3.274a3.982,3.982,0,0,1,2.92-1.1,3.981,3.981,0,0,1,2.816,1.345l3.984-2.492a3.993,3.993,0,0,1,.372-3.748,3.994,3.994,0,0,1,3.325-1.773,4,4,0,0,1,3.883,3.037,3.994,3.994,0,0,1-2.019,4.5,3.994,3.994,0,0,1-4.85-.882l-3.984,2.49a4,4,0,0,1-1.353,4.768,4,4,0,0,1-4.952-.209,4,4,0,0,1-.944-4.864l-4.363-3.274a3.972,3.972,0,0,1-4.78.546l-5.589,6.641a4,4,0,0,1-.214,5.411,3.984,3.984,0,0,1-2.836,1.177A3.985,3.985,0,0,1,1243.458-9563.268Zm-.092-3.066a2.665,2.665,0,0,0,2.667,2.666,2.668,2.668,0,0,0,2.667-2.666,2.666,2.666,0,0,0-2.667-2.666A2.666,2.666,0,0,0,1243.366-9566.334ZM1264.7-9571a2.666,2.666,0,0,0,2.667,2.664,2.668,2.668,0,0,0,2.667-2.664,2.667,2.667,0,0,0-2.667-2.668A2.667,2.667,0,0,0,1264.7-9571Zm10.666-6.668a2.667,2.667,0,0,0,2.667,2.668,2.671,2.671,0,0,0,2.667-2.668,2.667,2.667,0,0,0-2.667-2.666A2.667,2.667,0,0,0,1275.366-9577.666ZM1254.033-9579a2.666,2.666,0,0,0,2.667,2.666,2.669,2.669,0,0,0,2.667-2.666,2.666,2.666,0,0,0-2.667-2.666A2.666,2.666,0,0,0,1254.033-9579Z" transform="translate(-1238.033 9587.002)" />
    </Svg>

  );
}

const MemoPerformance = React.memo(PerformanceInside);
export default MemoPerformance;
