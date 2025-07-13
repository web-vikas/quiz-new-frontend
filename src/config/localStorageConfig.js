/*
Get Access Token from local storage
@returns {string|null} access token or null if not found
*/
export const getAccessToken = () => {
  const userSession = localStorage.getItem('userSession');
  if (userSession) {
    const parsedSession = JSON.parse(userSession);
    return parsedSession?.access || null;
  }
  return null;
};