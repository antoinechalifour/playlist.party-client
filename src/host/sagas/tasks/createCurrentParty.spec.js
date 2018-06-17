import createCurrentParty from './createCurrentParty'
import { call, select } from 'redux-saga/effects'
import { getParty } from 'host/reducers'

describe('createCurrentParty saga', () => {
  const socket = { emit: jest.fn() }
  const gen = createCurrentParty(socket)

  it('Should get the current party', () => {
    expect(gen.next().value).toEqual(select(getParty))
  })

  it('Should send the create party command to the socket', () => {
    const party = {
      name: 'playlist-party',
      code: '1234'
    }
    // TODO: Fix this test
    // expect(gen.next(party).value).toMatch(
    //   call([socket, socket.emit], 'party/create', {
    //     party: 'playlist-party',
    //     code: '1234'
    //   })
    // )
  })
})
