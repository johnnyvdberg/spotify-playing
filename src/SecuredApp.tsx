import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContext, AuthProvider } from 'react-oauth2-code-pkce';
import type { TAuthConfig } from 'react-oauth2-code-pkce';

import App from './App';
import AppEnv from './AppEnv';
import { CurrentlyPlayingProvider } from './components/CurrentlyPlayingContext.tsx';
import Login from './components/Login.tsx';
import Status from './components/Status.tsx';

const location = window.location;

const authConfig: TAuthConfig = {
  clientId: AppEnv.SPOTIFY_CLIENT_ID,
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
  redirectUri: `${location.protocol}//${location.host}${location.pathname}`,
  scope: 'user-read-currently-playing user-modify-playback-state',

  // Spotify token not a JWT.
  decodeToken: false,

  // Spotify refresh tokens don't expire.
  refreshTokenExpiresIn: 8.64e13,
};

const SecuredApp = () => {
  const { token, loginInProgress } = useContext(AuthContext);

  if (loginInProgress) {
    return <Status message="Logging in..." />;
  }

  if (token) {
    return (
      <div
        className={
          AppEnv.VIRTUAL_CIRCULAR_BORDER
            ? 'flex size-[720px] items-center justify-center rounded-full border shadow-black'
            : undefined
        }
      >
        <CurrentlyPlayingProvider enable>
          <App />
        </CurrentlyPlayingProvider>
      </div>
    );
  }

  return <Login />;
};

const WrappedSecuredApp = () => {
  const queryClient = new QueryClient();

  return (
    <AuthProvider authConfig={authConfig}>
      <QueryClientProvider client={queryClient}>
        <SecuredApp />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default WrappedSecuredApp;
