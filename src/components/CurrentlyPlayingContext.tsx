import React, { createContext, useContext } from 'react';
import { UseQueryResult } from '@tanstack/react-query';

import useGetCurrentlyPlaying from '../hooks/useGetCurrentlyPlaying.ts';

type CurrentlyPlayingContextType =
  | UseQueryResult<SpotifyApi.CurrentlyPlayingObject | null>
  | undefined;

// Create the context
const CurrentlyPlayingContext =
  createContext<CurrentlyPlayingContextType>(undefined);

type ProviderProps = {
  enable: boolean;
  children: React.ReactNode;
};

// Context Provider to wrap the components that need the data
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

// Custom hook to consume the context
export const useCurrentlyPlaying = () => {
  const context = useContext(CurrentlyPlayingContext);
  if (context === undefined) {
    throw new Error(
      'useCurrentlyPlaying must be used within a CurrentlyPlayingProvider'
    );
  }
  return context;
};
