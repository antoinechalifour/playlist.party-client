import { call, select } from 'redux-saga/effects'
import { getParty } from 'host/reducers'

/**
 * Creates a party on the server.
 * @param {SocketIOClient.Socket} socket The socket.
 */
export default function * createCurrentParty (socket) {
  const party = yield select(getParty)
  yield call(
    [socket, socket.emit],
    'party/create',
    {
      party: party.name,
      code: party.code
    },
    () => console.log('Party created')
  )
}
