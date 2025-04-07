const EightDotsGrid = () => {
    return (
      <svg
        height="16"
        width="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        role="presentation"
        className="origin-center transition-transform duration-300 group-hover:rotate-45"
      >
        <circle cx="6" cy="2" r="1" fill="currentColor" />
        <circle cx="10" cy="2" r="1" fill="currentColor" />
        <circle cx="2" cy="6" r="1" fill="currentColor" />
        <circle cx="14" cy="6" r="1" fill="currentColor" />
        <circle cx="2" cy="10" r="1" fill="currentColor" />
        <circle cx="14" cy="10" r="1" fill="currentColor" />
        <circle cx="6" cy="14" r="1" fill="currentColor" />
        <circle cx="10" cy="14" r="1" fill="currentColor" />
      </svg>
    );
  };
  
  export default EightDotsGrid;
  