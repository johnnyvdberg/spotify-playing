import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import { useInterval } from 'usehooks-ts';

import AppEnv from '../AppEnv.ts';

const Idle = () => {
  const [activeVideo, setActiveVideo] = useState(
    randomInt(1, AppEnv.LAST_VIDEO_INDEX)
  );

  useInterval(() => {
    setActiveVideo(randomInt(1, AppEnv.LAST_VIDEO_INDEX));
  }, 20_000);

  useEffect(() => {
    screenfull
      .request(document.querySelector('.react-player') ?? undefined)
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  return (
    <div className="not-playing">
      <ReactPlayer
        playing
        muted
        loop
        url={`http://localhost:5173/video/${activeVideo}.mp4`}
      />
    </div>
  );
};

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default Idle;
