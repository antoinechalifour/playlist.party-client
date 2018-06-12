import { call, put, select } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import addTrack from './addTrack'
import { isBattleFull } from 'host/reducers'
import { addToQueue, addToBattle } from 'host/actions/tracks'
import notifyBattleUpdate from './notifyBattleUpdate'

describe('addTrack saga', () => {
  const spotify = {
    tracks: {
      findOne: jest.fn()
    }
  }
  const action = {
    payload: {
      trackId: 'track-1'
    }
  }
  const track = {
    id: '12',
    name: 'Dawn of Victory'
  }
  const gen = cloneableGenerator(addTrack)(spotify, action)

  describe('when the battle is full', () => {
    const clone = gen.clone()

    it('Should fetch the track from spotify', () => {
      expect(clone.next().value).toEqual(
        call([spotify.tracks, spotify.tracks.findOne], 'track-1')
      )
    })

    it('Should add the track to the queue', () => {
      expect(clone.next(track).value).toEqual(select(isBattleFull))
      expect(clone.next(true).value).toEqual(put(addToQueue(track)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('when a spot in the battle is available', () => {
    const clone = gen.clone()

    it('Should fetch the track from spotify', () => {
      expect(clone.next().value).toEqual(
        call([spotify.tracks, spotify.tracks.findOne], 'track-1')
      )
    })

    it('Should add the track to the queue', () => {
      expect(clone.next(track).value).toEqual(select(isBattleFull))
      expect(clone.next(false).value).toEqual(put(addToBattle(track)))
      expect(clone.next().value).toEqual(call(notifyBattleUpdate))
    })
  })
})
