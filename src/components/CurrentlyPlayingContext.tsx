import React, { createContext, useContext } from 'react';
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
  if (context === undefined) {
    throw new Error(
      'useCurrentlyPlaying must be used within a CurrentlyPlayingProvider'
    );
  }
  return context;
};
