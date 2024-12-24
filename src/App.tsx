import { useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import CurrentlyPlaying from './components/CurrentlyPlaying.tsx';
import { useCurrentlyPlaying } from './components/CurrentlyPlayingContext.tsx';
import Idle from './components/Idle.tsx';
import Status from './components/Status.tsx';

const App = () => {
  const { data: currentlyPlaying, isLoading } = useCurrentlyPlaying();

  const [inactive, setValue] = useDebounceValue(false, 10_000);

  useEffect(() => {
    setValue(!currentlyPlaying?.is_playing);
  }, [currentlyPlaying?.is_playing, setValue]);

  if (isLoading) {
    return <Status message="Loading" />;
  }

  if ((!currentlyPlaying || inactive) && !currentlyPlaying?.is_playing) {
    return <Idle />;
  }

  return <CurrentlyPlaying />;
};

export default App;
