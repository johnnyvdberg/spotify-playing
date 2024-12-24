import React from 'react';

import { useCurrentlyPlaying } from './CurrentlyPlayingContext.tsx';
import Episode from './playing/Episode.tsx';
import NoItem from './playing/NoItem.tsx';
import Track from './track/Track.tsx';

const CurrentlyPlaying: React.FC = () => {
  const { data: currentlyPlaying } = useCurrentlyPlaying();

  if (currentlyPlaying?.currently_playing_type === 'track') {
    if (currentlyPlaying?.item) {
      return <Track />;
    }

    return <NoItem />;
  }

  if (currentlyPlaying?.currently_playing_type === 'episode') {
    return (
      <Episode
        episode={currentlyPlaying.item as SpotifyApi.EpisodeObjectFull}
      />
    );
  }

  return <h1>Unknown State</h1>;
};

export default CurrentlyPlaying;
