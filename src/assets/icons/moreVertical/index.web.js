import * as React from 'react';

function moreVertical(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="#1c1939"
        d="M10 19a2 2 0 112 2 2 2 0 01-2-2zm0-7a2 2 0 112 2 2 2 0 01-2-2zm0-7a2 2 0 112 2 2 2 0 01-2-2z"
      />
    </svg>
  );
}

const MemomoreVertical = React.memo(moreVertical);
export default MemomoreVertical;
