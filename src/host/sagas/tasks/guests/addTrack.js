import { call, put, select } from 'redux-saga/effects'
import { isBattleFull } from 'host/reducers'
import { addToQueue, addToBattle } from 'host/actions/tracks'
import fetchTrackInformation from '../spotify/fetchTrackInformation'

/**
 * Adds a track to the current battle.
 * @param {Object} track - The track id.
 */
export function * addTrackToBattle (track) {
  yield put(addToBattle(track))
}

/**
 * Adds a track to the queue.
 * @param {Object} track - The track id.
 */
export function * addTrackToQueue (track) {
  yield put(addToQueue(track))
}

/**
 * Adds a track to the appropriate queue.
 * @param {{ payload: { trackId: String } }} action
 */
export default function * addTrack (action) {
  const track = yield call(fetchTrackInformation, action.payload.trackId)
  const addToQueue = yield select(isBattleFull)

  if (addToQueue) {
    yield call(addTrackToQueue, track)
  } else {
    yield call(addTrackToBattle, track)
  }
}
