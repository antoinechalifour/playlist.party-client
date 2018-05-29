import { v4 as uuid } from 'uuid'

export default function createPeerSocket (dataChannel) {
  const _handlers = {}
  const _callbackQueue = {}
  const emitter = {
    emit (eventName, payload, cb = null) {
      const message = {
        type: eventName,
        ...payload
      }

      if (cb) {
        message.requestId = uuid()
        _callbackQueue[message.requestId] = cb
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
      console.log(event.data)
      const { type, requestId, ...payload } = JSON.parse(event.data)

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
          emitter.emit('@@response', {
            ...response,
            requestId
          })
        })
      )
    } catch (err) {
      // Ignore message
    }
  }

  return emitter
}
