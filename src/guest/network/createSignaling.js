import iceServers from 'core/network/iceServers'
import createPeerSocket from 'core/network/createPeerSocket'

// TODO: Rename onPeerConnected and move the createPeerSocket to a model.
export default function createSignaling (socket, onPeerConnected) {
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

      onPeerConnected(createPeerSocket(_dataChannel))
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
