window.onSpotifyWebPlaybackSDKReady = () => {
  const token = '[BQBAy4R7IvnS2G8AjRcM9d0EigtspV1acoMeH3FfJoGM4vJJXgSQl4vJRsmovVEZkggxCdOTE4M5Req-cr1SJOMsNnbtjxzLFKfQ5jINz4XqQfEk4EcmZwn7GRVcy8G8GSeF-k61zz4JUv7fO7e1WveVp3GIGCjnQBW5YfEPcf_Aauu0WpCb8NdRVR63PaB_wlc]';
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); },
    volume: 0.5
  });

  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  player.addListener('initialization_error', ({ message }) => {
    console.error(message);
  });

  player.addListener('authentication_error', ({ message }) => {
    console.error(message);
  });

  player.addListener('account_error', ({ message }) => {
    console.error(message);
  });

  document.getElementById('togglePlay').onclick = function () {
    player.togglePlay();
  };

  player.connect();

}
const play = ({
  spotify_uri,
  playerInstance: {
    _options: {
      getOAuthToken
    }
  }
}) => {
  getOAuthToken(access_token => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
    });
  });
};

play({
  playerInstance: new Spotify.Player({ name: "..." }),
  spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
});
