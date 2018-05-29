import iceServers from 'core/network/iceServers'

export default function createSignaling (socket, onPeerConnected) {
  const _guests = {}

  async function onJoin ({ remoteId }) {
    console.log('<-- join', remoteId)
    const connection = new RTCPeerConnection({ iceServers })
    const dataChannel = connection.createDataChannel(`channel/${remoteId}`)

    dataChannel.onopen = () => onPeerConnected(connection, dataChannel)

    connection.onicecandidate = event => {
      if (event.candidate) {
        console.log('--> candidate')
        socket.emit('signaling/candidate', {
          remoteId,
          candidate: event.candidate
        })
      }
    }

    const localDescription = await connection.createOffer()

    await connection.setLocalDescription(localDescription)

    console.log('--> offer', remoteId)
    socket.emit('signaling/offer', {
      remoteId,
      description: localDescription
    })

    _guests[remoteId] = {
      connection,
      dataChannel
    }
  }

  function onLeave ({ remoteId }) {
    console.log('<-- leave', remoteId)

    if (!_guests[remoteId]) {
      return
    }

    _guests[remoteId].connection.close()

    delete _guests[remoteId]
  }

  function onAnswer ({ remoteId, description }) {
    console.log('<-- answer', remoteId)
    _guests[remoteId].connection.setRemoteDescription(description)
  }

  function onCandidate ({ remoteId, candidate }) {
    console.log('<-- candidate', remoteId)
    _guests[remoteId].connection.addIceCandidate(candidate)
  }

  return {
    init (party, code, cb) {
      socket.emit('party/create', { party, code }, cb)
    },
    subscribe () {
      socket.on('signaling/join', onJoin)
      socket.on('signaling/leave', onLeave)
      socket.on('signaling/answer', onAnswer)
      socket.on('signaling/candidate', onCandidate)
    },
    unsubscribe () {
      socket.off('signaling/join', onJoin)
      socket.off('signaling/leave', onLeave)
      socket.off('signaling/answer', onAnswer)
      socket.off('signaling/candidate', onCandidate)
    }
  }
}
