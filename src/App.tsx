import './App.css';

import { useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import CurrentlyPlaying from './components/CurrentlyPlaying.tsx';
import Idle from './components/Idle.tsx';
import Status from './components/Status.tsx';
import usePlayingApplication from './hooks/usePlayingApplication.ts';

const App = () => {
  const { currentlyPlaying, occupied, showLoading } = usePlayingApplication();
  const [inactive, setValue] = useDebounceValue(false, 10_000);

  useEffect(() => {
    setValue(!currentlyPlaying?.is_playing);
  }, [currentlyPlaying?.is_playing, setValue]);

  if (showLoading) {
    return <Status message="Loading" />;
  }

  if ((!currentlyPlaying || inactive) && !currentlyPlaying?.is_playing) {
    return <Idle />;
  }

  return <CurrentlyPlaying currentlyPlaying={currentlyPlaying} />;
};

export default App;
