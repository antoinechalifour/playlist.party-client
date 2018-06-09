import { call } from 'redux-saga/effects'

/**
 * Creates a party on the server.
 * @param {SocketIOClient.Socket} socket The socket.
 * @param {{ name: String, code: String }} party The party to create.
 */
export default function * root (socket, party) {
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
