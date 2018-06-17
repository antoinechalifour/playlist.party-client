import { call, cancel, fork, put, take, takeEvery } from 'redux-saga/effects'
import {
  partyStatusCreationError,
  partyStatusWaitingForTracks,
  partyStatusWaitingToStart,
  START_PARTY,
  partyStatusStarted,
  PARTY_TOKEN_EXPIRED,
  partyStatusFinished
} from 'host/actions/party'
import { ADD_TO_BATTLE, TRIGGER_VOTE, triggerVote } from 'host/actions/tracks'
import createCurrentParty from 'host/sagas/tasks/createCurrentParty'
import signalingFlow from 'host/sagas/flows/signalingFlow'
import guestFlow from 'host/sagas/flows/guestFlow'
import processVote from 'host/sagas/tasks/processVote'

export default function * partyFlow (socket, spotify) {
  try {
    yield call(createCurrentParty, socket)

    // Listen to signaling events to add new guests
    const signalingTask = yield fork(signalingFlow, socket)

    // Once created, the party is in "waiting for track" status
    yield put(partyStatusWaitingForTracks())

    const guestsTask = yield fork(guestFlow, spotify)

    // Once 2 tracks have been added to the battle, the
    // party is in "waiting for user to start" status
    yield take(ADD_TO_BATTLE)
    yield take(ADD_TO_BATTLE)

    yield put(partyStatusWaitingToStart())

    // The party then starts
    yield take(START_PARTY)
    yield takeEvery(TRIGGER_VOTE, processVote)
    yield put(triggerVote())
    yield put(partyStatusStarted())

    // Whenever the Spotify token expires, the party is over
    yield take(PARTY_TOKEN_EXPIRED)
    yield cancel(signalingTask)
    yield cancel(guestsTask)

    yield put(partyStatusFinished())
  } catch (err) {
    yield put(partyStatusCreationError())
  }
}
