import * as React from 'react';

function Dropdown(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 40 40" {...props}>
      <path fill="none" d="M0 0h40v40H0z" />
      <path fill="#322b7c" d="M10.001 15.001l10 10 10-10z" />
    </svg>
  );
}

const MemoDropdown = React.memo(Dropdown);
export default MemoDropdown;
