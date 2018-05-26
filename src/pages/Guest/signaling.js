import iceServers from 'core/iceServers'
import createDataChannelEmitter from 'core/dataChannelEmitter'

export default function createSignaling (socket, onChannel) {
  let _connection
  let _dataChannel

  async function onOffer ({ remoteId, description }) {
    console.log('<-- offer', remoteId)
    _connection = new RTCPeerConnection({ iceServers })

    _connection.onicecandidate = event => {
      if (event.candidate) {
        console.log('--> candidate')
        socket.emit('signaling/candidate', {
          remoteId,
          candidate: event.candidate
        })
      }
    }

    _connection.ondatachannel = event => {
      _dataChannel = event.channel

      onChannel(createDataChannelEmitter(_dataChannel))
    }

    await _connection.setRemoteDescription(description)

    const localDescription = await _connection.createAnswer()

    await _connection.setLocalDescription(localDescription)

    console.log('--> answer', remoteId)
    socket.emit('signaling/answer', {
      remoteId,
      description: localDescription
    })
  }

  function onCandidate ({ candidate }) {
    console.log('<-- candidate')
    _connection.addIceCandidate(candidate)
  }

  return {
    init (party, code, cb) {
      socket.emit('party/join', { party, code }, cb)
    },
    subscribe () {
      socket.on('signaling/offer', onOffer)
      socket.on('signaling/candidate', onCandidate)
    },
    unsubscribe () {
      socket.off('signaling/offer', onOffer)
      socket.off('signaling/candidate', onCandidate)
    }
  }
}
