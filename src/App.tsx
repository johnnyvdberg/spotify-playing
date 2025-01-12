import { useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import CurrentlyPlaying from './components/CurrentlyPlaying.tsx';
import { useCurrentlyPlaying } from './components/CurrentlyPlayingContext.tsx';
import Idle from './components/Idle.tsx';
import Status from './components/Status.tsx';

const App = () => {
  const { isPlaying, isLoading } = useCurrentlyPlaying();

  const [inactive, setValue] = useDebounceValue(false, 10_000);

  useEffect(() => {
    setValue(!isPlaying);
  }, [isPlaying, setValue]);

  if (isLoading) {
    return <Status message="Loading" />;
  }

  if ((!isPlaying || inactive) && !isPlaying) {
    return <Idle />;
  }

  return <CurrentlyPlaying />;
};

export default App;
