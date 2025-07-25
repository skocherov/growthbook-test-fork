import React from "react";
import { PiInfo } from "react-icons/pi";

export function GBHome({ className = "" }): React.ReactElement {
  return (
    <svg
      fill="none"
      height="28"
      viewBox="0 0 28 28"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="m15.9086 20.2328v-3.971c0-.1756-.067-.3439-.1864-.468-.1193-.1241-.2812-.1939-.4499-.1939h-2.5455c-.1688 0-.3306.0698-.45.1939-.1193.1241-.1864.2924-.1864.468v3.971c0 .1755-.067.3438-.1863.4679s-.2812.1939-.4499.1939l-3.81776.0005c-.08357 0-.16633-.0171-.24355-.0503-.07721-.0333-.14738-.082-.20648-.1435-.0591-.0614-.10598-.1344-.13796-.2147-.03199-.0803-.04845-.1664-.04845-.2533v-7.649c0-.0922.01853-.1834.05439-.2677.03586-.0844.08827-.16.15387-.222l6.36324-6.01717c.1171-.11077.2697-.17215.428-.17216.1584 0 .311.06137.4281.17213l6.3641 6.0172c.0656.062.118.1376.1539.222.0359.0843.0544.1755.0544.2677v7.649c0 .0869-.0165.173-.0484.2533-.032.0803-.0789.1533-.138.2147-.0591.0615-.1293.1102-.2065.1435-.0772.0332-.16.0503-.2435.0503l-3.8187-.0005c-.1688 0-.3306-.0698-.4499-.1939s-.1864-.2924-.1864-.4679z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function GBInfo(): React.ReactElement {
  return <PiInfo style={{ color: "var(--violet-11)" }} />;
}

export function GBLibrary({ className = "" }): React.ReactElement {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.781 7.063a.469.469 0 0 1-.469.468h-3.75a.469.469 0 0 1 0-.937h3.75a.47.47 0 0 1 .47.468Zm-.469 1.406h-3.75a.469.469 0 0 0 0 .937h3.75a.47.47 0 0 0 0-.937Zm2.813-5.156v9.374a.938.938 0 0 1-.938.938H2.813a.938.938 0 0 1-.938-.938V3.313a.937.937 0 0 1 .938-.938h9.374a.937.937 0 0 1 .938.938ZM2.812 12.687H4.22V3.313H2.812v9.374Zm9.376 0V3.313H5.155v9.374h7.032Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GBIdea({ className = "" }): React.ReactElement {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.875 21.9883H17.125"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 19.4902V15.1182"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 12.6201L14 15.1184L16.5 12.6201"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1487 16.9152C9.40556 16.3352 8.80363 15.5943 8.38818 14.7484C7.97273 13.9024 7.75457 12.9734 7.7501 12.0311C7.73138 8.64566 10.4625 5.83147 13.8493 5.75181C15.1617 5.72023 16.4507 6.10241 17.5335 6.84413C18.6163 7.58584 19.438 8.64945 19.8819 9.88406C20.3257 11.1187 20.3694 12.4616 20.0065 13.7224C19.6437 14.9832 18.8928 16.0978 17.8604 16.9081C17.633 17.0842 17.4486 17.3096 17.3212 17.5673C17.1938 17.8251 17.1267 18.1084 17.125 18.3958L17.125 18.8662C17.125 19.0318 17.0592 19.1907 16.9419 19.3078C16.8247 19.4249 16.6658 19.4907 16.5 19.4907H11.5C11.3342 19.4907 11.1753 19.4249 11.058 19.3078C10.9408 19.1907 10.875 19.0318 10.875 18.8662L10.875 18.3953C10.8743 18.1097 10.8085 17.828 10.6827 17.5716C10.5568 17.3151 10.3742 17.0907 10.1487 16.9152V16.9152Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GBExperiment({ className = "" }): React.ReactElement {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.1246 6.34473V11.1683C12.1246 11.2815 12.0939 11.3926 12.0356 11.4897L7.06758 19.7641C7.01068 19.8588 6.97996 19.967 6.97857 20.0775C6.97717 20.1881 7.00515 20.297 7.05964 20.3931C7.11413 20.4893 7.19319 20.5693 7.28874 20.625C7.38429 20.6807 7.49291 20.71 7.60352 20.71H20.3958C20.5064 20.71 20.615 20.6807 20.7106 20.625C20.8061 20.5693 20.8852 20.4893 20.9397 20.3931C20.9941 20.297 21.0221 20.1881 21.0207 20.0775C21.0193 19.967 20.9886 19.8588 20.9317 19.7641L15.9637 11.4897C15.9054 11.3926 15.8746 11.2815 15.8746 11.1683V6.34473"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.875 6.34473H17.125"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.89258 16.7253C9.81631 16.0525 11.402 15.6639 14.0006 16.9623C16.79 18.356 18.4123 17.8059 19.3016 17.0471"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GBBandit({ className = "" }): React.ReactElement {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M 21.5565 11.5689 C 21.5565 11.4958 21.8435 10.8707 21.8946 10.8403 C 21.9374 10.8334 22.0133 10.4746 22.0588 10.4718 C 22.3528 9.6783 22.7033 8.3742 22.557 7.4345 C 21.907 4.5944 17.8691 5.4873 16.7389 7.5228 C 16.6809 7.6373 16.6161 7.6608 16.5015 7.5959 C 15.5907 7.1419 14.2632 7.0232 13.0805 7.2233 C 12.0469 7.4427 12.4609 7.7933 11.7185 7.066 C 9.941 4.8456 5.7555 4.7062 5.9694 8.2666 C 5.9708 9.5983 6.2909 10.7561 6.9851 11.6297 C 7.0499 11.6945 7.0472 11.7097 6.8857 11.9443 C 6.5241 12.4563 5.5181 13.8156 5.1676 14.311 C 4.214 15.4398 4.7343 15.4247 5.5554 16.1436 C 6.8981 17.2807 11.4521 20.8536 14.7462 20.7335 C 17.738 20.6245 21.3619 17.7734 22.2575 16.8764 C 23.1545 15.9794 23.719 15.0465 23.7341 14.9541 C 23.1421 13.9218 22.0271 12.5184 21.5565 11.5676 V 11.5689 Z M 22.0464 15.1169 C 20.7685 14.5939 19.3347 13.7562 18.0085 13.2953 C 17.048 12.9489 16.0572 12.7392 14.8828 12.7281 V 15.2936 C 15.0843 15.5033 15.2996 15.6813 15.5963 15.858 C 16.4588 16.3561 17.5752 16.9937 18.2652 18.5241 C 17.3199 18.9878 16.4463 19.486 15.3161 19.6323 C 15.0732 19.6474 15.1629 19.584 15.2388 19.5426 C 15.6625 19.3149 15.806 18.6359 15.795 18.6249 C 15.5562 18.3861 15.1809 17.9459 14.4481 17.9459 C 13.7153 17.9459 13.0957 18.3516 13.0957 18.6138 C 13.0957 18.9188 13.4241 19.4087 13.6353 19.537 C 13.7319 19.595 13.7981 19.6336 13.707 19.6143 C 13.638 19.6005 13.7236 19.6143 13.271 19.5467 C 12.3063 19.4266 11.2769 18.8857 10.4323 18.48 C 10.3937 18.4689 10.4309 18.451 10.4875 18.3006 C 11.1251 16.4831 13.4448 15.7862 13.9154 15.2232 C 13.9582 14.4048 13.9665 13.4637 13.9416 12.6619 C 12.6858 12.6743 11.4356 12.9075 10.2984 13.3712 C 9.3159 13.7342 7.9787 14.38 6.7008 15.0162 C 6.342 15.2328 6.6815 14.8809 6.7118 14.794 C 7.112 14.1206 7.704 13.0966 8.1111 12.4466 C 8.325 12.1692 8.6079 11.511 8.728 11.3109 C 8.7735 11.2722 8.7515 11.2419 8.5941 11.1384 C 8.1084 10.7216 7.8627 10.378 7.6475 9.7998 C 7.0913 8.2266 7.0375 6.3622 9.2082 6.9653 C 10.0473 7.2192 10.9539 8.2155 11.5211 9.0173 C 11.6329 9.1898 11.6329 9.194 11.7902 9.1636 C 13.7429 8.3356 15.1602 8.4363 16.979 9.2823 C 17.0977 9.2823 17.2633 9.1291 17.4551 8.8338 C 18.4888 6.8204 22.2079 5.8916 21.0142 9.3016 C 20.6402 10.6209 20.4649 10.9507 19.837 11.3343 C 20.2193 12.1389 21.5068 14.1896 22.0878 15.0424 C 22.1264 15.1349 22.1264 15.1376 22.045 15.1155 L 22.0464 15.1169 Z M 17.2854 14.794 C 16.6713 15.564 15.2646 14.6132 15.9022 13.8321 C 16.5632 12.9241 17.8802 14.0295 17.2854 14.794 Z M 11.5101 13.6403 C 11.7309 13.4913 11.7737 13.4775 12.1049 13.4913 C 12.3974 13.5009 12.472 13.4858 12.6113 13.6403 C 12.977 14.0281 12.8639 14.8299 12.3546 15.0162 C 11.1656 15.4512 10.8573 14.1054 11.5115 13.6403 H 11.5101 Z" />
    </svg>
  );
}

export function GBDatabase({ className = "" }): React.ReactElement {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 12 14"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.3,1.7C3.2,1.3,4.5,1,6,1s2.8,0.3,3.7,0.7C10.6,2.1,11,2.6,11,3c0,0.4-0.4,0.9-1.3,1.3C8.8,4.7,7.5,5,6,5S3.2,4.7,2.3,4.3
	C1.4,3.9,1,3.4,1,3C1,2.6,1.4,2.1,2.3,1.7z M11,4.7V7c0,0.4-0.4,0.9-1.3,1.3C8.8,8.7,7.5,9,6,9S3.2,8.7,2.3,8.3C1.4,7.9,1,7.4,1,7
	V4.7c0.3,0.2,0.6,0.4,0.9,0.5C3,5.7,4.4,6,6,6s3-0.3,4.1-0.8C10.4,5.1,10.7,4.9,11,4.7z M12,3c0-1-0.9-1.8-1.9-2.2C9,0.3,7.6,0,6,0
	S3,0.3,1.9,0.8C0.9,1.2,0,2,0,3v8c0,1,0.9,1.8,1.9,2.2C3,13.7,4.4,14,6,14s3-0.3,4.1-0.8c1-0.5,1.9-1.2,1.9-2.2V3z M11,8.7V11
	c0,0.4-0.4,0.9-1.3,1.3C8.8,12.7,7.5,13,6,13s-2.8-0.3-3.7-0.7C1.4,11.9,1,11.4,1,11V8.7c0.3,0.2,0.6,0.4,0.9,0.5C3,9.7,4.4,10,6,10
	s3-0.3,4.1-0.8C10.4,9.1,10.7,8.9,11,8.7z"
      />
    </svg>
  );
}

export function GBPresentations({ className = "" }): React.ReactElement {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20.875 7.56348H7.125C6.77982 7.56348 6.5 7.84311 6.5 8.18805V17.5567C6.5 17.9016 6.77982 18.1812 7.125 18.1812H20.875C21.2202 18.1812 21.5 17.9016 21.5 17.5567V8.18805C21.5 7.84311 21.2202 7.56348 20.875 7.56348Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 18.1816L19 21.3045"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 18.1816L9 21.3045"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 7.56418V5.69043"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GBSettings({ className = "" }): React.ReactElement {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14 17.645C16.2091 17.645 18 15.8553 18 13.6477C18 11.44 16.2091 9.65039 14 9.65039C11.7909 9.65039 10 11.44 10 13.6477C10 15.8553 11.7909 17.645 14 17.645Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0052 9.58722C20.21 9.88512 20.3918 10.1978 20.5492 10.5227L22.7942 11.7578C23.0677 13.0024 23.0686 14.2907 22.797 15.5357L20.5507 16.7715C20.3928 17.0961 20.2104 17.4086 20.0052 17.7061L20.0485 20.2505C19.0976 21.1075 17.9723 21.7524 16.7485 22.1418L14.5455 20.8318C14.1828 20.8586 13.8186 20.8583 13.456 20.8309L11.2542 22.1402C10.0299 21.7526 8.90367 21.1093 7.95153 20.2536L7.99477 17.7079C7.79004 17.41 7.60819 17.0973 7.45075 16.7724L5.20578 15.5373C4.93234 14.2927 4.9314 13.0044 5.20303 11.7594L7.44925 10.5236C7.60721 10.199 7.78955 9.88654 7.99475 9.58896L7.95154 7.04463C8.90244 6.18764 10.0277 5.5427 11.2515 5.15332L13.4545 6.4633C13.8172 6.43654 14.1814 6.43683 14.544 6.46415L16.7458 5.1549C17.9701 5.54252 19.0963 6.18585 20.0485 7.04148L20.0052 9.58722Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GBDimensions({ className = "" }): React.ReactElement {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22.25 6H5.75C5.33579 6 5 6.42138 5 6.94118V21.0588C5 21.5786 5.33579 22 5.75 22H22.25C22.6642 22 23 21.5786 23 21.0588V6.94118C23 6.42138 22.6642 6 22.25 6Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14L20 14"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8008 9L15.2008 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8008 19L15.2008 19"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 15.2002L20 12.8002"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 15.2002L8 12.8002"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 9L14 19"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GBSegments({ className = "" }): React.ReactElement {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M14 6V14M14 14L19.5 19.5M14 14H6"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function GBMetrics({ className = "" }): React.ReactElement {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21.5 19.9984H6.5V7.50684"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5 11.2549L16.5 15.6269L11.5 11.8795L6.5 16.2515"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GBReports({ className = "" }): React.ReactElement {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 12H15"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15H17"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18H17"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 23H8V7H17L21 11.0001V23Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GBArrowLeft({ className = "" }): React.ReactElement {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 5H2M2 5L6.14815 1M2 5L6.14815 9"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
export function GBArrowRight({ className = "" }): React.ReactElement {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 5H14M14 5L9.85185 1M14 5L9.85185 9"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function GBCircleArrowLeft({ className = "" }): React.ReactElement {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        d="M9.59961 4.80029L6.28109 8.00029L9.59961 11.2003"
        stroke="white"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function GBEdit({ className = "" }): React.ReactElement {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.8169 1L12.9988 3.18182L7.54421 8.63636L4.27148 9.72727L5.36239 6.45455L10.8169 1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9091 9.72767V11.9095C11.9091 12.1988 11.7942 12.4763 11.5896 12.6809C11.385 12.8855 11.1075 13.0004 10.8182 13.0004H2.09091C1.80158 13.0004 1.52411 12.8855 1.31952 12.6809C1.11493 12.4763 1 12.1988 1 11.9095V3.18222C1 2.89289 1.11493 2.61541 1.31952 2.41083C1.52411 2.20624 1.80158 2.09131 2.09091 2.09131H4.27273"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function GBAddCircle({ className = "" }): React.ReactElement {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM7.20078 4H8.80078V7.20015H12V8.80015H8.80078V12H7.20078V8.80015H4V7.20015L7.20078 7.20015V4Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface GBPremiumBadge extends React.ReactElement {
  shouldDisplay?: boolean;
  size?: "small" | "large";
}
export function GBPremiumBadge({
  className = "",
  shouldDisplay = true,
  prependsText = false,
  size = "large",
}) {
  if (!shouldDisplay) return null;
  return (
    <svg
      width={size === "large" ? "18" : "14"}
      height={size === "large" ? "18" : "14"}
      viewBox="0 0 370.04 370.04"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={
        prependsText ? { marginTop: -2, marginRight: 2 } : { marginTop: -2 }
      }
      className={className ?? "text-premium"}
    >
      <path
        d="M341.668,314.412c0,0-41.071-70.588-48.438-83.248c8.382-2.557,17.311-4.815,21.021-11.221
				c6.183-10.674-4.823-28.184-1.933-39.625c2.977-11.775,20.551-21.964,20.551-33.933c0-11.661-18.169-25.284-21.148-36.99
				c-2.91-11.439,8.063-28.968,1.86-39.629c-6.203-10.662-26.864-9.786-35.369-17.97c-8.751-8.422-8.724-29.028-19.279-34.672
				c-10.598-5.665-27.822,5.784-39.589,3.072C207.711,17.515,197.318,0,185.167,0c-12.331,0-31.944,19.868-35.02,20.583
				c-11.761,2.734-29.007-8.687-39.594-2.998c-10.545,5.663-10.48,26.271-19.215,34.707c-8.491,8.199-29.153,7.361-35.337,18.035
				c-6.183,10.672,4.823,28.178,1.934,39.625c-2.897,11.476-21.083,23.104-21.083,36.376c0,11.97,17.618,22.127,20.613,33.896
				c2.911,11.439-8.062,28.966-1.859,39.631c3.377,5.805,11.039,8.188,18.691,10.479c0.893,0.267,2.582,1.266,1.438,2.933
				c-5.235,9.036-47.37,81.755-47.37,81.755c-3.352,5.784-0.63,10.742,6.047,11.023l32.683,1.363
				c6.677,0.281,15.053,5.133,18.617,10.786l17.44,27.674c3.564,5.653,9.219,5.547,12.57-0.236c0,0,48.797-84.246,48.817-84.27
				c0.979-1.144,1.963-0.909,2.434-0.509c5.339,4.546,12.782,9.081,18.994,9.081c6.092,0,11.733-4.269,17.313-9.03
				c0.454-0.387,1.559-1.18,2.367,0.466c0.013,0.026,48.756,83.811,48.756,83.811c3.36,5.776,9.016,5.874,12.569,0.214
				l17.391-27.707c3.554-5.657,11.921-10.528,18.598-10.819l32.68-1.424C342.315,325.152,345.028,320.187,341.668,314.412z
				 M239.18,238.631c-36.136,21.023-79.511,18.77-112.641-2.127c-48.545-31.095-64.518-95.419-35.335-145.788
				c29.516-50.95,94.399-68.928,145.808-40.929c0.27,0.147,0.537,0.299,0.805,0.449c0.381,0.211,0.761,0.425,1.14,0.641
				c15.86,9.144,29.613,22.415,39.461,39.342C308.516,141.955,290.915,208.533,239.18,238.631z"
        fill="currentColor"
      />
      <path
        d="M230.916,66.103c-0.15-0.087-0.302-0.168-0.452-0.254C203.002,49.955,168,48.793,138.665,65.86
				c-43.532,25.326-58.345,81.345-33.019,124.876c7.728,13.284,18.318,23.888,30.536,31.498c1.039,0.658,2.09,1.305,3.164,1.927
				c43.579,25.247,99.568,10.333,124.814-33.244C289.405,147.338,274.495,91.35,230.916,66.103z M241.818,137.344l-15.259,14.873
				c-4.726,4.606-7.68,13.698-6.563,20.203l3.602,21.001c1.116,6.505-2.75,9.314-8.592,6.243l-18.861-9.916
				c-5.842-3.071-15.401-3.071-21.243,0l-18.86,9.916c-5.842,3.071-9.709,0.262-8.593-6.243l3.602-21.001
				c1.116-6.505-1.838-15.597-6.564-20.203l-15.258-14.873c-4.727-4.606-3.249-9.152,3.282-10.102l21.086-3.064
				c6.531-0.949,14.265-6.568,17.186-12.486l9.43-19.107c2.921-5.918,7.701-5.918,10.621,0l9.431,19.107
				c2.921,5.918,10.654,11.537,17.186,12.486l21.086,3.064C245.067,128.192,246.544,132.738,241.818,137.344z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GBCuped({
  className = "",
  size = 20,
  ...otherProps
}): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...otherProps}
    >
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="14"
          id="gradient"
          spreadMethod="pad"
        >
          <stop
            offset="0"
            style={{ stopColor: "rgb(56, 226, 175)", stopOpacity: 0.75 }}
          ></stop>
          <stop
            offset="1"
            style={{ stopColor: "rgb(56, 226, 175)", stopOpacity: 0 }}
          ></stop>
        </linearGradient>
      </defs>
      <path
        style={{
          strokeLinecap: "round",
          stroke: "rgb(22,217,161)",
          strokeWidth: 1.2,
          fill: "url(#gradient)",
        }}
        d="M 2.873 14.6 C 3.873 14.161 6.15 14.476 6.857 6.341 C 7.234 1.992 7.877 0.66 8.811 0.636 C 9.987 0.605 10.274 2.469 10.907 6.371 C 12.289 14.877 15.309 14.534 15.309 14.534"
      ></path>
      <path
        style={{
          strokeLinecap: "round",
          stroke: "rgb(204,153,0)",
          // mixBlendMode: "multiply",
        }}
        d="M 0.75 12.056 C 0.75 12.056 2.916 12.09 4.132 9.615 C 5.197 7.448 6.534 6.703 8.244 6.644 C 9.807 6.59 11.373 8.126 12.276 9.782 C 13.489 12.007 15.614 11.977 15.614 11.977"
      ></path>
    </svg>
  );
}

export function GBSequential({
  className = "",
  size = 20,
  ...otherProps
}): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...otherProps}
    >
      <path
        style={{
          strokeWidth: 0.8,
          stroke: "rgb(61,106,153)",
        }}
        d="m.4,10.1s.72-.15,2.36-4.77c.89-2.51,2.38-2.58,3.2.08,1.42,4.57,2.78,4.74,2.78,4.74"
      />
      <path
        style={{
          strokeWidth: 1,
          stroke: "rgb(61,130,204)",
        }}
        d="m2.66,9.52s.88-.17,2.72-5.37c1-2.83,2.67-2.91,3.6.09,1.6,5.14,3.12,5.33,3.12,5.33"
      />
      <path
        style={{
          strokeWidth: 1.2,
          stroke: "rgb(51,150,255)",
        }}
        d="m4.88,8.94s1.03-.19,3.08-5.96c1.11-3.14,2.97-3.23,4.01.1,1.78,5.71,3.47,5.92,3.47,5.92"
      />
    </svg>
  );
}

export function GBHashLock({
  className = "",
  size = 15,
  ...otherProps
}): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 448 512"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...otherProps}
    >
      <polygon points="173.9,391.6 244.3,389.2 263.5,313.1 192.9,316.6" />
      <path
        d="M400,194h-24v-42C376,68.2,307.8,0,224,0S72,68.2,72,152v42H48c-26.5,0-48,21.5-48,48v222
		c0,26.5,21.5,48,48,48h352c26.5,0,48-21.5,48-48V242C448,215.5,426.5,194,400,194z M152,152c0-39.7,32.3-72,72-72s72,32.3,72,72v42
		H152V152z M344.1,309.1l-35.4,1.8l-19.4,76.8l37-1.3l-11.3,38l-35.4,1.8l-9.7,38.4l-44.9,0.9l9.3-37l-70.6,3.5l-8.8,34.9l-44.9,0.9
		l8.5-33.5l-37.1,1.8l11.3-41.5l36.1-1.3l18.8-74.3l-37.1,1.8l11.3-40.6l36-1.4l9.1-36.1l44.9-0.9l-8.9,35.3l70.4-2.7l8.6-34
		l44.9-0.9l-8.4,33.1l37-1.4L344.1,309.1z"
      />
    </svg>
  );
}

