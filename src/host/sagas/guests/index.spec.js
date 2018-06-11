import { search, notifyGuests, addTrack, setupGuest } from '.'
import { call, put, select } from 'redux-saga/effects'
import {
  getGuest,
  getAllChannels,
  getContenders,
  isBattleFull
} from 'host/reducers'
import { cloneableGenerator } from 'redux-saga/utils'
import { addToQueue, addToBattle } from 'host/actions/tracks'

describe('search saga', () => {
  const spotify = { search: jest.fn() }
  const action = {
    guestId: '1',
    payload: {
      requestId: 'azerty',
      q: 'Rick Astley'
    }
  }

  const results = [{ foo: 'bar' }]
  const guest = {
    id: '1',
    dataChannel: { send: jest.fn() }
  }

  const gen = search(spotify, action)

  it('Should search for results using the spotify instance', () => {
    expect(gen.next().value).toEqual(
      call([spotify, spotify.search], 'Rick Astley')
    )
  })

  it('Should send the results to the guest', () => {
    gen.next(results)
    expect(gen.next(guest).value).toEqual(
      call(
        [guest.dataChannel, guest.dataChannel.send],
        JSON.stringify({
          type: '@@response',
          payload: {
            requestId: 'azerty',
            results: [{ foo: 'bar' }]
          }
        })
      )
    )
  })
})

describe('notifyGuests saga', () => {
  const gen = notifyGuests()
  const channels = [
    {
      send: jest.fn()
    },
    {
      send: jest.fn()
    }
  ]
  const contenders = [
    {
      id: '0',
      name: 'Never gonna give you up'
    },
    {
      id: '1',
      name: 'The trooper'
    }
  ]

  it('Should get all channels', () => {
    expect(gen.next().value).toEqual(select(getAllChannels))
  })

  it('Should get all contenders', () => {
    expect(gen.next(channels).value).toEqual(select(getContenders))
  })

  it('Should send the contenders to all channels', () => {
    const message = {
      type: 'battle/update',
      payload: {
        tracks: contenders
      }
    }
    expect(gen.next(contenders).value).toEqual(
      call([channels[0], channels[0].send], JSON.stringify(message))
    )
    expect(gen.next(contenders).value).toEqual(
      call([channels[1], channels[1].send], JSON.stringify(message))
    )
    expect(gen.next().done).toBe(true)
  })
})

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
      expect(clone.next().value).toEqual(call(notifyGuests))
    })
  })
})

describe('setupGuest saga', () => {
  const action = {
    id: 'user-1'
  }
  const gen = setupGuest(action)
  const guest = {
    dataChannel: {
      send: jest.fn()
    }
  }
  const contenders = [
    {
      id: '0',
      name: 'Dawn of Victory'
    },
    {
      id: '2',
      name: 'Happy'
    }
  ]

  it('Should send the current contenders to the new guest', () => {
    // Skip the guest selection: TODO: Fix the selector for testing
    gen.next()

    expect(gen.next(guest).value).toEqual(select(getContenders))
    expect(gen.next(contenders).value).toEqual(
      call(
        [guest.dataChannel, guest.dataChannel.send],
        JSON.stringify({
          type: 'battle/update',
          payload: {
            tracks: contenders
          }
        })
      )
    )
  })
})
