import { call, select } from 'redux-saga/effects'
import SpotifyApiFactory from 'core/network/spotifyApi'
import { getAccessToken } from 'host/reducers'

export default function * getSpotifyClient () {
  const accessToken = yield select(getAccessToken)
  return call(SpotifyApiFactory, { accessToken })
}
