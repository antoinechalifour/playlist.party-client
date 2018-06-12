import { call, take } from 'redux-saga/effects'
import { START_PARTY } from 'host/actions/party'
import startParty from 'host/sagas/startParty'

export default function * initializeParty () {
  yield take(START_PARTY)
  yield call(startParty)
}
