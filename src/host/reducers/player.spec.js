import reducer, {
  getPlayer,
  isPlayerAvailable,
  getPosition,
  getDuration,
  getProgress,
  isPlaying,
  getCurrentTrack,
  getCurrentAlbum,
  getCurrentArtists
} from './player'
import * as actions from '../actions/player'

it('Should return the inital state', () => {
  const state = undefined
  const action = { type: '@@init' }

  expect(reducer(state, action)).toEqual(null)
})

it(`Should handle "${actions.UPDATE_PLAYER_STATE} (not null)"`, () => {
  const state = { foo: 'bar' }
  const action = actions.updatePlayerState({ fizz: 'buzz' })

  expect(reducer(state, action)).toEqual({ fizz: 'buzz' })
})

it(`Should handle "${actions.UPDATE_PLAYER_STATE} (null)"`, () => {
  const state = { foo: 'bar' }
  const action = actions.updatePlayerState(null)

  expect(reducer(state, action)).toEqual(null)
})

describe('getPlayer', () => {
  it('Should return the player state', () => {
    const state = {}

    expect(getPlayer(state)).toBe(state)
  })
})

describe('isPlayerAvailable', () => {
  it('Should return true if the player is not null', () => {
    const state = {}

    expect(isPlayerAvailable(state)).toBe(true)
  })

  it('Should return false if the player is null', () => {
    expect(isPlayerAvailable(null)).toBe(false)
  })
})

describe('getPosition', () => {
  it('Should return the player position', () => {
    const player = { position: 9876 }

    expect(getPosition(player)).toBe(9876)
  })
})

describe('getDuration', () => {
  it('Should return the player duration', () => {
    const player = { duration: 9999 }

    expect(getDuration(player)).toBe(9999)
  })
})

describe('getProgress', () => {
  it('Should return the player progress', () => {
    const player = {
      position: 500,
      duration: 1000
    }

    expect(getProgress(player)).toBe(0.5)
  })
})

describe('isPlaying', () => {
  it('Should return true if the player is not paused', () => {
    const player = {
      paused: false
    }

    expect(isPlaying(player)).toBe(true)
  })
})

const spotifyTrack = {
  track_window: {
    current_track: {
      id: 'my track id',
      name: 'Bulls on Parade',
      duration_ms: 1234,
      album: {
        uri: 'album uri',
        name: 'Evil Empire',
        images: [
          {
            url: 'http://spotify.com/cover'
          }
        ]
      },
      artists: [
        {
          uri: 'artist uri',
          name: 'Rage Against The Machine'
        }
      ]
    }
  }
}

describe('getCurrentTrack', () => {
  it('Should return the current track', () => {
    expect(getCurrentTrack(spotifyTrack)).toEqual({
      id: 'my track id',
      name: 'Bulls on Parade',
      durationMs: 1234
    })
  })
})

describe('getCurrentAlbum', () => {
  it('Should return the current album', () => {
    expect(getCurrentAlbum(spotifyTrack)).toEqual({
      id: 'album uri',
      name: 'Evil Empire',
      cover: 'http://spotify.com/cover'
    })
  })
})

describe('getCurrentArtists', () => {
  it('Shoudl return the current artists', () => {
    expect(getCurrentArtists(spotifyTrack)).toEqual([
      {
        id: 'artist uri',
        name: 'Rage Against The Machine'
      }
    ])
  })
})
