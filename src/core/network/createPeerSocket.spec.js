import createPeerSocket from './createPeerSocket'

describe('#emit()', () => {
  it('Should send a stringified message to the dataChannel', () => {
    const dataChannel = {
      send: jest.fn()
    }
    const socket = createPeerSocket(dataChannel)
    const payload = { foo: 'bar' }

    socket.emit('test/event', payload)

    expect(dataChannel.send.mock.calls.length).toEqual(1)
    expect(dataChannel.send.mock.calls[0]).toEqual([
      JSON.stringify({
        type: 'test/event',
        payload
      })
    ])
  })
})

describe('#on()', () => {
  it('Should be triggered when a matching emit is called', () => {
    const dataChannel = {}
    const socket = createPeerSocket(dataChannel)
    const handler = jest.fn()

    socket.on('test/event', handler)

    dataChannel.onmessage({
      data: JSON.stringify({
        type: 'test/event',
        payload: JSON.stringify({ foo: 'bar' })
      })
    })
    dataChannel.onmessage({
      data: JSON.stringify({
        type: 'ignored/event',
        payload: JSON.stringify({})
      })
    })

    expect(handler.mock.calls.length).toEqual(1)
    expect(handler.mock.calls[0][0]).toEqual(JSON.stringify({ foo: 'bar' }))
  })
})

// TODO: Test emit with callbacks
