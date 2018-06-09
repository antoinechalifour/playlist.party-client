import { call, fork, select, takeEvery } from 'redux-saga/effects'
import { getParty } from 'host/reducers'
import createParty from './createParty'
import readFromSocket from './readFromSocket'
import watchNewGuest from './watchNewGuest'

export default function * root (socket) {
  yield fork(watchNewGuest, socket)
  yield fork(readFromSocket, socket)

  const party = yield select(getParty)

  yield call(createParty, socket, party)
}
