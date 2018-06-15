import { call, fork, select, takeEvery } from 'redux-saga/effects'
import Socket from 'socket.io-client'
import SpotifyApiFactory from 'core/network/spotifyApi'
import { getAccessToken } from 'host/reducers'
import { TRIGGER_VOTE } from 'host/actions/tracks'
import { ADD_GUEST, GUEST_READY } from 'host/actions/guests'
import { START_PARTY } from 'host/actions/party'
import initializeParty from 'host/sagas/initializeParty'
import initializeGuest from 'host/sagas/initializeGuest'
import handleGuestSearch from 'host/sagas/handleGuestSearch'
import watchGuestEvents from 'host/sagas/watchGuestEvents'
import readFromSocket from 'host/sagas/readFromSocket'
import addTrack from 'host/sagas/addTrack'
import processVote from 'host/sagas/processVote'
import startParty from 'host/sagas/startParty'
import signaling from 'host/sagas/signaling'

// TODO: Refactor those sagas
import playerSaga from './player'

export default function * root () {
  const socket = Socket(process.env.REACT_APP_SIGNALING_URI)
  const accessToken = yield select(getAccessToken)
  const spotify = SpotifyApiFactory({ accessToken })

  yield fork(playerSaga, spotify)
  yield fork(signaling, socket)
  yield fork(readFromSocket, socket)

  yield takeEvery(START_PARTY, startParty)
  yield takeEvery(TRIGGER_VOTE, processVote)
  yield takeEvery(ADD_GUEST, watchGuestEvents)
  yield takeEvery(GUEST_READY, initializeGuest)

  yield takeEvery('@guest/search', handleGuestSearch, spotify)
  yield takeEvery('@guest/track/add', addTrack, spotify)

  yield call(initializeParty, socket)
}
