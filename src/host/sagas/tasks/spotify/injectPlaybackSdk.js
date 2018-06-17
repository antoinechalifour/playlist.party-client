import { call } from 'redux-saga/effects'

export default function * injectPlaybackSdk () {
  const script = yield call([document, document.createElement], 'script')
  script.type = 'text/javascript'
  script.src = 'https://sdk.scdn.co/spotify-player.js'

  yield call([document.body, document.body.appendChild], script)
}
