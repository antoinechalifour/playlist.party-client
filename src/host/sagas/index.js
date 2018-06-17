import { fork, select } from 'redux-saga/effects'
import Socket from 'socket.io-client'
import SpotifyApiFactory from 'core/network/spotifyApi'
import { getAccessToken } from 'host/reducers'
import playerSaga from './player'
import partyFlow from './flows/partyFlow'
import socketFlow from './flows/socketFlow'

export default function * root () {
  const socket = Socket(process.env.REACT_APP_SIGNALING_URI)
  const accessToken = yield select(getAccessToken)
  const spotify = SpotifyApiFactory({ accessToken })

  yield fork(playerSaga, spotify)
  yield fork(socketFlow, socket)
  yield fork(partyFlow, socket, spotify)
}
