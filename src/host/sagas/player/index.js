import { call, fork, select, takeEvery } from 'redux-saga/effects'
import { getAccessToken } from 'host/reducers'
import watchPlayerState from './watchPlayerState'
import watchPlayerProgress from './watchPlayerProgress'
import { PLAY_TRACK } from 'host/actions/player'

export function * injectSpotifySdk () {
  console.log('Injecting SDK...')
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://sdk.scdn.co/spotify-player.js'
  document.body.appendChild(script)
}

export function * createPlayer () {
  console.log('Creating player...')
  const accessToken = yield select(getAccessToken)
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

export function * playTrackToSpotify (spotify, action) {
  yield call([spotify.player, spotify.player.play], action.track.uri)
}

export default function * root (spotify) {
  const sdkReady = new Promise(resolve => {
    window.onSpotifyWebPlaybackSDKReady = resolve
  })

  yield call(injectSpotifySdk)
  yield sdkReady
  const player = yield call(createPlayer)

  console.log('Watching player state...')
  yield fork(watchPlayerState, player)
  yield fork(watchPlayerProgress)

  yield takeEvery(PLAY_TRACK, playTrackToSpotify, spotify)
}
