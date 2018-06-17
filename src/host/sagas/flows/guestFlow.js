import { takeEvery } from 'redux-saga/effects'
import { ADD_TO_BATTLE } from 'host/actions/tracks'
import notifyBattleUpdate from 'host/sagas/tasks/notifyBattleUpdate'
import searchTracks from 'host/sagas/tasks/guests/searchTracks'
import addTrack from 'host/sagas/tasks/guests/addTrack'

export default function * guestFlow (spotify) {
  yield takeEvery('@guest/search', searchTracks)
  yield takeEvery('@guest/track/add', addTrack)
  yield takeEvery(ADD_TO_BATTLE, notifyBattleUpdate)
}
