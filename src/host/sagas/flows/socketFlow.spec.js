import { call, put, take, fork, cancel } from 'redux-saga/effects'
import {
  signalingConnected,
  signalingDisconnected
} from 'host/actions/signaling'
import watchSocketStatus, {
  createSocketConnectChannel,
  createSocketDisconnectChannel
} from './socketFlow'
import dispatchSocketEvents from 'host/sagas/tasks/dispatchSocketEvents'
import { createMockTask } from 'redux-saga/utils'

// describe('createSocketConnectChannel', () => {
//   const socket = {
//     on: jest.fn()
//   }
//   const emit = jest.fn()

//   it('Should create the event channel', () => {
//     const channel = createSocketConnectChannel(socket)(emit)

//     expect(socket.on.mock.calls.length).toBe(1)
//     expect(socket.on.mock.calls[0]).toEqual(['connect', emit])
//   })
// })
// describe('createSocketDisconnectChannel', () => {
//   const socket = {
//     on: jest.fn()
//   }
//   const emit = jest.fn()

//   it('Should create the event channel', () => {
//     const channel = createSocketDisconnectChannel(socket)(emit)

//     expect(socket.on.mock.calls.length).toBe(1)
//     expect(socket.on.mock.calls[0]).toEqual(['disconnect', emit])
//   })
// })

describe('socketFlow', () => {
  const socket = {}
  const task = createMockTask()
  const connectChannel = 'CONNECT_CHANNEL'
  const disconnectChannel = 'DISCONNECT_CHANNEL'
  const gen = watchSocketStatus(socket)

  it('Should run the flow', () => {
    expect(gen.next().value).toEqual(call(createSocketConnectChannel, socket))
    expect(gen.next(connectChannel).value).toEqual(
      call(createSocketDisconnectChannel, socket)
    )
    expect(gen.next(disconnectChannel).value).toEqual(take(connectChannel))
    expect(gen.next().value).toEqual(put(signalingConnected()))
    expect(gen.next().value).toEqual(fork(dispatchSocketEvents, socket))
    expect(gen.next(task).value).toEqual(take(disconnectChannel))
    expect(gen.next().value).toEqual(cancel(task))
    expect(gen.next().value).toEqual(put(signalingDisconnected()))
    expect(gen.next(disconnectChannel).value).toEqual(take(connectChannel))
    expect(gen.next().value).toEqual(put(signalingConnected()))
    expect(gen.next().done).toBe(false)
  })
})
