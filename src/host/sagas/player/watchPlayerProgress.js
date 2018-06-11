import { put, select, take } from 'redux-saga/effects'
import { UPDATE_PLAYER_STATE } from 'host/actions/player'
import { isPlayerAvailable, getPosition, getDuration } from 'host/reducers'
import { triggerVote } from 'host/actions/tracks'

const delay = ms => new Promise(resolve => window.setTimeout(resolve, ms))

export default function * root () {
  let readyForNextTrack = false
  let lastPosition = Number.MAX_VALUE

  while (true) {
    const action = yield take(UPDATE_PLAYER_STATE)
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
        yield put(triggerVote())
      }
    }
  }
}
