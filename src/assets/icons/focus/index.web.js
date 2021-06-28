import * as React from "react";

function focus(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 15 14" {...props}>
      <defs>
        <clipPath id="prefix__a">
          <path d="M3.164 2.852h8.809v8.296H3.164zm0 0" />
        </clipPath>
        <clipPath id="prefix__b">
          <path d="M3.164 2.852h8.809v8.296H3.164zm0 0" />
        </clipPath>
        <clipPath id="prefix__c">
          <path d="M3.164 2.852h8.809v8.296H3.164zm0 0" />
        </clipPath>
        <clipPath id="prefix__d">
          <path d="M4 4h7.973v7.148H4zm0 0" />
        </clipPath>
      </defs>
      <path
        d="M.137 6.934C.137 3.105 3.434 0 7.5 0c4.066 0 7.363 3.105 7.363 6.934 0 3.832-3.297 6.937-7.363 6.937-4.066 0-7.363-3.105-7.363-6.937zm0 0"
        fillRule="evenodd"
        fill="#ffebe8"
      />
      <g clipPath="url(#prefix__a)">
        <path
          d="M126.099 460.885a31.06 31.06 0 01-17.088 5.123c-17.116 0-30.997-13.922-30.997-31.008s13.88-31.008 30.997-31.008c17.088 0 30.997 13.922 30.997 31.008 0 6.388-1.902 12.385-5.308 17.297"
          transform="matrix(.13761 0 0 .12963 -7.431 -49.389)"
          fill="#ffebe8"
          strokeWidth={1.333}
          stroke="#051c2c"
          strokeMiterlimit={10}
        />
      </g>
      <path
        d="M9.371 9.566a3.374 3.374 0 01-1.8.504C5.765 10.07 4.308 8.7 4.308 7c0-1.7 1.457-3.07 3.261-3.07 1.801 0 3.262 1.37 3.262 3.07 0 .637-.207 1.23-.566 1.723"
        fill="#ffebe8"
      />
      <g clipPath="url(#prefix__b)">
        <path
          d="M122.097 454.798c-3.804 2.501-8.204 3.887-13.086 3.887-13.114 0-23.702-10.577-23.702-23.685 0-13.108 10.588-23.685 23.702-23.685 13.086 0 23.702 10.577 23.702 23.685 0 4.912-1.505 9.492-4.116 13.29"
          transform="matrix(.13761 0 0 .12963 -7.431 -49.389)"
          fill="none"
          strokeWidth={1.333}
          stroke="#051c2c"
          strokeMiterlimit={10}
        />
      </g>
      <path
        d="M8.781 8.723c-.344.222-.758.34-1.21.34-1.212 0-2.192-.922-2.192-2.063 0-1.14.98-2.063 2.191-2.063 1.211 0 2.188.922 2.188 2.063 0 .43-.137.828-.371 1.152"
        fill="#ffebe8"
      />
      <g clipPath="url(#prefix__c)">
        <path
          d="M117.81 448.29c-2.498 1.717-5.506 2.62-8.8 2.62-8.799 0-15.923-7.11-15.923-15.91s7.124-15.91 15.924-15.91 15.896 7.11 15.896 15.91c0 3.315-.994 6.388-2.697 8.89"
          transform="matrix(.13761 0 0 .12963 -7.431 -49.389)"
          fill="none"
          strokeWidth={1.333}
          stroke="#051c2c"
          strokeMiterlimit={10}
        />
      </g>
      <g clipPath="url(#prefix__d)">
        <path
          d="M109.01 435l22.283 22.51"
          transform="matrix(.13761 0 0 .12963 -7.431 -49.389)"
          fill="none"
          strokeWidth={1.333}
          stroke="#051c2c"
          strokeMiterlimit={10}
        />
      </g>
      <path
        d="M109.01 444.01V435h9"
        transform="matrix(.13761 0 0 .12963 -7.431 -49.389)"
        fill="#ffebe8"
        strokeWidth={1.333}
        stroke="#051c2c"
        strokeMiterlimit={10}
      />
    </svg>
  );
}

const Memofocus = React.memo(focus);
export default Memofocus;
