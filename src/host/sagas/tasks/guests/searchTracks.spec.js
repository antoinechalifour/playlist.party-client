import { call, select } from 'redux-saga/effects'
import { getGuest } from 'host/reducers'
import searchTracksFromSpotify from 'host/sagas/tasks/spotify/searchTracks'
import searchTracks from './searchTracks'

test('Provides results to the guest search', () => {
  const action = {
    payload: {
      q: 'Bulls on p',
      requestId: 'request-id'
    },
    guestId: 'guest-id'
  }
  const results = ['a', 'b']
  const guest = {
    dataChannel: {
      send: jest.fn()
    }
  }

  const gen = searchTracks(action)

  expect(gen.next().value).toEqual(select(getGuest, 'guest-id'))
  expect(gen.next(guest).value).toEqual(
    call(searchTracksFromSpotify, 'Bulls on p')
  )

  expect(gen.next(results).value).toEqual(
    call(
      [guest.dataChannel, guest.dataChannel.send],
      JSON.stringify({
        type: '@@response',
        payload: {
          requestId: 'request-id',
          results
        }
      })
    )
  )
})
