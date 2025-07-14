// src/icons/HomeIconCustom.jsx

const StatsIcon = ({ width = 24, height = 24, color = '#FFF9EC' }) => (
   <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
  >
    <path
      d="M8 16L8 8"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16L12 11"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 16L16 13"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z"
      stroke={color}
    />
  </svg>
);

export default StatsIcon;
