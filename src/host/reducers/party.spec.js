import reducer, {
  getAccessToken,
  getParty,
  getPartyStatus,
  isPartyReady
} from './party'
import {
  partyStatusCreationError,
  partyStatusWaitingForTracks,
  partyStatusWaitingToStart,
  partyStatusStarted,
  partyStatusFinished
} from 'host/actions/party'

const party = {
  name: 'Playlist party!',
  code: '1234',
  accessToken: 'my access token'
}

it('Should return the initial state', () => {
  const state = undefined
  const action = { type: '@@init' }

  expect(reducer(state, action)).toEqual(null)
})

it('Should handle PARTY_STATUS_CREATION_ERROR', () => {
  expect(reducer(party, partyStatusCreationError())).toEqual({
    name: 'Playlist party!',
    code: '1234',
    accessToken: 'my access token',
    status: 'STATUS_CREATION_ERROR'
  })
})

it('Should handle PARTY_STATUS_WAITING_FOR_TRACKS', () => {
  expect(reducer(party, partyStatusWaitingForTracks())).toEqual({
    name: 'Playlist party!',
    code: '1234',
    accessToken: 'my access token',
    status: 'STATUS_WAITING_FOR_TRACKS'
  })
})

it('Should handle PARTY_STATUS_WAITING_TO_START', () => {
  expect(reducer(party, partyStatusWaitingToStart())).toEqual({
    name: 'Playlist party!',
    code: '1234',
    accessToken: 'my access token',
    status: 'STATUS_WAITING_TO_START'
  })
})

it('Should handle PARTY_STATUS_STARTED', () => {
  expect(reducer(party, partyStatusStarted())).toEqual({
    name: 'Playlist party!',
    code: '1234',
    accessToken: 'my access token',
    status: 'STATUS_STARTED'
  })
})

it('Should handle PARTY_STATUS_FINISHED', () => {
  expect(reducer(party, partyStatusFinished())).toEqual({
    name: 'Playlist party!',
    code: '1234',
    accessToken: 'my access token',
    status: 'STATUS_FINISHED'
  })
})

describe('getAccessToken', () => {
  it('Should return the access token', () => {
    expect(getAccessToken(party)).toEqual('my access token')
  })
})

describe('getParty', () => {
  it('Should return the current party information', () => {
    expect(getParty(party)).toEqual({
      name: 'Playlist party!',
      code: '1234'
    })
  })
})

describe('getPartyStatus', () => {
  it('Should return the party status', () => {
    expect(
      getPartyStatus({
        name: 'Playlist party!',
        code: '1234',
        accessToken: 'my access token',
        status: 'STATUS_FINISHED'
      })
    ).toEqual('STATUS_FINISHED')
  })
})

describe('isPartyReady', () => {
  it('Should return true when the status is "STATUS_WAITING_TO_START"', () => {
    expect(
      isPartyReady({
        name: 'Playlist party!',
        code: '1234',
        accessToken: 'my access token',
        status: 'STATUS_WAITING_TO_START'
      })
    ).toEqual(true)
  })

  it('Should return false otherwise', () => {
    expect(
      isPartyReady({
        name: 'Playlist party!',
        code: '1234',
        accessToken: 'my access token',
        status: 'PARTY_STATUS_FINISHED'
      })
    ).toEqual(false)
  })
})
