// src/icons/HomeIconCustom.jsx

const EstanteIcon = ({ width = 24, height = 24, color = '#FFF9EC' }) => (
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
      d="M19.4 20H4.6C4.26863 20 4 19.7314 4 19.4V4.6C4 4.26863 4.26863 4 4.6 4H19.4C19.7314 4 20 4.26863 20 4.6V19.4C20 19.7314 19.7314 20 19.4 20Z"
      stroke={color}
    />
    <path d="M11 12V4" stroke={color} />
    <path d="M4 12H20" stroke={color} />
  </svg>
);

export default EstanteIcon;
