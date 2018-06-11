import { call, take } from 'redux-saga/effects'
import { START_PARTY } from 'host/actions/party'
import startParty from 'host/sagas/party/startParty'

export default function * root () {
  yield take(START_PARTY)
  yield call(startParty)
}
