import { eventChannel, END } from 'redux-saga'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import {
  SIGNALING_IN_JOIN,
  SIGNALING_IN_ANSWER,
  SIGNALING_IN_CANDIDATE
} from 'host/actions/signaling'
import iceServers from 'core/network/iceServers'
import { getGuest } from 'host/reducers'
import { addGuest, removeGuest, guestReady } from 'host/actions/guests'

const noop = () => {}

/**
 * Sends the local description to a guest.
 * @param {SocketIOClient.Socket} socket - The server connection.
 * @param {String} remoteId - The remote guest id.
 * @param {String} description - The local description.
 */
export function * sendOffer (socket, remoteId, description) {
  yield call([socket, socket.emit], 'signaling/offer', {
    remoteId,
    description
  })
}

/**
 * Sends a local ICE candidate to a guest.
 * @param {SocketIOClient.Socket} socket - The server connection.
 * @param {String} remoteId - The remote guest id.
 * @param {String} candidate - The local ice candidate.
 */
export function * sendCandidate (socket, remoteId, candidate) {
  yield call([socket, socket.emit], 'signaling/candidate', {
    remoteId,
    candidate
  })
}

/**
 * Initiates the peer connection process.
 * @param {SocketIOClient.Socket} socket - The socket to emit to.
 * @param {{ type: String, remoteId: String }} action - The join action.
 */
export function * onJoin (socket, action) {
  console.log('<-- ON JOIN')
  const connection = new RTCPeerConnection({ iceServers })
  const dataChannel = connection.createDataChannel(`channel/${action.remoteId}`)
  const localDescription = yield call([connection, connection.createOffer])
  const localCandidatesChannel = eventChannel(emit => {
    connection.onicecandidate = e => {
      if (e.candidate) {
        emit(e.candidate)
      } else {
        emit(END)
      }
    }

    return noop
  })

  yield takeEvery(
    localCandidatesChannel,
    sendCandidate,
    socket,
    action.remoteId
  )
  yield call([connection, connection.setLocalDescription], localDescription)
  yield call(sendOffer, socket, action.remoteId, localDescription)
  yield put(
    addGuest(
      action.remoteId,
      `Anonymous-${action.remoteId}`,
      connection,
      dataChannel
    )
  )

  yield new Promise(resolve => (dataChannel.onopen = resolve))

  yield put(guestReady(action.remoteId))

  yield new Promise(resolve => (dataChannel.onclose = resolve))

  yield put(removeGuest(action.remoteId))
}

/**
 * Sets the remote description for the given guest.
 * @param {{ remoteId: String, description: String }} action - The answer action.
 */
export function * onAnswer (action) {
  console.log('<-- ON ANSWER')
  const guest = yield select(getGuest(action.remoteId))

  if (guest) {
    yield call(
      [guest.connection, guest.connection.setRemoteDescription],
      action.description
    )
  }
}

/**
 * Sets the remote ICE candidate for the given guest.
 * @param {{ remoteId: String, candidate: String }} action - The candidate action.
 */
export function * onCandidate (action) {
  console.log('<-- ON CANDIDATE')
  const guest = yield select(getGuest(action.remoteId))

  if (guest) {
    yield call(
      [guest.connection, guest.connection.addIceCandidate],
      action.candidate
    )
  }
}

/**
 * Starts sub-sagas for handling the signaling process when a new
 * guest joins the party.
 * @param {SocketIOClient.Socket} socket - The server connection.
 */
export default function * signaling (socket) {
  yield takeEvery(SIGNALING_IN_JOIN, onJoin, socket)
  yield takeEvery(SIGNALING_IN_ANSWER, onAnswer)
  yield takeEvery(SIGNALING_IN_CANDIDATE, onCandidate)
}
