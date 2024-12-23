import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from 'react-oauth2-code-pkce';

import AppEnv from '../AppEnv.ts';

const REFETCH_INTERVAL = Number(AppEnv.SPOTIFY_INTERVAL);

const useGetCurrentlyPlaying = (enable: boolean) => {
  const { token } = useContext(AuthContext);

  return useQuery({
    queryKey: ['currently-playing'],
    queryFn: async () => {
      const response =
        await axios.get<SpotifyApi.CurrentlyPlayingObject | null>(
          'https://api.spotify.com/v1/me/player/currently-playing',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

      if (response.status === 204) {
        response.data = null;
      }
      if (response.data) {
        // Clear some of the values that we don't care about, but which
        // cause the object to change.
        response.data.actions.disallows = {};
        response.data.timestamp = 0;
        response.data.progress_ms = 0;
        // response.data.is_playing = true;
      }

      return response.data;
    },
    enabled: enable,
    refetchInterval: REFETCH_INTERVAL,
  });
};

export default useGetCurrentlyPlaying;
