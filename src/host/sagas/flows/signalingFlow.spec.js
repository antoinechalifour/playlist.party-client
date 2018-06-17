jest.mock('host/reducers', () => {
  function noop () {}
  return {
    getGuest: function getGuest () {
      return noop
    }
  }
})

import { call, select } from 'redux-saga/effects'
import { getGuest } from 'host/reducers'
import { cloneableGenerator } from 'redux-saga/utils'
import {
  sendOffer,
  sendCandidate,
  onAnswer,
  onCandidate
} from './signalingFlow'

const socket = {
  emit: jest.fn()
}

describe('signaling saga', () => {
  describe('sendOffer', () => {
    const gen = sendOffer(socket, 'user-id', 'my sdp description')

    it('Should send the description to the socket', () => {
      expect(gen.next().value).toEqual(
        call([socket, socket.emit], 'signaling/offer', {
          remoteId: 'user-id',
          description: 'my sdp description'
        })
      )
    })
  })

  describe('sendCandidate', () => {
    const gen = sendCandidate(socket, 'user-id', 'my ice candidate')

    it('Should send the candidate to the socket', () => {
      expect(gen.next().value).toEqual(
        call([socket, socket.emit], 'signaling/candidate', {
          remoteId: 'user-id',
          candidate: 'my ice candidate'
        })
      )
    })
  })

  // describe('onJoin', () => {
  //   // TODO: This method is not testable. Refactor it!
  //   expect(true).toBe(false)
  // })

  describe('onAnswer', () => {
    const gen = cloneableGenerator(onAnswer)({
      remoteId: 'my user id',
      description: 'my sdp description'
    })

    it('Should find the guest with the remoteId', () => {
      // TODO: Fix this failing test with anonymous function
      expect(gen.next().value).toEqual(select(getGuest('my user id')))
    })

    it('Should do nothing when the guest is not found', () => {
      const clone = gen.clone()

      expect(clone.next().done).toBe(true)
    })

    it('Should set the remote description otherwise', () => {
      const clone = gen.clone()
      const guest = {
        connection: {
          setRemoteDescription: jest.fn()
        }
      }

      expect(clone.next(guest).value).toEqual(
        call(
          [guest.connection, guest.connection.setRemoteDescription],
          'my sdp description'
        )
      )
    })
  })

  describe('onCandidate', () => {
    const gen = cloneableGenerator(onCandidate)({
      remoteId: 'my user id',
      candidate: 'my ice candidate'
    })

    it('Should find the guest with the remoteId', () => {
      // TODO: Fix this failing test with anonymous functions
      expect(gen.next().value).toEqual(select(getGuest('my user id')))
    })

    it('Should do nothing when the guest is not found', () => {
      const clone = gen.clone()

      expect(clone.next().done).toBe(true)
    })

    it('Should add the ice candidate otherwise', () => {
      const clone = gen.clone()
      const guest = {
        connection: {
          addIceCandidate: jest.fn()
        }
      }

      expect(clone.next(guest).value).toEqual(
        call(
          [guest.connection, guest.connection.addIceCandidate],
          'my ice candidate'
        )
      )
    })
  })
})
