import { eventChannel } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'
import { updatePlayerState } from 'host/actions/player'

export function * fetchPlayerState (player) {
  return eventChannel(emit => {
    const interval = window.setInterval(() => {
      player.getCurrentState().then(state => emit(updatePlayerState(state)))
    }, 3000)

    return () => window.clearInterval(interval)
  })
}

export default function * root (player) {
  const channel = yield call(fetchPlayerState, player)

  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}
