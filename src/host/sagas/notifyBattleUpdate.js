import { call, select } from 'redux-saga/effects'
import { getAllChannels, getContenders } from 'host/reducers'

/**
 * Notifies all guests that the current battle has changed.
 */
export default function * notifyBattleUpdate () {
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
