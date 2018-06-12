import { call, select } from 'redux-saga/effects'
import { getGuest } from 'host/reducers'

/**
 * Provides results to the guest search.
 * @param {{ search: Function }} spotify
 * @param {{ payload: { q: String, requestId: String }, guestId: String }} action
 */
export default function * handleGuestSearch (spotify, action) {
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
