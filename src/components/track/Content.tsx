import React from 'react';
import {
  faBackwardFast,
  faForwardFast,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useSpotifyMutations from '../../hooks/useSpotifyMutations.ts';
import { useCurrentlyPlaying } from '../CurrentlyPlayingContext.tsx';

const Content: React.FC = () => {
  const { track, episode, isPlaying, artSrc } = useCurrentlyPlaying();
  const { pausePlayback, resumePlayback, previous, next } =
    useSpotifyMutations();

  return (
    <div className="relative w-screen">
      <div className="flex flex-col items-center justify-center px-[2cqh] py-[5cqw]">
        <img
          className="mb-[5cqi] h-auto max-w-[45cqw] shadow-albumart"
          src={artSrc}
          alt="Cover art"
        />

        <h1 className="mb-2 w-[75cqw] truncate text-title font-bold leading-tight">
          {track?.name ?? episode?.name}
        </h1>
        <h2 className="mb-2 w-[75cqw] truncate text-meta font-medium italic leading-tight">
          {track?.album.name ?? episode?.show.name}
        </h2>

        <h3 className="w-[65cqw] truncate break-words text-meta font-medium leading-tight">
          {track?.artists.map((artist) => artist.name).join(', ')}
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
          <button
            className="flex w-control min-w-control items-center justify-center text-control font-bold"
            onClick={() => {
              pausePlayback.mutate();
            }}
          >
            <FontAwesomeIcon icon={faPause} />
          </button>
        ) : (
          <button
            className="flex w-control min-w-control items-center justify-center text-control font-bold"
            onClick={() => {
              resumePlayback.mutate();
            }}
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
        <button
          className="flex w-control min-w-control items-center justify-center text-control font-bold"
          onClick={() => {
            next.mutate();
          }}
        >
          <FontAwesomeIcon icon={faForwardFast} />
        </button>
      </div>
    </div>
  );
};

export default Content;
