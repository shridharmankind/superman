import * as React from 'react';

function Search(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 40 40" {...props}>
      <path d="M0 0h40v40H0z" fill="none" />
      <path
        d="M26.87 24.126h-1.445l-.512-.494a11.91 11.91 0 10-1.281 1.281l.494.512v1.445L33.274 36 36 33.274zm-10.978 0a8.233 8.233 0 118.233-8.233 8.222 8.222 0 01-8.232 8.233z"
        fill="#322b7c"
      />
    </svg>
  );
}

const MemoSearch = React.memo(Search);
export default MemoSearch;
