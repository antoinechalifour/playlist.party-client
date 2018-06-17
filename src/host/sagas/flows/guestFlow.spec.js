import { takeEvery } from 'redux-saga/effects'
import handleGuestSearch from 'host/sagas/tasks/handleGuestSearch'
import { ADD_GUEST, GUEST_READY } from 'host/actions/guests'
import addTrack from 'host/sagas/tasks/addTrack'
import watchGuestEvents from 'host/sagas/tasks/watchGuestEvents'
import initializeGuest from 'host/sagas/tasks/initializeGuest'
import guestFlow from './guestFlow'

describe('guestFlow', () => {
  const spotify = {}
  const gen = guestFlow(spotify)

  it('Should handle the guest flow', () => {
    // Should answer to guest searches
    expect(gen.next().value).toEqual(
      takeEvery('@guest/search', handleGuestSearch, spotify)
    )

    // Should answer to guest adding tracks
    expect(gen.next().value).toEqual(
      takeEvery('@guest/track/add', addTrack, spotify)
    )
  })
})
