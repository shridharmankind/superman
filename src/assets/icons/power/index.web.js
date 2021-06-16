import * as React from 'react';

function Power(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 18 18" {...props}>
      <path fill="none" d="M0 0h18v18H0z" />
      <path fill="#fff" d="M5.25 1.5v8.25H7.5v6.75l5.25-9h-3l2.25-6z" />
    </svg>
  );
}

const MemoPower = React.memo(Power);
export default MemoPower;
