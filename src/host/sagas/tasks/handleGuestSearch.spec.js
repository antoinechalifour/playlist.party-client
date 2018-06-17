import { call } from 'redux-saga/effects'
import handleGuestSearch from './handleGuestSearch'

describe('handleGuestSearch saga', () => {
  const spotify = { search: jest.fn() }
  const action = {
    guestId: '1',
    payload: {
      requestId: 'azerty',
      q: 'Rick Astley'
    }
  }

  const results = [{ foo: 'bar' }]
  const guest = {
    id: '1',
    dataChannel: { send: jest.fn() }
  }

  const gen = handleGuestSearch(spotify, action)

  it('Should search for results using the spotify instance', () => {
    expect(gen.next().value).toEqual(
      call([spotify, spotify.search], 'Rick Astley')
    )
  })

  it('Should send the results to the guest', () => {
    gen.next(results)
    expect(gen.next(guest).value).toEqual(
      call(
        [guest.dataChannel, guest.dataChannel.send],
        JSON.stringify({
          type: '@@response',
          payload: {
            requestId: 'azerty',
            results: [{ foo: 'bar' }]
          }
        })
      )
    )
  })
})