export function GBRemoteEvalIcon({
  className = "",
  size = 18,
  ...otherProps
}): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 430 480"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...otherProps}
    >
      <path
        d="M301.3,215.3h-11.7v-35.2c0-41-33.3-74.3-74.3-74.3s-74.3,33.3-74.3,74.3v35.2h-11.7c-13,0-23.5,10.5-23.5,23.5
	v93.9c0,13,10.5,23.5,23.5,23.5h172.1c13,0,23.5-10.5,23.5-23.5v-93.9C324.8,225.8,314.3,215.3,301.3,215.3z M250.5,215.3h-70.4
	v-35.2c0-19.4,15.8-35.2,35.2-35.2s35.2,15.8,35.2,35.2V215.3z"
      />
      <path
        d="M429.9,159.8c0-21.2,0-42.3,0-63.5c0-9.6-3.9-21.6-22.3-23.9c-3.9-0.5-7.8-0.9-11.6-1.4c-11.9-1.3-23.2-2.6-34.1-5
	c-42.6-9-83.5-27.3-128.7-57.6c-6.1-4.1-10.9-7.3-17.8-7.3s-11.9,3.4-17.7,7.2c-60.5,40.2-115.3,60.6-172.2,64
	C8.1,73.4,0.6,81.1,0.6,98.2c0,13.8,0,27.5,0,41.3c-0.1,38.1-0.1,77.7,0.3,116.5c0.1,13.7,2,27.8,5.4,42.2
	c7.9,33.4,26.1,63.6,55.7,92.2c37.6,36.4,84.7,64.7,144.2,86.3c2.7,1,5.8,1.5,9,1.5c3.9,0,8-0.8,11.4-2.3c3.5-1.5,7-2.9,10.5-4.4
	c14.6-6,29.6-12.3,44.1-19.6c48.1-24.5,84.3-53.2,110.8-87.9c23.4-30.5,35.4-61.1,36.9-93.5c0.3-6.4,0.5-13.3,0.6-20.9
	c0-0.1,0-0.3,0-0.4l0.5-64.5c0-0.3,0-0.6,0-0.8v-1.3L429.9,159.8z M402.1,181.4L402.1,181.4v1.9c0,0.2,0,0.4,0,0.6l-0.5,62.9v2
	c0,0.1,0,0.2,0,0.3c-0.1,7.5-0.3,14.2-0.5,20.4c-1.2,26.8-11.5,52.6-31.5,78.7c-24.1,31.4-57.2,57.6-101.5,80.1
	c-13.5,6.8-28.1,12.9-42.1,18.7c-3.5,1.5-7,2.9-10.5,4.4c-0.1,0-0.2,0-0.3,0c-55.4-20.2-99.1-46.3-133.6-79.8
	c-25.7-25.1-41.6-51-48.3-79.4c-3-12.5-4.5-24.8-4.6-36.4c-0.4-38.7-0.3-78-0.3-116.2c0-13.6,0-27,0-40.6
	c61.7-4,120.5-25.8,184.9-68.5c0.5-0.4,1.2-0.8,2-1.3c0.6,0.4,1.3,0.9,2,1.3c47.6,32,93,52.2,138.6,61.9c12.3,2.6,24.8,4,36.8,5.3
	c3.2,0.4,6.3,0.7,9.4,1.1c0,20,0,40.1,0,60.1L402.1,181.4z"
      />
    </svg>
  );
}

