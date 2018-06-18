import { call, select, put } from 'redux-saga/effects'
import SpotifyApiFactory from 'core/network/spotifyApi'
import { getAccessToken } from 'host/reducers'
import { partyStatusFinished } from 'host/actions/party'

const handler = {
  get (target, key) {
    if (typeof target[key] === 'function') {
      return function * (...args) {
        try {
          return yield call(target[key], ...args)
        } catch (err) {
          if (err.response && err.response.status === 401) {
            yield put(partyStatusFinished())
          } else {
            throw err
          }
        }
      }
    } else if (typeof target[key] === 'object') {
      return new Proxy(target[key], handler)
    } else {
      return target[key]
    }
  }
}

export default function * getSpotifyClient () {
  const accessToken = yield select(getAccessToken)
  // return yield call(SpotifyApiFactory, { accessToken })
  const client = yield call(SpotifyApiFactory, { accessToken })

  return new Proxy(client, handler)
}
