import React, { createContext, useContext, useMemo } from 'react';
import { UseQueryResult } from '@tanstack/react-query';

import useGetCurrentlyPlaying from '../hooks/useGetCurrentlyPlaying.ts';

type CurrentlyPlayingContextType =
  | UseQueryResult<SpotifyApi.CurrentlyPlayingObject | null>
  | undefined;

const CurrentlyPlayingContext =
  createContext<CurrentlyPlayingContextType>(undefined);

type ProviderProps = {
  enable: boolean;
  children: React.ReactNode;
};

export const CurrentlyPlayingProvider: React.FC<ProviderProps> = ({
  enable,
  children,
}) => {
  const currentlyPlayingQuery = useGetCurrentlyPlaying(enable);

  return (
    <CurrentlyPlayingContext.Provider value={currentlyPlayingQuery}>
      {children}
    </CurrentlyPlayingContext.Provider>
  );
};

export const useCurrentlyPlaying = () => {
  const context = useContext(CurrentlyPlayingContext);

  const track = useMemo(() => {
    return context?.data?.item?.type === 'track'
      ? context?.data?.item
      : undefined;
  }, [context?.data?.item?.id]);

  const episode = useMemo(
    () =>
      context?.data?.item?.type === 'episode' ? context?.data?.item : undefined,
    [context?.data?.item?.id]
  );

  const durationMs = useMemo(
    () => context?.data?.item?.duration_ms,
    [context?.data?.item?.duration_ms]
  );
  const progressMs = useMemo(
    () => context?.data?.progress_ms ?? 0,
    [context?.data?.progress_ms]
  );

  const artSrc = useMemo(() => {
    if (context?.data?.item?.type === 'track') {
      return context?.data?.item.album.images[0]?.url;
    }
    if (context?.data?.item?.type === 'episode') {
      return context?.data?.item.images[0]?.url;
    }
    return undefined;
  }, [context?.data?.item?.id]);

  const isPlaying = useMemo(() => {
    return context?.data?.is_playing ?? false;
  }, [context?.data?.is_playing]);

  if (context === undefined) {
    throw new Error(
      'useCurrentlyPlaying must be used within a CurrentlyPlayingProvider'
    );
  }
  return {
    track,
    episode,
    durationMs,
    progressMs,
    artSrc,
    isPlaying,
    isLoading: context.isLoading,
  };
};
