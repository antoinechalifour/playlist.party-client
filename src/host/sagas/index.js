import { fork, take, all, cancel } from 'redux-saga/effects'
import Socket from 'socket.io-client'
import playerFlow from './flows/playerFlow'
import partyFlow from './flows/partyFlow'
import socketFlow from './flows/socketFlow'
import { PARTY_STATUS_FINISHED } from 'host/actions/party'

export default function * root () {
  const socket = Socket(process.env.REACT_APP_SIGNALING_URI)

  const playerTask = yield fork(playerFlow)
  const socketTask = yield fork(socketFlow, socket)
  const partyTask = yield fork(partyFlow, socket)

  yield take(PARTY_STATUS_FINISHED)
  yield all([cancel(playerTask), cancel(socketTask), cancel(partyTask)])
}
