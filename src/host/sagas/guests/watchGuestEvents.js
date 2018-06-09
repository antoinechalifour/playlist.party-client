import { eventChannel } from 'redux-saga'
import { call, fork, put, select, take } from 'redux-saga/effects'
import { getGuest } from 'host/reducers'

const noop = () => {}

/**
 * Creates an event channel for the data channel.
 * @param {RTCDataChannel} dataChannel - The data channel.
 */
export function * subscribeToDataChannelEvents (dataChannel) {
  return eventChannel(emit => {
    dataChannel.onmessage = event => {
      const { type, payload } = JSON.parse(event.data)

      emit({
        type: `@guest/${type}`,
        payload
      })
    }

    return noop
  })
}

/**
 *
 * @param {{ id: String, dataChannel: RTCDataChannel }} guest - The guest.
 */
export function * readFromGuest (guest) {
  const channel = yield call(subscribeToDataChannelEvents, guest.dataChannel)

  while (true) {
    const action = yield take(channel)
    yield put({ ...action, guestId: guest.id })
  }
}

/**
 * Watches new guests to watch their events.
 * @param {{ id: String }} action - The addGuest action.
 */
export default function * root (action) {
  const guest = yield select(getGuest(action.id))

  yield fork(readFromGuest, guest)
}
