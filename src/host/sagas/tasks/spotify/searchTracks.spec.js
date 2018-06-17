import { call } from 'redux-saga/effects'
import getSpotifyClient from '../spotify/getSpotifyClient'
import searchTracks from './searchTracks'

test('Returns the results from the Spotify API', () => {
  const query = 'Bulls on p'
  const client = {
    search: jest.fn()
  }

  const gen = searchTracks(query)

  expect(gen.next().value).toEqual(call(getSpotifyClient))

  const next = gen.next(client)

  expect(next.value).toEqual(call([client, client.search], query))
  expect(next.done).toBe(true)
})
