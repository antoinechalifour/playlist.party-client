import { takeEvery } from 'redux-saga/effects'
import handleGuestSearch from 'host/sagas/tasks/handleGuestSearch'
import addTrack from 'host/sagas/tasks/addTrack'

export default function * guestFlow (spotify) {
  yield takeEvery('@guest/search', handleGuestSearch, spotify)
  yield takeEvery('@guest/track/add', addTrack, spotify)

  // TODO: Add @guest/vote
}
