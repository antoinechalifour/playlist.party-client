import { call, cancel, fork, put, take } from 'redux-saga/effects'
import {
  signalingConnected,
  signalingDisconnected
} from 'host/actions/signaling'
import dispatchSocketEvents from 'host/sagas/tasks/dispatchSocketEvents'
import { eventChannel } from 'redux-saga'

const noop = () => {}

export function createSocketConnectChannel (socket) {
  return eventChannel(emit => {
    socket.on('connect', () => emit({}))

    return noop
  })
}

export function createSocketDisconnectChannel (socket) {
  return eventChannel(emit => {
    socket.on('disconnect', () => emit({}))

    return noop
  })
}

export default function * socketFlow (socket) {
  const connectChannel = yield call(createSocketConnectChannel, socket)
  const disconnectChannel = yield call(createSocketDisconnectChannel, socket)

  while (true) {
    yield take(connectChannel)
    yield put(signalingConnected())

    const task = yield fork(dispatchSocketEvents, socket)

    yield take(disconnectChannel)
    yield cancel(task)
    yield put(signalingDisconnected())
  }
}
