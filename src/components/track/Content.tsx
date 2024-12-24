import React from 'react';
import {
  faBackwardFast,
  faForwardFast,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useSpotifyMutations from '../../hooks/useSpotifyMutations.ts';
import useTrackImageProvider from './useTrackImageProvider.ts';

import TrackObjectFull = SpotifyApi.TrackObjectFull;

interface ContentProps {
  track?: TrackObjectFull;
  isPlaying: boolean;
}

const Content: React.FC<ContentProps> = ({ track, isPlaying }) => {
  const { trackImageCanvasSubscriber } = useTrackImageProvider();
  const { pausePlayback, resumePlayback, previous, next } =
    useSpotifyMutations();

  if (!track) {
    return <h1>Unknown state</h1>;
  }
  const trackImage = track.album.images[0];

  return (
    <div className="relative w-screen">
      <div className="flex flex-col items-center justify-center px-[2cqh] py-[5cqw]">
        <canvas
          ref={trackImageCanvasSubscriber('album-art')}
          className="mb-[5cqi] h-auto max-w-[45cqw] shadow-albumart"
          style={{
            width: trackImage.width,
            aspectRatio: `${trackImage.width} / ${trackImage.height}`,
          }}
        />

        <h1 className="mb-2 w-4/5 truncate text-title font-bold leading-tight">
          {track.name}
        </h1>
        <h2 className="mb-2 w-3/5 truncate text-meta font-medium italic leading-tight">
          {track.album.name}
        </h2>

        <h3 className="w-2/5 truncate break-words text-meta font-medium leading-tight">
          {track.artists.map((artist) => artist.name).join(', ')}
        </h3>
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-5">
        <div
          className="flex w-control min-w-control items-center justify-center gap-20 text-control font-bold"
          onClick={() => {
            previous.mutate();
          }}
        >
          <FontAwesomeIcon icon={faBackwardFast} />
        </div>
        {isPlaying ? (
          <div
            className="flex w-control min-w-control items-center justify-center text-control font-bold"
            onClick={() => {
              pausePlayback.mutate();
            }}
          >
            <FontAwesomeIcon icon={faPause} />
          </div>
        ) : (
          <div
            className="flex w-control min-w-control items-center justify-center text-control font-bold"
            onClick={() => {
              resumePlayback.mutate();
            }}
          >
            <FontAwesomeIcon icon={faPlay} />
          </div>
        )}
        <div
          className="flex w-control min-w-control items-center justify-center text-control font-bold"
          onClick={() => {
            next.mutate();
          }}
        >
          <FontAwesomeIcon icon={faForwardFast} />
        </div>
      </div>
    </div>
  );
};

export default Content;
