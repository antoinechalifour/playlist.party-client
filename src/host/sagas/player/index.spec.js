import { call } from 'redux-saga/effects'
import { playTrack } from 'host/actions/player'
import { playTrackToSpotify } from '.'

describe('playTrackToSpotify()', () => {
  const spotify = {
    player: { play: jest.fn() }
  }
  const action = playTrack({
    id: '2',
    name: 'Never gonna give you up',
    uri: 'spotify:zepfihzeh'
  })
  const player = {
    _options: {
      id: 'toto'
    }
  }
  const gen = playTrackToSpotify(spotify, player, action)

  it('Should call the api to play the track', () => {
    expect(gen.next().value).toEqual(
      call([spotify.player, spotify.player.play], 'spotify:zepfihzeh', 'toto')
    )
    expect(gen.next().done).toBe(true)
  })
})