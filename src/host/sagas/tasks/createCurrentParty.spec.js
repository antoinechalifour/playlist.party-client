import { call, select } from 'redux-saga/effects'
import { getParty } from 'host/reducers'
import createCurrentParty, { createPartyOnServer } from './createCurrentParty'

test('createPartyOnServer - Resolves the promise when the server did not return an error', async () => {
  const socket = {
    emit: jest.fn((eventName, handler, ack) => ack())
  }
  const party = {
    name: 'Playlist.party',
    code: '1234'
  }

  await createPartyOnServer(socket, party)
  expect(socket.emit.mock.calls.length).toBe(1)
  expect(socket.emit.mock.calls[0][0]).toEqual('party/create')
  expect(socket.emit.mock.calls[0][1]).toEqual({
    party: 'Playlist.party',
    code: '1234'
  })
})

test('createPartyOnServer - Rejects the promise when the server returned an error', async () => {
  expect.assertions(1)
  const socket = {
    emit: jest.fn((eventName, handler, ack) => {
      const error = new Error('Could not create party')
      ack(error)
    })
  }
  const party = {
    name: 'Playlist.party',
    code: '1234'
  }

  try {
    await createPartyOnServer(socket, party)
  } catch (err) {
    expect(err.message).toBe('Could not create party')
  }
})

test('Creates the current party', () => {
  const socket = {}
  const party = {
    name: 'Playlist.party',
    code: '1234'
  }

  const gen = createCurrentParty(socket)

  expect(gen.next().value).toEqual(select(getParty))
  expect(gen.next(party).value).toEqual(
    call(createPartyOnServer, socket, party)
  )
})
