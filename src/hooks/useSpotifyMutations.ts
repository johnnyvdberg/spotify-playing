import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from 'react-oauth2-code-pkce';

const useSpotifyMutations = () => {
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const pausePlayback = useMutation({
    mutationFn: () => {
      return axios.put(
        'https://api.spotify.com/v1/me/player/pause',
        undefined,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['currently-playing'] });
    },
  });

  const resumePlayback = useMutation({
    mutationFn: () => {
      return axios.put('https://api.spotify.com/v1/me/player/play', undefined, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['currently-playing'] });
    },
  });

  const previous = useMutation({
    mutationFn: () => {
      return axios.post(
        'https://api.spotify.com/v1/me/player/previous',
        undefined,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['currently-playing'] });
    },
  });

  const next = useMutation({
    mutationFn: () => {
      return axios.post(
        'https://api.spotify.com/v1/me/player/next',
        undefined,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['currently-playing'] });
    },
  });

  return { pausePlayback, resumePlayback, previous, next };
};

export default useSpotifyMutations;
