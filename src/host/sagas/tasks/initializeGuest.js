import { call, select } from 'redux-saga/effects'
import { getContenders, getGuest } from 'host/reducers'

/**
 * Setups the new guest.
 * @param {{ id: String }} action - The addGuest action.
 */
export default function * initializeGuest (action) {
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
