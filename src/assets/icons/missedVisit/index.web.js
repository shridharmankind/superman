import * as React from 'react';

function MissedVisit(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="#322b7c"
        d="M3 20v-2h18v2zM5 8.41V13H3V5h8v2H6.407l5.591 5.59 7.587-7.592 1.414 1.408-9 9z"
      />
    </svg>
  );
}

const MemoMissedVisit = React.memo(MissedVisit);
export default MemoMissedVisit;
