import { call, select } from 'redux-saga/effects'
import { getGuest } from 'host/reducers'
import searchTracksFromSpotify from 'host/sagas/tasks/spotify/searchTracks'

/**
 * Provides results to the guest search.
 * @param {{ payload: { q: String, requestId: String }, guestId: String }} action
 */
export default function * searchTracks (action) {
  const guest = yield select(getGuest, action.guestId)
  const results = yield call(searchTracksFromSpotify, action.payload.q)
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
