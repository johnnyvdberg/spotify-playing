import React from 'react';

import useImageColor from '../hooks/useImageColor.ts';
import { useCurrentlyPlaying } from './CurrentlyPlayingContext.tsx';

const dashArray = 2 * Math.PI * 18;
const ProgressBar: React.FC = () => {
  const { progressMs, durationMs, artSrc } = useCurrentlyPlaying();

  const color = useImageColor(artSrc);

  const progressDashOffset = // Dirty calculation, needed to keep the progressbar in check
    dashArray -
    ((durationMs ?? 0) > 0 ? (progressMs / (durationMs ?? 1)) * dashArray : 0);
  return (
    <div className="absolute size-full">
      <svg
        className="size-full -rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="18"
          fill="none"
          className="stroke-current text-gray-200/10"
          strokeWidth="1"
        ></circle>
        <circle
          cx="18"
          cy="18"
          r="18"
          fill="none"
          className="stroke-current transition-all duration-2000 ease-linear"
          style={{
            color: color ?? '#000000',
          }}
          strokeWidth="1"
          strokeDasharray={dashArray}
          strokeDashoffset={progressDashOffset}
          strokeLinecap="round"
        ></circle>
      </svg>
    </div>
  );
};

export default ProgressBar;
