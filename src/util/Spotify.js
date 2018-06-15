const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI; //'http://localhost:3000/'
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/); 
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/mixtape-generator');
      return accessToken;
    } else {
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

  getRecommendations(songSeeds, genreSeeds, itemAttributes) {
    const userAccessToken = accessToken;
    const headers = {
      Authorization: `Bearer ${userAccessToken}`,
      "Content-Type": "application/json"
    };

    let recommendationsQuery = `https://api.spotify.com/v1/recommendations?seed_tracks=${songSeeds}&seed_genres=${genreSeeds}&limit=10`;

    // Check for danceability and add to query string
    if (itemAttributes.dance !== null) {
      recommendationsQuery += `&target_danceability=${.5 + itemAttributes.dance / 10}`;
    }

    // Check for energy and add to query string
    if (itemAttributes.energy !== null) {
      recommendationsQuery += `&target_energy=${.5 + itemAttributes.energy / 10}`;
    }

    // Check for instrumentalness and add to query string
    if (itemAttributes.instrumental !== null) {
      recommendationsQuery += `&target_instrumentalness=${.5 + itemAttributes.instrumental / 10}`;
    }

    // Check for min length and add to query string if there is no max length
    if (itemAttributes.minLength !== null && itemAttributes.maxLength === null) {
      recommendationsQuery += `&min_duration_ms=${itemAttributes.minLength}`;
    }

    // Check for max length and add to query string if there is no min length
    if (itemAttributes.maxLength !== null && itemAttributes.minLength === null) {
      recommendationsQuery += `&max_duration_ms=${itemAttributes.maxLength}`;
    }

    return fetch(recommendationsQuery, {headers: headers})
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) return [[], false];
        return [jsonResponse.tracks.map(track => {
          const trackInformation = {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            preview: track.preview_url,
            uri: track.uri
          } 
          return trackInformation;
        }), true];
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
