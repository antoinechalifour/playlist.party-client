import endPartyWhenUnauthorized
  from 'host/sagas/tasks/spotify/endPartyWhenUnauthorized'
import { call, put } from 'redux-saga/effects'
import { partyStatusFinished } from 'host/actions/party'

test('Does nothing when the API does not throw', () => {
  function * fn () {
    yield 1
  }
  const gen = endPartyWhenUnauthorized(call(fn))

  expect(gen.next().value).toEqual(call(fn))
  expect(gen.next().done).toBe(true)
})

test('Dispatches party_finished when the API throws 401', () => {
  const err = new Error('Unauthorized')
  err.response = { status: 401 }
  function * fn () {
    yield 1
  }
  const gen = endPartyWhenUnauthorized(call(fn))
  expect(gen.next().value).toEqual(call(fn))
  expect(gen.throw(err).value).toEqual(put(partyStatusFinished()))
})
