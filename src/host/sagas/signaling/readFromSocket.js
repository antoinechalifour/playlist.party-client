import { eventChannel } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'
import {
  signalingInJoin,
  signalingInLeave,
  signalingInAnswer,
  signalingInCandidate
} from 'host/actions/signaling'

/**
 * Creates an event channel for server-sent actions.
 * @param {SocketIOClient.Socket} socket The socket to listen to.
 */
export function * subscribeToSocketEvents (socket) {
  return eventChannel(emit => {
    const onJoin = ({ remoteId }) => emit(signalingInJoin(remoteId))
    const onLeave = ({ remoteId }) => emit(signalingInLeave(remoteId))
    const onAnswer = ({ remoteId, description }) =>
      emit(signalingInAnswer(remoteId, description))
    const onCandidate = ({ remoteId, candidate }) =>
      emit(signalingInCandidate(remoteId, candidate))

    socket.on('signaling/join', onJoin)
    socket.on('signaling/leave', onLeave)
    socket.on('signaling/answer', onAnswer)
    socket.on('signaling/candidate', onCandidate)

    return () => {
      socket.off('signaling/join', onJoin)
      socket.off('signaling/leave', onLeave)
      socket.off('signaling/answer', onAnswer)
      socket.off('signaling/candidate', onCandidate)
    }
  })
}

/**
 * Maps events from the socket channel to actions dispatched to the store.
 * @param {SocketIOClient.Socket} socket The socket.
 */
export default function * root (socket) {
  const channel = yield call(subscribeToSocketEvents, socket)

  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}
