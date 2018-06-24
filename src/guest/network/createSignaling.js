import iceServers from 'core/network/iceServers'
import createPeerSocket from 'core/network/createPeerSocket'

export default function createSignaling (socket, onPeerConnected, onPartyOver) {
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

      onPeerConnected(createPeerSocket(_dataChannel, _connection))
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

  function onLeave () {
    onPartyOver()
  }

  function joinWithAccessToken (party, code) {
    const key = window.btoa(`${party}:${code}`)
    const oldAccessToken = window.localStorage.getItem(key) || null

    return new Promise((resolve, reject) => {
      socket.emit(
        'party/join',
        { party, code, accessToken: oldAccessToken },
        (err, data) => {
          if (err) {
            window.localStorage.removeItem(key)
            return reject(err)
          }

          window.localStorage.setItem(key, data.accessToken)
          resolve()
        }
      )
    })
  }

  function joinWithoutAccessToken (party, code) {
    const key = window.btoa(`${party}:${code}`)
    return new Promise((resolve, reject) => {
      socket.emit('party/join', { party, code }, (err, data) => {
        if (err) {
          return reject(err)
        }

        window.localStorage.setItem(key, data.accessToken)
        resolve()
      })
    })
  }

  return {
    async init (party, code, cb) {
      try {
        await joinWithAccessToken(party, code)
        cb()
      } catch (ignored) {
        try {
          await joinWithoutAccessToken(party, code)
          cb()
        } catch (err) {
          cb(err)
        }
      }
    },
    subscribe () {
      socket.on('signaling/offer', onOffer)
      socket.on('signaling/candidate', onCandidate)
      socket.on('signaling/leave', onLeave)
    },
    unsubscribe () {
      socket.off('signaling/offer', onOffer)
      socket.off('signaling/candidate', onCandidate)
      socket.off('signaling/leave', onLeave)
    }
  }
}
