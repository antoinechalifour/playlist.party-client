import { call } from 'redux-saga/effects'
import getSpotifyClient from '../spotify/getSpotifyClient'

/**
 * Search for tracks using the Spotify api.
 * @param {String} query - The partial track title.
 */
export default function * searchTracks (query) {
  const client = yield call(getSpotifyClient)

  return yield call([client, client.search], query)
}
