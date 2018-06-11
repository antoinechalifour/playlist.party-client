import reducer from './party'
import * as actions from '../actions/party'

it('Should return the initial state', () => {
  const state = undefined
  const action = { type: '@@init' }

  expect(reducer(state, action)).toEqual(null)
})

it(`Should handle "${actions.PARTY_READY}"`, () => {
  const state = {
    name: 'Playlist party',
    code: '1234',
    accessToken: 'testtoken',
    isStarted: false
  }

  expect(reducer(state, actions.partyReady())).toEqual({
    name: 'Playlist party',
    code: '1234',
    accessToken: 'testtoken',
    isStarted: true
  })
})
