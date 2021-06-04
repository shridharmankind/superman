import * as React from 'react';

function Close(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 64 64" fill="#1c1939" {...props}>
      <path fill="none" d="M0 0h64v64H0z" />
      <path d="M47.5 16.5a2.187 2.187 0 01-.122 2.92l-.191.21L34.818 32l12.366 12.366A2.247 2.247 0 0147.5 47.5a2.187 2.187 0 01-2.92-.122l-.21-.191L32 34.818 19.634 47.184a2.247 2.247 0 01-3.134.316 2.187 2.187 0 01.122-2.92l.191-.21L29.182 32 16.816 19.634A2.247 2.247 0 0116.5 16.5a2.187 2.187 0 012.92.122l.21.191L32 29.182l12.366-12.366A2.247 2.247 0 0147.5 16.5z" />
    </svg>
  );
}

const MemoClose = React.memo(Close);
export default MemoClose;
