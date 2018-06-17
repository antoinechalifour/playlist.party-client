import reducer, { getAccessToken, getParty } from './party'
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

describe('getAccessToken', () => {
  it('Should return the access token', () => {
    const state = {
      name: 'Party !',
      code: '1234',
      isStarted: true,
      accessToken: 'my access token'
    }

    expect(getAccessToken(state)).toEqual('my access token')
  })
})

describe('getParty', () => {
  it('Should return the current party information', () => {
    const state = {
      name: 'Party !',
      code: '1234',
      isStarted: false,
      accessToken: 'my access token'
    }

    expect(getParty(state)).toEqual({
      name: 'Party !',
      code: '1234',
      isStarted: false
    })
  })
})
