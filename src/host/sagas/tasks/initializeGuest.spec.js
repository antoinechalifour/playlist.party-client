import { call, select } from 'redux-saga/effects'
import { getContenders } from 'host/reducers'
import initializeGuest from './initializeGuest'

describe('initializeGuest saga', () => {
  const action = {
    id: 'user-1'
  }
  const gen = initializeGuest(action)
  const guest = {
    dataChannel: {
      send: jest.fn()
    }
  }
  const contenders = [
    {
      id: '0',
      name: 'Dawn of Victory'
    },
    {
      id: '2',
      name: 'Happy'
    }
  ]

  it('Should send the current contenders to the new guest', () => {
    // Skip the guest selection: TODO: Fix the selector for testing
    gen.next()

    expect(gen.next(guest).value).toEqual(select(getContenders))
    expect(gen.next(contenders).value).toEqual(
      call(
        [guest.dataChannel, guest.dataChannel.send],
        JSON.stringify({
          type: 'battle/update',
          payload: {
            tracks: contenders
          }
        })
      )
    )
  })
})
