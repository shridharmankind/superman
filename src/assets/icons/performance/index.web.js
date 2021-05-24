import * as React from 'react';

function Performance(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <path fill="none" d="M0 0h32v32H0z" />
      <path
        d="M13.1 27.001a.479.479 0 010-.958h2.4v-4.792H5.436a.478.478 0 01-.478-.478V4.959h-.48a.479.479 0 010-.958h23a.479.479 0 110 .958H27v15.814a.48.48 0 01-.48.478H16.458v4.792h2.395a.479.479 0 110 .958zm-7.187-6.708h20.126V4.959H5.913zm3.914-4.044a.478.478 0 01.131-.664l2.875-1.917a.477.477 0 01.533 0l2.395 1.6 2.648-6.178a.48.48 0 01.778-.152l2.875 2.875a.48.48 0 11-.676.679l-2.376-2.376-2.6 6.057a.48.48 0 01-.3.27.488.488 0 01-.4-.059l-2.608-1.74-2.608 1.74a.49.49 0 01-.267.081.474.474 0 01-.396-.218z"
        fill="#322b7c"
      />
    </svg>
  );
}

const MemoPerformance = React.memo(Performance);
export default MemoPerformance;
