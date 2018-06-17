import { fork } from 'redux-saga/effects'
import Socket from 'socket.io-client'
import playerFlow from './flows/playerFlow'
import partyFlow from './flows/partyFlow'
import socketFlow from './flows/socketFlow'

export default function * root () {
  const socket = Socket(process.env.REACT_APP_SIGNALING_URI)

  yield fork(playerFlow)
  yield fork(socketFlow, socket)
  yield fork(partyFlow, socket)
}
