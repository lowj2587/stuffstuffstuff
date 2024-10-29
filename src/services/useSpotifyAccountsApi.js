const generateAccountsAuthUrl = () => {
  return [
    "https://accounts.spotify.com/en/authorize?" +
    "client_id=b3cadc1097d1469d826eeaed80eeabf1" +
    "&redirect_uri=http://localhost:3000/" +
    "&response_type=token" +
    "&scopes=user-read-private+user-read-birthdate+user-read-email+streaming+app-remote-control+user-top-read+user-read-recently-played+user-library-modify+user-library-read+playlist-read-collaborative+playlist-modify-private+playlist-modify-public+playlist-read-private+user-read-currently-playing+user-read-playback-state+user-modify-playback-state+user-follow-modify+user-follow-read"
  ].join();
}

const isAccessToken = () => getAccessToken() !== null;

const getAccessToken = () => {
  try {
    const hash = window.location.hash || "";
    const accessToken = hash.split("&")[0].split("=")[1];
    return accessToken.length > 0 ? accessToken : null;
  } catch (err) {
    return null;
  }
}

export {
  generateAccountsAuthUrl,
  isAccessToken,
  getAccessToken
}