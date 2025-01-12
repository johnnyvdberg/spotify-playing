import React from 'react';

import { useCurrentlyPlaying } from '../../CurrentlyPlayingContext.tsx';

const BackgroundBlurred: React.FC = () => {
  const { artSrc } = useCurrentlyPlaying();
  return (
    <img
      src={artSrc}
      className="use-blur absolute bottom-0 left-0 right-0 top-0 size-full blur-3xl brightness-50"
      alt="background"
      aria-hidden
    />
  );
};

export default BackgroundBlurred;
