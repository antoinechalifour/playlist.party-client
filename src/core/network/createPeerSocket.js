import { v4 as uuid } from 'uuid'

export default function createPeerSocket (dataChannel, connection) {
  const _handlers = {}
  const _callbackQueue = {}
  const socket = {
    get status () {
      return connection.iceConnectionState
    },
    emit (eventName, payload, cb = null) {
      const message = {
        type: eventName,
        payload
      }

      if (cb) {
        message.payload.requestId = uuid()
        _callbackQueue[message.payload.requestId] = cb
      }

      dataChannel.send(JSON.stringify(message))
    },
    on (eventName, handler) {
      _handlers[eventName] = _handlers[eventName] || []

      _handlers[eventName].push(handler)
    },

    off (eventName, handler) {
      _handlers[eventName] = _handlers[eventName].filter(x => x !== handler)
    }
  }

  dataChannel.onmessage = event => {
    try {
      const { type, payload } = JSON.parse(event.data)
      const { requestId } = payload

      if (_callbackQueue[requestId]) {
        const handler = _callbackQueue[requestId]

        delete _callbackQueue[requestId]

        return handler(payload)
      }

      if (!_handlers[type]) {
        return
      }

      _handlers[type].forEach(handler =>
        handler(payload, response => {
          socket.emit('@@response', {
            ...response,
            requestId
          })
        })
      )
    } catch (err) {
      // Ignore message
    }
  }

  return socket
}
