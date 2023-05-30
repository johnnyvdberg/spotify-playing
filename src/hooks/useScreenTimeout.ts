import { useEffect } from 'react';
import axios from 'axios';

const SCREEN_TIMEOUT = import.meta.env.VITE_SCREEN_TIMEOUT;
const SCREEN_URL = import.meta.env.VITE_SCREEN_URL;
const DISABLE_SET_SCREEN = JSON.parse(import.meta.env.VITE_DISABLE_SET_SCREEN);

const setScreenEnabled = (enable: boolean) => {
  if (DISABLE_SET_SCREEN) {
    console.info(`${enable ? 'Enabling' : 'Disabling'} screen (suppressed)`);
    return;
  }

  console.info(`${enable ? 'Enabling' : 'Disabling'} screen`);

  return axios
    .get(SCREEN_URL, {
      params: { enable: enable ? 'on' : 'off' },
    })
    .catch((error: unknown) => {
      console.log(error);
    });
};

const useScreenTimeout = (enable: boolean) => {
  // Turn off screen after the timeout, and re-enable it on unmount.
  useEffect(() => {
    let timerId: number | undefined = undefined;

    if (enable) {
      timerId = setTimeout(() => setScreenEnabled(false), SCREEN_TIMEOUT);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
        setScreenEnabled(true);
      }
    };
  }, [enable]);
};

export default useScreenTimeout;