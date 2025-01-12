import React from 'react';

import { useCurrentlyPlaying } from './CurrentlyPlayingContext.tsx';
import NoItem from './playing/NoItem.tsx';
import Track from './track/Track.tsx';

const CurrentlyPlaying: React.FC = () => {
  const { track } = useCurrentlyPlaying();

  if (track) {
    return <Track />;
  }

  return <NoItem />;

  // if (currentlyPlaying?.currently_playing_type === 'episode') {
  //   return (
  //     <Episode
  //       episode={currentlyPlaying.item as SpotifyApi.EpisodeObjectFull}
  //     />
  //   );
  // }
};

export default CurrentlyPlaying;
