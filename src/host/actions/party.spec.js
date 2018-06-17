import {
  partyStatusCreating,
  partyStatusCreationError,
  partyStatusWaitingForTracks,
  partyStatusWaitingToStart,
  partyStatusFinished,
  partyStatusStarted,
  partyTokenExpired,
  startParty
} from 'host/actions/party'

test('partyStatusCreating', () => {
  expect(partyStatusCreating()).toEqual({
    type: 'PARTY_STATUS_CREATING'
  })
})

test('partyStatusCreationError', () => {
  expect(partyStatusCreationError()).toEqual({
    type: 'PARTY_STATUS_CREATION_ERROR'
  })
})

test('partyStatusWaitingForTracks', () => {
  expect(partyStatusWaitingForTracks()).toEqual({
    type: 'PARTY_STATUS_WAITING_FOR_TRACKS'
  })
})

test('partyStatusWaitingToStart', () => {
  expect(partyStatusWaitingToStart()).toEqual({
    type: 'PARTY_STATUS_WAITING_TO_START'
  })
})

test('partyStatusStarted', () => {
  expect(partyStatusStarted()).toEqual({
    type: 'PARTY_STATUS_STARTED'
  })
})

test('partyStatusFinished', () => {
  expect(partyStatusFinished()).toEqual({
    type: 'PARTY_STATUS_FINISHED'
  })
})

test('startParty', () => {
  expect(startParty()).toEqual({
    type: 'START_PARTY'
  })
})

test('partyTokenExpired', () => {
  expect(partyTokenExpired()).toEqual({
    type: 'PARTY_TOKEN_EXPIRED'
  })
})
