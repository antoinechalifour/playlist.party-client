import { select } from 'redux-saga/effects'
import { getAccessToken } from 'host/reducers'

export default function * createSpotifyPlayer () {
  const accessToken = yield select(getAccessToken)

  // FIXME: This is not testable
  const player = new window.Spotify.Player({
    name: 'PlaylistParty player',
    getOauthToken: cb => cb(accessToken)
  })

  yield new Promise(resolve => {
    player.addListener('ready', resolve)
    player.connect()
  })

  return player
}
