import { call, select } from 'redux-saga/effects'
import SpotifyApiFactory from 'core/network/spotifyApi'
import { getAccessToken } from 'host/reducers'
import getSpotifyClient from './getSpotifyClient'

test('Returns an API client with the current accessToken', () => {
  const gen = getSpotifyClient()
  const accessToken = 'access-token'

  expect(gen.next().value).toEqual(select(getAccessToken))
  expect(gen.next(accessToken).value).toEqual(
    call(SpotifyApiFactory, {
      accessToken: 'access-token'
    })
  )
})
