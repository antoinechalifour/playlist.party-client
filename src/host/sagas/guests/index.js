import { call, put, select, takeEvery } from 'redux-saga/effects'
import { ADD_GUEST, GUEST_READY } from 'host/actions/guests'
import { addToQueue, addToBattle } from 'host/actions/tracks'
import {
  getGuest,
  isBattleFull,
  getAllChannels,
  getContenders
} from 'host/reducers'
import watchGuestEvents from './watchGuestEvents'

/**
 * Provides results to the guest search.
 * @param {{ search: Function }} spotify
 * @param {{ payload: { q: String, requestId: String }, guestId: String }} action
 */
export function * search (spotify, action) {
  const results = yield call([spotify, spotify.search], action.payload.q)
  const guest = yield select(getGuest(action.guestId))
  const message = {
    type: '@@response',
    payload: {
      requestId: action.payload.requestId,
      results
    }
  }

  yield call(
    [guest.dataChannel, guest.dataChannel.send],
    JSON.stringify(message)
  )
}

export function * notifyGuests () {
  const channels = yield select(getAllChannels)
  const contenders = yield select(getContenders)

  const message = {
    type: 'battle/update',
    payload: {
      tracks: contenders
    }
  }
  for (const channel of channels) {
    yield call([channel, channel.send], JSON.stringify(message))
  }
}

/**
 * Adds a track to the appropriate queue
 * @param {{ tracks: { findOne: Function }}} spotify
 * @param {{ payload: { trackId: String }, guestId: String }} action
 */
export function * addTrack (spotify, action) {
  const track = yield call(
    [spotify.tracks, spotify.tracks.findOne],
    action.payload.trackId
  )

  const shouldAddToQueue = yield select(isBattleFull)

  if (shouldAddToQueue) {
    yield put(addToQueue(track))
  } else {
    yield put(addToBattle(track))
  }

  yield call(notifyGuests)
}

/**
 * Setups the new guest.
 * @param {{ id: String }} action - The addGuest action.
 */
export function * setupGuest (action) {
  const guest = yield select(getGuest(action.id))
  const contenders = yield select(getContenders)

  const message = {
    type: 'battle/update',
    payload: {
      tracks: contenders
    }
  }

  yield call(
    [guest.dataChannel, guest.dataChannel.send],
    JSON.stringify(message)
  )
}

export default function * root (spotify) {
  yield takeEvery(ADD_GUEST, watchGuestEvents)
  yield takeEvery(GUEST_READY, setupGuest)
  yield takeEvery('@guest/search', search, spotify)
  yield takeEvery('@guest/track/add', addTrack, spotify)
}
