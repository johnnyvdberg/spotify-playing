import React from 'react';

import { useCurrentlyPlaying } from './CurrentlyPlayingContext.tsx';
import NoItem from './playing/NoItem.tsx';
import ProgressBar from './ProgressBar.tsx';
import BackgroundBlurred from './track/background/BackgroundBlurred.tsx';
import Content from './track/Content.tsx';

const CurrentlyPlaying: React.FC = () => {
  const { track, episode } = useCurrentlyPlaying();

  if (!track && !episode) {
    return <NoItem />;
  }

  return (
    <div className="relative flex h-screen w-screen items-center justify-center [container:currently-playing/inline-size]">
      <BackgroundBlurred />
      <ProgressBar />
      <Content />
    </div>
  );
};

export default CurrentlyPlaying;
