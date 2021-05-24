import * as React from 'react';

function Content(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <path fill="none" d="M0 0h32v32H0z" />
      <path
        d="M7.5 24A1.5 1.5 0 016 22.5v-3A1.5 1.5 0 017.5 18h6a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5zM7 19.5v3a.5.5 0 00.5.5h6a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-6a.5.5 0 00-.5.5zM17.385 23a.517.517 0 010-1h9.229a.517.517 0 010 1zm0-3a.517.517 0 010-1h9.229a.517.517 0 010 1zM7.5 15A1.5 1.5 0 016 13.5v-3A1.5 1.5 0 017.5 9h6a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5zM7 10.5v3a.5.5 0 00.5.5h6a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-6a.5.5 0 00-.5.5zM17.385 14a.517.517 0 010-1h9.229a.517.517 0 010 1zm0-3a.517.517 0 010-1h9.229a.517.517 0 010 1z"
        fill="#322b7c"
      />
    </svg>
  );
}

const MemoContent = React.memo(Content);
export default MemoContent;
