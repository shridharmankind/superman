import * as React from 'react';

function error(props) {
  return (
    <svg
      data-name="icon/18/Error"
      width="1em"
      height="1em"
      viewBox="0 0 18 18"
      {...props}>
      <path
        data-name="Combined Shape"
        d="M7.5 14.25a1.5 1.5 0 111.5 1.5 1.5 1.5 0 01-1.5-1.5zm0-3v-9h3v9z"
        fill="#ff0e02"
      />
    </svg>
  );
}

const Memoerror = React.memo(error);
export default Memoerror;
