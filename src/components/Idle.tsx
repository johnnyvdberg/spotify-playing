import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

import AppEnv from '../AppEnv.ts';

const Idle = () => {
  const [activeVideo, setActiveVideo] = useState(
    randomInt(1, AppEnv.LAST_VIDEO_INDEX)
  );

  useInterval(() => {
    setActiveVideo(randomInt(1, AppEnv.LAST_VIDEO_INDEX));
  }, 20_000);

  return (
    <div>
      <video
        className="fixed left-0 top-0 h-full w-[100vw] object-cover"
        autoPlay
        muted
        loop
        src={`${AppEnv.PUBLIC_URL}/video/${activeVideo}.mp4`}
      />
    </div>
  );
};

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default Idle;
