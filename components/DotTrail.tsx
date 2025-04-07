const DotTrail = () => {
    return (
      <span className="relative overflow-hidden">
        <svg
          height="16"
          role="presentation"
          viewBox="0 0 8 16"
          width="8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="origin-center transition-transform duration-300 group-hover:translate-x-4"
        >
          <g clipPath="url(#clip0_12780_10462)">
            <circle cx="1" cy="2" r="1" fill="currentColor" />
            <circle cx="4" cy="5" r="1" fill="currentColor" />
            <circle cx="7" cy="8" r="1" fill="currentColor" />
            <circle cx="4" cy="11" r="1" fill="currentColor" />
            <circle cx="1" cy="14" r="1" fill="currentColor" />
          </g>
          <defs>
            <clipPath id="clip0_12780_10462">
              <rect width="8" height="15" fill="white" transform="translate(0 0.5)" />
            </clipPath>
          </defs>
        </svg>
  
        <svg
          height="16"
          role="presentation"
          viewBox="0 0 8 16"
          width="8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="absolute inset-0 origin-center -translate-x-4 transition-transform duration-300 group-hover:translate-x-0"
        >
          <g clipPath="url(#clip0_12780_10462)">
            <circle cx="1" cy="2" r="1" fill="currentColor" />
            <circle cx="4" cy="5" r="1" fill="currentColor" />
            <circle cx="7" cy="8" r="1" fill="currentColor" />
            <circle cx="4" cy="11" r="1" fill="currentColor" />
            <circle cx="1" cy="14" r="1" fill="currentColor" />
          </g>
          <defs>
            <clipPath id="clip0_12780_10462">
              <rect width="8" height="15" fill="white" transform="translate(0 0.5)" />
            </clipPath>
          </defs>
        </svg>
      </span>
    );
  };
  
  export default DotTrail;
  