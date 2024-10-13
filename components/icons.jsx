export function Favicon(props) {
  return (
    <svg
      {...props}
      width="256"
      height="256"
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_1563_4978)">
        <rect
          x="0.0192871"
          y="0.0195312"
          width="256"
          height="256"
          rx="80"
          fill="currentColor"
        />
      </g>
      <g filter="url(#filter1_i_1563_4978)">
        <rect
          x="56.8735"
          y="57.3047"
          width="111.429"
          height="111.429"
          rx="30"
          fill="white"
          fillOpacity="0.5"
        />
        <g filter="url(#filter2_b_1563_4978)">
          <rect
            x="86.8735"
            y="87.3047"
            width="111.429"
            height="111.429"
            rx="30"
            fill="white"
            fillOpacity="0.5"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_b_1563_4978"
          x="-4.98071"
          y="-4.98047"
          width="266"
          height="266"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2.5" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_1563_4978"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1563_4978"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_i_1563_4978"
          x="56.8735"
          y="57.3047"
          width="141.428"
          height="141.429"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_1563_4978"
          />
        </filter>
        <filter
          id="filter2_b_1563_4978"
          x="81.8735"
          y="82.3047"
          width="121.428"
          height="121.429"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2.5" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_1563_4978"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1563_4978"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function MarkdownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="208px"
      height="128px"
      viewBox="0 0 208 128"
      enableBackground="new 0 0 208 128"
      fill="currentColor"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        d="M15,5h178c5.523,0,10,4.477,10,10v98c0,5.523-4.477,10-10,10H15  c-5.523,0-10-4.477-10-10V15C5,9.477,9.477,5,15,5z"
      />
      <path
        fill="currentColor"
        d="M30,98V30h20l20,25l20-25h20v68H90V59L70,84L50,59v39H30z M155,98l-30-33h20V30h20v35h20L155,98z"
      />
    </svg>
  );
}
