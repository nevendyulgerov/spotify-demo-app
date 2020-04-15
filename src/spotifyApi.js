import SpotifyWebApi from 'spotify-web-api-js';

const clientId = '63627112c863476e8ac09e84b773c926';

const clientSecret = '253f463d7fc548f19bc358045e50a5c1';

export const spotifyApi = new SpotifyWebApi();

/**
 * @description Generate login token
 * @param id
 * @param secret
 * @returns {string}
 */
const generateLoginToken = (id, secret) => {
  return new Buffer(`${id}:${secret}`).toString('base64');
};

/**
 * @description Get access token
 * @returns {string}
 */
export const getAccessToken = () => {
  return spotifyApi.getAccessToken();
};

/**
 * @description Login
 * @returns {Promise<Response>}
 */
export const login = () => {
  const formData = new FormData();
  formData.append('grant_type', 'client_credentials');
  const initObj = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${generateLoginToken(clientId, clientSecret)}`,
      Accept: 'application/json'
    },
    body: new URLSearchParams(formData)
  };

  return fetch('https://accounts.spotify.com/api/token', initObj)
    .then((res) => res.json())
    .then((res) => {
      const { access_token } = res;
      spotifyApi.setAccessToken(access_token);
    })
};

/**
 * @description Get artist
 * @param artistId
 * @param options
 * @returns {Promise<any>}
 */
export const getArtist = (artistId, options) => {
  return spotifyApi.getArtist(artistId, options);
};

/**
 * @description Get artist albums
 * @param artistId
 * @param options
 * @returns {*}
 */
export const getArtistAlbums = (artistId, options) => {
  return spotifyApi.getArtistAlbums(artistId, options);
};

/**
 * @description Get album
 * @param albumId
 * @param options
 * @returns {Promise<SpotifyApi.SingleAlbumResponse>}
 */
export const getAlbum = (albumId, options) => {
  return spotifyApi.getAlbum(albumId, options);
};

/**
 * @description Get album tracks
 * @param albumId
 * @param options
 * @returns {Promise<SpotifyApi.AlbumTracksResponse>}
 */
export const getAlbumTracks = (albumId, options) => {
  return spotifyApi.getAlbumTracks(albumId, options);
};

/**
 * @description Search artists
 * @param query
 * @param options
 * @returns {Promise<SpotifyApi.ArtistSearchResponse>}
 */
export const searchArtists = (query, options) => {
  return spotifyApi.searchArtists(query, options);
};
