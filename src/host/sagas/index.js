import { fork, select, takeEvery } from 'redux-saga/effects'
import SpotifyApiFactory from 'core/network/spotifyApi'
import { getAccessToken } from 'host/reducers'
import { TRIGGER_VOTE } from 'host/actions/tracks'
import processVote from 'host/sagas/processVote'
import { ADD_GUEST, GUEST_READY } from 'host/actions/guests'
import watchGuestEvents from 'host/sagas/watchGuestEvents'
import initializeGuest from 'host/sagas/initializeGuest'
import handleGuestSearch from 'host/sagas/handleGuestSearch'
import addTrack from 'host/sagas/addTrack'
import startParty from 'host/sagas/startParty'

// TODO: Refactor those sagas
import playerSaga from './player'
import signalingSaga from './signaling'
import { START_PARTY } from 'host/actions/party'

export default function * root (socket) {
  const accessToken = yield select(getAccessToken)
  const spotify = SpotifyApiFactory({ accessToken })

  yield fork(playerSaga, spotify)
  yield fork(signalingSaga, socket)

  yield takeEvery(START_PARTY, startParty)
  yield takeEvery(TRIGGER_VOTE, processVote)
  yield takeEvery(ADD_GUEST, watchGuestEvents)
  yield takeEvery(GUEST_READY, initializeGuest)

  yield takeEvery('@guest/search', handleGuestSearch, spotify)
  yield takeEvery('@guest/track/add', addTrack, spotify)
}
