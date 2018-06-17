import { call, select, put } from 'redux-saga/effects'
import { isBattleFull } from 'host/reducers'
import { addToBattle, addToQueue } from 'host/actions/tracks'
import fetchTrackInformation from '../spotify/fetchTrackInformation'
import addTrack, { addTrackToBattle, addTrackToQueue } from './addTrack'

test('addTrack - Adds the track to the battle if a spot is available', () => {
  const action = {
    payload: { trackId: 'track-id' }
  }
  const track = {
    id: 'track-id'
  }

  const gen = addTrack(action)

  expect(gen.next().value).toEqual(call(fetchTrackInformation, 'track-id'))

  expect(gen.next(track).value).toEqual(select(isBattleFull))
  expect(gen.next(false).value).toEqual(call(addTrackToBattle, track))
})

test('addTrack - Adds the track to the queue if no spot if available', () => {
  const action = {
    payload: { trackId: 'track-id' }
  }
  const track = {
    id: 'track-id'
  }

  const gen = addTrack(action)

  expect(gen.next().value).toEqual(call(fetchTrackInformation, 'track-id'))

  expect(gen.next(track).value).toEqual(select(isBattleFull))
  expect(gen.next(true).value).toEqual(call(addTrackToQueue, track))
})

test('addTrackToBattle - Adds the track to the current battle', () => {
  const track = {
    id: 'my-track-id'
  }
  const gen = addTrackToBattle(track)

  expect(gen.next().value).toEqual(put(addToBattle(track)))
})

test('addTrackToQueue - Adds the track to the queue', () => {
  const track = {
    id: 'my-track-id'
  }
  const gen = addTrackToQueue(track)

  expect(gen.next().value).toEqual(put(addToQueue(track)))
})
