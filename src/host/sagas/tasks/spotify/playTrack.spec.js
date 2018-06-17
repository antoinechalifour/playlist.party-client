import playTrack from './playTrack'
import { call } from 'redux-saga/effects'
import getSpotifyClient from 'host/sagas/tasks/spotify/getSpotifyClient'

test('Plays a track using the Spotify API', () => {
  const trackId = 'track-id'
  const playerId = 'player-id'
  const client = {
    player: {
      play: jest.fn()
    }
  }

  const gen = playTrack(trackId, playerId)

  expect(gen.next().value).toEqual(call(getSpotifyClient))

  const next = gen.next(client)

  expect(next.value).toEqual(
    call([client.player, client.player.play], trackId, playerId)
  )
  expect(next.done).toBe(true)
})
