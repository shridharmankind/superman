import * as React from 'react';

function Location(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="#1c1939"
        d="M6.079 13.412l.034.049c.041.062.084.122.128.188l4.89 7.025a.764.764 0 001.253 0l4.878-7.019c.047-.066.092-.129.137-.188l.03-.045a6.755 6.755 0 10-11.346 0zm5.678-6.468a2.814 2.814 0 11-2.815 2.817 2.814 2.814 0 012.814-2.817z"
      />
    </svg>
  );
}

const MemoLocation = React.memo(Location);
export default MemoLocation;
