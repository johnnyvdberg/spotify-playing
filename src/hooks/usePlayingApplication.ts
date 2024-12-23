import useGetCurrentlyPlaying from './useGetCurrentlyPlaying.ts';
import useOccupied from './useOccupied.ts';
import useScreenTimeout from './useScreenTimeout.ts';

const usePlayingApplication = () => {
  const occupied = useOccupied();

  const { data: currentlyPlaying, isLoading } = useGetCurrentlyPlaying(true); // FIXME Occupied

  const showLoading = !currentlyPlaying && isLoading;
  const notPlaying = !(currentlyPlaying && occupied);

  useScreenTimeout(notPlaying);

  return {
    currentlyPlaying,
    occupied,
    showLoading,
  };
};

export default usePlayingApplication;
