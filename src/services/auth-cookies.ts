import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { TOKENS } from '@/constants/tokens';
import { ROUTES_PATH } from '@/constants/route-path';

const handleGetAuthToken = () => {
  const accessToken = getCookie(TOKENS.ACCESS_TOKEN);
  const refreshToken = getCookie(TOKENS.REFRESH_TOKEN);

  return {
    accessToken: String(accessToken),
    refreshToken: String(refreshToken),
  };
};

const handleSetAuthToken = ({ accessToken, refreshToken }: { accessToken: string, refreshToken: string }) => {
  setCookie(TOKENS.ACCESS_TOKEN, accessToken);
  setCookie(TOKENS.REFRESH_TOKEN, refreshToken);
};

const handleDeleteAuthToken = () => {
  deleteCookie(TOKENS.ACCESS_TOKEN);
  deleteCookie(TOKENS.REFRESH_TOKEN);
};

const handleGetCurrentUrl = () => {
  const currentUrl = getCookie(ROUTES_PATH.CURRENT_URL);
  return currentUrl;
};

const handleSetCurrentUrl = (currentUrl: string) => {
  setCookie(ROUTES_PATH.CURRENT_URL, currentUrl);
};

const handleDeleteCurrentUrl = () => {
  deleteCookie(ROUTES_PATH.CURRENT_URL);
};

export {
  handleGetAuthToken,
  handleSetAuthToken,
  handleDeleteAuthToken,
  handleGetCurrentUrl,
  handleSetCurrentUrl,
  handleDeleteCurrentUrl,
};