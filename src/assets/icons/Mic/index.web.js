import * as React from 'react';

function Mic(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="#322b7c"
        d="M12.004 14.002a2.986 2.986 0 002.988-3l.01-6a3 3 0 10-5.998 0v6a3 3 0 003 3zm-1.2-9.1a1.2 1.2 0 112.4 0l-.01 6.2a1.195 1.195 0 11-2.389 0v-6.2zm6.5 6.1a5.187 5.187 0 01-5.3 5.1 5.187 5.187 0 01-5.3-5.1h-1.7a6.981 6.981 0 006 6.719v3.281h2v-3.283a6.965 6.965 0 006-6.719z"
      />
    </svg>
  );
}

const MemoMic = React.memo(Mic);
export default MemoMic;
