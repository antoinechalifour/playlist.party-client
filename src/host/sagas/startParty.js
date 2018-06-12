import { put, select } from 'redux-saga/effects'
import { getContenders } from 'host/reducers'
import { triggerVote } from 'host/actions/tracks'
import { partyReady } from 'host/actions/party'

/**
 * Triggers the initial vote to start the party.
 */
export default function * startParty () {
  const contenders = yield select(getContenders)

  if (contenders.length === 0) {
    return
  }

  yield put(triggerVote())

  yield put(partyReady())
}
