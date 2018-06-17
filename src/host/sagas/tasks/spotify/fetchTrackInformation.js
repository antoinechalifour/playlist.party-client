import { call } from 'redux-saga/effects'
import getSpotifyClient from './getSpotifyClient'

/**
 * Fetches the track information using the Spotify API.
 * @param {String} trackId - The track id.
 */
export default function * fetchTrackInformation (trackId) {
  const client = yield call(getSpotifyClient)

  return yield call([client.tracks, client.tracks.findOne], trackId)
}
