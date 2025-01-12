import React, { useEffect, useState } from 'react';

import AppEnv from '../../AppEnv.ts';
import imgUrl from '../../assets/empty-album.jpg';
import useImageCanvas from '../../hooks/useImageCanvas.ts';
import { useCurrentlyPlaying } from '../CurrentlyPlayingContext.tsx';
import ProgressBar from '../ProgressBar.tsx';
import BackgroundBlurred from './background/BackgroundBlurred.tsx';
import BackgroundColor from './background/BackgroundColor.tsx';
import Content from './Content.tsx';
import TrackImageProvider from './TrackImageProvider.tsx';

import TrackObjectFull = SpotifyApi.TrackObjectFull;

const Track: React.FC = () => {
  const { track, isPlaying } = useCurrentlyPlaying();

  const { canvas, loadedUrl } = useImageCanvas(
    track?.album.images[0].url ?? imgUrl
  );

  // Cache the old track until the image loads so all transitions happen at once.
  const [cachedTrack, setCachedTrack] = useState<TrackObjectFull | undefined>(
    track
  );

  useEffect(() => {
    if (loadedUrl === track?.album.images[0].url) {
      setCachedTrack(track);
    }
  }, [loadedUrl, track]);

  if (!track) {
    return <h1>Unknown state</h1>;
  }

  return (
    <TrackImageProvider sourceCanvas={canvas} loadedUrl={loadedUrl}>
      <div className="relative flex h-screen w-screen items-center justify-center [container:currently-playing/inline-size]">
        {AppEnv.PLAYING_USE_BLUR ? <BackgroundBlurred /> : <BackgroundColor />}
        <ProgressBar />
        <Content track={cachedTrack} isPlaying={isPlaying ?? false} />
      </div>
    </TrackImageProvider>
  );
};

export default Track;
