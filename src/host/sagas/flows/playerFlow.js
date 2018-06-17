import { eventChannel } from 'redux-saga'
import { call, fork, put, select, take, takeEvery } from 'redux-saga/effects'
import { isPlayerAvailable, getPosition, getDuration } from 'host/reducers'
import {
  PLAY_TRACK,
  UPDATE_PLAYER_STATE,
  updatePlayerState
} from 'host/actions/player'
import injectPlaybackSdk from 'host/sagas/tasks/spotify/injectPlaybackSdk'
import createSpotifyPlayer from 'host/sagas/tasks/createSpotifyPlayer'
import playTrack from 'host/sagas/tasks/spotify/playTrack'
import { startProcessVote } from 'host/actions/tracks'

const delay = ms => new Promise(resolve => window.setTimeout(resolve, ms))

export function * watchPlayerProgress () {
  let readyForNextTrack = false
  let lastPosition = Number.MAX_VALUE

  while (true) {
    yield take(UPDATE_PLAYER_STATE)
    const hasPlayer = yield select(isPlayerAvailable)

    if (hasPlayer) {
      const { position, duration } = yield select(state => ({
        position: getPosition(state),
        duration: getDuration(state)
      }))

      if (position < lastPosition) {
        readyForNextTrack = false
      }

      lastPosition = position

      if (duration - position <= 2000 && !readyForNextTrack) {
        readyForNextTrack = true
        yield delay(1500)
        yield put(startProcessVote())
      }
    }
  }
}

export function * playTrackToSpotify (player, action) {
  yield call(playTrack, action.track.uri, player._options.id)
}

export function fetchPlayerState (player) {
  return eventChannel(emit => {
    const interval = window.setInterval(() => {
      player.getCurrentState().then(state => emit(updatePlayerState(state)))
    }, 500)

    return () => window.clearInterval(interval)
  })
}

export function * watchPlayerState (player) {
  const channel = yield call(fetchPlayerState, player)

  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

export default function * root () {
  const sdkReady = new Promise(resolve => {
    window.onSpotifyWebPlaybackSDKReady = resolve
  })

  yield call(injectPlaybackSdk)
  yield sdkReady
  const player = yield call(createSpotifyPlayer)

  console.log('Watching player state...')
  yield fork(watchPlayerState, player)
  yield fork(watchPlayerProgress)

  yield takeEvery(PLAY_TRACK, playTrackToSpotify, player)
}
