const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = 'http://localhost:3000/'
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      console.log('case 1');
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/); 
    if (urlAccessToken && urlExpiresIn) {
      console.log('case 2');
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      console.log('case 3');
      window.location = spotifyUrl;
    }
  },

  search(searchTerm) {
    accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(
        response => response.json()
      ).then(
        jsonResponse => {
          if (!jsonResponse.tracks) return [];
          return jsonResponse.tracks.items.map(track => {
            const trackInformation = {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              preview: track.preview_url,
              uri: track.uri
            }
            return trackInformation;
          });
        }
      );
  },

  getGenres() {
    accessToken = this.getAccessToken();
    const userAccessToken = accessToken;
    const headers = {
      Authorization: `Bearer ${userAccessToken}`,
      "Content-Type": "application/json"
    };

    return fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {headers: headers})
      .then(response => response.json())
      .then(jsonResponse => {
        return jsonResponse.genres.map(genre => {
          return genre;
        })
      });
  },

  getRecommendations(seeds, genres) {
    const userAccessToken = accessToken;
    const headers = {
      Authorization: `Bearer ${userAccessToken}`,
      "Content-Type": "application/json"
    };

    return fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${seeds}&seed_genres=${genres}&limit=10`, {headers: headers})
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.map(track => {
          const trackInformation = {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          } 
          return trackInformation;
        });
      });
  },

  savePlaylist(playlistName, playlistTrackUris) {
    if (!playlistName || !playlistTrackUris) {
      return;
    }

    const userAccessToken = accessToken;
    const headers = {
      Authorization: `Bearer ${userAccessToken}`,
      "Content-Type": "application/json"
    };

    let userId = undefined;
    let playlistId = undefined;

    fetch('https://api.spotify.com/v1/me', {headers: headers})
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ name: playlistName })
        })
        .then(response => response.json())
        .then(jsonResponse => {
          playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ uris: playlistTrackUris })
          })
        })
      })
    }
};

export default Spotify;
