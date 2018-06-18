import { put } from 'redux-saga/effects'
import { partyStatusFinished } from 'host/actions/party'

export default function * endPartyWhenUnauthorized (effect) {
  try {
    return yield effect
  } catch (err) {
    if (err.response && err.response.status === 401) {
      yield put(partyStatusFinished())
    }
  }
}
