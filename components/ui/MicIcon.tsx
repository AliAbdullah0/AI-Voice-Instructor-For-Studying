import React from 'react';

const EightDotsGrid: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      height="33"
      width="36"
      viewBox="0 0 36 33"
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="size-5 sm:size-8"
      {...props}
    >
      {/* Row 1 */}
      <circle className="row-1" cx="13" cy="1.5" r="1.5" fill="currentColor" />
      <circle className="row-1" cx="18" cy="1.5" r="1.5" fill="currentColor" />
      <circle className="row-1" cx="23" cy="1.5" r="1.5" fill="currentColor" />

      {/* Row 2 */}
      <circle className="row-2" cx="13" cy="6.5" r="1.5" fill="currentColor" />
      <circle className="row-2" cx="18" cy="6.5" r="1.5" fill="currentColor" />
      <circle className="row-2" cx="23" cy="6.5" r="1.5" fill="currentColor" />

      {/* Row 3 */}
      <circle className="row-3" cx="13" cy="11.5" r="1.5" fill="currentColor" />
      <circle className="row-3" cx="18" cy="11.5" r="1.5" fill="currentColor" />
      <circle className="row-3" cx="23" cy="11.5" r="1.5" fill="currentColor" />

      {/* Row 4 */}
      <circle className="row-4" cx="13" cy="16.5" r="1.5" fill="currentColor" />
      <circle className="row-4" cx="18" cy="16.5" r="1.5" fill="currentColor" />
      <circle className="row-4" cx="23" cy="16.5" r="1.5" fill="currentColor" />

      {/* Row 5 */}
      <circle className="row-5" cx="13" cy="21.5" r="1.5" fill="currentColor" />
      <circle className="row-5" cx="18" cy="21.5" r="1.5" fill="currentColor" />
      <circle className="row-5" cx="23" cy="21.5" r="1.5" fill="currentColor" />

      {/* Row 6 */}
      <circle className="row-6" cx="18" cy="26.5" r="1.5" fill="currentColor" />

      {/* Row 7 */}
      <circle className="row-7" cx="13" cy="31.5" r="1.5" fill="currentColor" />
      <circle className="row-7" cx="18" cy="31.5" r="1.5" fill="currentColor" />
      <circle className="row-7" cx="23" cy="31.5" r="1.5" fill="currentColor" />
    </svg>
  );
};

export default EightDotsGrid;
