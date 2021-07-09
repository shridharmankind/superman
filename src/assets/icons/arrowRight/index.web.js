import * as React from 'react';

function ArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="#322b7c"
        d="M6 3.77L7.77 2l9.9 9.9-9.9 9.9L6 20.03l8.13-8.13z"
      />
    </svg>
  );
}

const MemoArrowRight = React.memo(ArrowRight);
export default MemoArrowRight;
