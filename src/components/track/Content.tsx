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
  track: TrackObjectFull;
  isPlaying: boolean;
}

const Content: React.FC<ContentProps> = ({ track, isPlaying }) => {
  const { trackImageCanvasSubscriber } = useTrackImageProvider();
  const { pausePlayback, resumePlayback, previous, next } =
    useSpotifyMutations();

  const trackImage = track.album.images[0];

  return (
    <div className="currently-playing--content">
      <div className="currently-playing--content--inner">
        <canvas
          ref={trackImageCanvasSubscriber('currently-playing--image')}
          className="currently-playing--image"
          style={{
            width: trackImage.width,
            aspectRatio: `${trackImage.width} / ${trackImage.height}`,
          }}
        />

        <h1>{track.name}</h1>
        <h2>{track.album.name}</h2>

        <h3>{track.artists.map((artist) => artist.name).join(', ')}</h3>
      </div>
      <div className="currently-playing--controls">
        <div>
          <span
            className="media-icon"
            onClick={() => {
              previous.mutate();
            }}
          >
            <FontAwesomeIcon icon={faBackwardFast} />
          </span>
        </div>
        <div>
          {isPlaying ? (
            <span
              className="media-icon"
              onClick={() => {
                pausePlayback.mutate();
              }}
            >
              <FontAwesomeIcon icon={faPause} />
            </span>
          ) : (
            <span
              className="media-icon"
              onClick={() => {
                resumePlayback.mutate();
              }}
            >
              <FontAwesomeIcon icon={faPlay} />
            </span>
          )}
        </div>
        <div>
          <span
            className="media-icon"
            onClick={() => {
              next.mutate();
            }}
          >
            <FontAwesomeIcon icon={faForwardFast} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Content;
