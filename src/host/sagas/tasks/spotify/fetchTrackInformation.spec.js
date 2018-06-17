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
  expect(gen.next(client).value).toEqual(
    call([client.tracks, client.tracks.findOne], 'my-track-uri')
  )
  expect(gen.next().done).toBe(true)
})
