import { call } from 'redux-saga/effects'
import getSpotifyClient from './getSpotifyClient'
import fetchTrackInformation from './fetchTrackInformation'

const client = {
  tracks: {
    findOne: jest.fn()
  }
}

test('Fetches the track information', () => {
  const gen = fetchTrackInformation('my-track-uri')

  expect(gen.next().value).toEqual(call(getSpotifyClient))

  const next = gen.next(client)

  expect(next.value).toEqual(
    call([client.tracks, client.tracks.findOne], 'my-track-uri')
  )
  expect(next.done).toBe(true)
})
