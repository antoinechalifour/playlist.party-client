import { select, fork } from 'redux-saga/effects'
import SpotifyApiFactory from 'core/network/spotifyApi'
import { getAccessToken } from 'host/reducers'
import signaling from './signaling'
import guests from './guests'
import player from './player'
import party from './party'
import tracks from './tracks'

export default function * root (socket) {
  const accessToken = yield select(getAccessToken)
  const spotify = SpotifyApiFactory({ accessToken })

  yield fork(signaling, socket)
  yield fork(guests, spotify)
  yield fork(player, spotify)
  yield fork(tracks)
  yield fork(party)
}
