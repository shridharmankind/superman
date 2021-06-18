import * as React from 'react';

function Refresh(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <path fill="none" d="M0 0h32v32H0z" />
      <path
        fill="#322b7c"
        d="M16 5.333v-4l-5.334 5.333 5.333 5.333v-4a8.006 8.006 0 018 8 7.827 7.827 0 01-.933 3.733l1.947 1.947A10.648 10.648 0 0016 5.333zM16 24a8.006 8.006 0 01-8-8 7.827 7.827 0 01.933-3.734L6.986 10.32a10.648 10.648 0 009.013 16.347v4l5.334-5.334L16 20z"
      />
    </svg>
  );
}

const MemoRefresh = React.memo(Refresh);
export default MemoRefresh;
