import * as React from 'react';

function Logout(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 21.7 24.75"
      overflow="hidden"
      {...props}>
      <path
        d="M13.775 14.531c-.948 0-.73 6.443-.73 6.984 0 .7-.423 1.266-.939 1.266h-9.7c-.517 0-.939-.57-.939-1.266V3.234c0-.7.423-1.266.939-1.266h9.7c.517 0 .939.57.939 1.266 0 .541-.081 5.984.73 5.984.811 0 .73-5.443.73-5.984 0-1.786-1.075-3.234-2.4-3.234h-9.7C1.08 0 .005 1.448.005 3.234v18.282c0 1.786 1.075 3.234 2.4 3.234h9.7c1.325 0 2.4-1.448 2.4-3.234 0-.541.22-6.985-.73-6.985z"
        fill="#322b7c"
      />
      <path
        d="M16.952 5.491a.648.648 0 00-.517-.288.637.637 0 00-.517.288c-.287.42-.287.972 0 1.392l3.4 4.514H5.948c-.4 0-.73.443-.73.984 0 .541.329.984.73.984h13.388l-3.318 4.51c-.282.421-.282.97 0 1.392l.005.007c.12.165.308.266.511.274a.63.63 0 00.517-.288l4.31-5.794a1.723 1.723 0 000-2.053z"
        fill="#322b7c"
      />
    </svg>
  );
}

const MemoLogout = React.memo(Logout);
export default MemoLogout;
