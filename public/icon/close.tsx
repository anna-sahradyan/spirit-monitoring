import React from 'react';

export const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke="#313130"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.5 1.5L1.5 14.5M1.5 1.5L14.5 14.5"
    />
  </svg>
);
