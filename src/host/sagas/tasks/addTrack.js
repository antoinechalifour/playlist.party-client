import { call, put, select } from 'redux-saga/effects'
import { isBattleFull } from 'host/reducers'
import { addToQueue, addToBattle } from 'host/actions/tracks'
import notifyBattleUpdate from './notifyBattleUpdate'

/**
 * Adds a track to the appropriate queue
 * @param {{ tracks: { findOne: Function }}} spotify
 * @param {{ payload: { trackId: String }, guestId: String }} action
 */
export default function * addTrack (spotify, action) {
  const track = yield call(
    [spotify.tracks, spotify.tracks.findOne],
    action.payload.trackId
  )
  const shouldAddToQueue = yield select(isBattleFull)
  if (shouldAddToQueue) {
    yield put(addToQueue(track))
  } else {
    yield put(addToBattle(track))
    yield call(notifyBattleUpdate)
  }
}
