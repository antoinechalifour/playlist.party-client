import { call } from 'redux-saga/effects'
import injectPlaybackSdk from './injectPlaybackSdk'

test('Injects the playback SDK into the DOM', () => {
  const gen = injectPlaybackSdk()
  const script = {}

  expect(gen.next().value).toEqual(
    call([document, document.createElement], 'script')
  )
  expect(gen.next(script).value).toEqual(
    call([document.body, document.body.appendChild], script)
  )

  expect(script.type).toEqual('text/javascript')
  expect(script.src).toEqual('https://sdk.scdn.co/spotify-player.js')
})