export function GBSuspicious({
  className = "",
  size = 16,
  ...otherProps
}): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...otherProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="currentColor"
        d="M 10.5 7.5 v 3.75 Z m 0 6.75 h 0.008 v 0.008 H 10.5 v -0.008 z"
      />
    </svg>
  );
}

export function GBHeadingArrowLeft({
  className = "",
  size = 16,
  ...otherProps
}): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={className}
      {...otherProps}
    >
      <path
        fillRule="evenodd"
        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
      />
      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
    </svg>
  );
}

export function ChartLineExploreIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
      <path
        fill="currentColor"
        d="M8.48 12.434a.469.469 0 0 1-.468.469h-5.24a.469.469 0 0 1-.47-.469V2.122a.469.469 0 1 1 .938 0v3.967l2.973-2.6a.469.469 0 0 1 .59-.022l2.82 1.96 3.465-2.407a.47.47 0 1 1 .617.703L9.955 6.38a.469.469 0 0 1-.59.023l-2.82-1.959L3.24 7.334v4.631h4.772a.469.469 0 0 1 .468.47Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14.042 12.858a.466.466 0 0 1-.663 0l-1.192-1.19a2.343 2.343 0 1 1 .666-.665l1.19 1.19a.47.47 0 0 1 0 .665Zm-3.144-1.738a1.405 1.405 0 1 0 0-2.811 1.405 1.405 0 0 0 0 2.81Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function VisualizationAddIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.1123 5.7998C9.23658 5.7998 9.35546 5.84965 9.44336 5.9375C9.53122 6.02536 9.581 6.14431 9.58105 6.26855V8.14355H11.4561C11.5803 8.14355 11.6992 8.19341 11.7871 8.28125C11.875 8.36911 11.9248 8.48806 11.9248 8.6123C11.9248 8.73662 11.875 8.85643 11.7871 8.94434C11.6992 9.032 11.5802 9.08105 11.4561 9.08105H9.58105V10.9561C9.58105 11.0804 9.53127 11.2002 9.44336 11.2881C9.35549 11.3758 9.23644 11.4248 9.1123 11.4248C8.98817 11.4248 8.86912 11.3758 8.78125 11.2881C8.69334 11.2002 8.64355 11.0804 8.64355 10.9561V9.08105H6.76855C6.64442 9.08105 6.52537 9.032 6.4375 8.94434C6.34959 8.85643 6.2998 8.73662 6.2998 8.6123C6.29986 8.48806 6.34964 8.36911 6.4375 8.28125C6.5254 8.1934 6.64428 8.14355 6.76855 8.14355H8.64355V6.26855C8.64361 6.14431 8.69339 6.02536 8.78125 5.9375C8.86915 5.84965 8.98803 5.7998 9.1123 5.7998ZM0.771484 0.15332C0.895689 0.15332 1.01465 0.202284 1.10254 0.290039C1.19045 0.377947 1.24023 0.49775 1.24023 0.62207V4.58887L4.21289 1.98926C4.29378 1.91845 4.39648 1.8771 4.50391 1.87305C4.61128 1.86903 4.71678 1.90232 4.80273 1.9668L7.62402 3.92578L11.0879 1.52051C11.1333 1.47555 11.1875 1.44026 11.2471 1.41699C11.3065 1.39378 11.3698 1.38257 11.4336 1.38477C11.4975 1.38699 11.5604 1.40232 11.6182 1.42969C11.6759 1.45705 11.7274 1.49594 11.7695 1.54395C11.8117 1.59196 11.8436 1.64819 11.8633 1.70898C11.8829 1.76974 11.8898 1.83389 11.8838 1.89746C11.8777 1.96104 11.8589 2.02311 11.8281 2.0791C11.7974 2.13497 11.7554 2.18448 11.7051 2.22363L7.95508 4.87988C7.87425 4.9505 7.77133 4.99107 7.66406 4.99512C7.55669 4.99914 7.45119 4.96585 7.36523 4.90137L4.54395 2.94336L1.24023 5.83398V10.4658H6.01172C6.13592 10.4658 6.2549 10.5148 6.34277 10.6025C6.43068 10.6904 6.48047 10.8103 6.48047 10.9346C6.48034 11.0587 6.43057 11.1778 6.34277 11.2656C6.2549 11.3534 6.13592 11.4033 6.01172 11.4033H0.771484C0.647279 11.4033 0.528314 11.3534 0.44043 11.2656C0.352637 11.1778 0.302864 11.0587 0.302734 10.9346V0.62207C0.302734 0.49775 0.352522 0.377947 0.44043 0.290039C0.528314 0.202284 0.647279 0.15332 0.771484 0.15332Z"
        fill="currentColor"
      />
    </svg>
  );
}
