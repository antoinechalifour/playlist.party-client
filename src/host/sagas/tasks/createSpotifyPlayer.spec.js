import { select } from 'redux-saga/effects'
import { getAccessToken } from 'host/reducers'
import createSpotifyPlayer from './createSpotifyPlayer'
import { createClassInstance } from 'host/sagas/util'

class Player {
  addListener = jest.fn()
  connect = jest.fn()
}

beforeAll(() => {
  window.Spotify = { Player }
})

test('Returns a Spotify player', () => {
  const gen = createSpotifyPlayer()
  const accessToken = 'access-token'

  expect(gen.next().value).toEqual(select(getAccessToken))

  const promise = gen.next(accessToken).value

  expect(promise).toBeInstanceOf(Promise)

  const next = gen.next()
  expect(next.value).toBeInstanceOf(Player)
  expect(next.done).toBe(true)
})

afterAll(() => {
  delete window.Spotify
})
