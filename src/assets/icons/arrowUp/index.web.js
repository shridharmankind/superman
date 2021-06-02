import * as React from 'react';

function arrowUp(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="#01a685"
        d="M11 18.997V8.822l-3.588 3.581-1.41-1.41 6-6 6 6-1.41 1.41-3.59-3.581v10.175z"
      />
    </svg>
  );
}

const MemoarrowUp = React.memo(arrowUp);
export default MemoarrowUp;
