import { call, select } from 'redux-saga/effects'
import { getParty } from 'host/reducers'

/**
 * Sends the command to create a party on the remote server
 * and return a Promise resolved when created.
 * @param {SocketIOClient.Socket} socket - The socket.
 * @param {{ name: String, code: String }} party - The party to create.
 */
export function createPartyOnServer (socket, party) {
  return new Promise((resolve, reject) => {
    socket.emit(
      'party/create',
      {
        party: party.name,
        code: party.code
      },
      err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
}

/**
 * Creates a party on the server.
 * @param {SocketIOClient.Socket} socket The socket.
 */
export default function * createCurrentParty (socket) {
  const party = yield select(getParty)
  yield call(createPartyOnServer, socket, party)
}
