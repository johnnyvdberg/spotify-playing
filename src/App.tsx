import { useEffect, useState } from 'react';
import { useTimeout } from 'usehooks-ts';

import AppEnv from './AppEnv.ts';
import CurrentlyPlaying from './components/CurrentlyPlaying.tsx';
import { useCurrentlyPlaying } from './components/CurrentlyPlayingContext.tsx';
import Idle from './components/Idle.tsx';
import Status from './components/Status.tsx';

const App = () => {
  const { isPlaying, isLoading } = useCurrentlyPlaying();

  const [inactiveState, setInactiveState] = useState(false);

  useTimeout(
    () => setInactiveState(true),
    isPlaying ? null : AppEnv.IDLE_INTERVAL
  );

  useEffect(() => {
    if (isPlaying) {
      setInactiveState(false);
    }
  }, [isPlaying]);

  if (isLoading) {
    return <Status message="Loading" />;
  }

  if (!isPlaying && inactiveState) {
    return <Idle />;
  }

  return <CurrentlyPlaying />;
};

export default App;
