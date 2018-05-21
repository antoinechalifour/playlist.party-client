import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchBar from './SearchBar'

const iceServers = [
  { urls: 'stun:stun01.sipphone.com' },
  { urls: 'stun:stun.ekiga.net' },
  { urls: 'stun:stun.fwdnet.net' },
  { urls: 'stun:stun.ideasip.com' },
  { urls: 'stun:stun.iptel.org' },
  { urls: 'stun:stun.rixtelecom.se' }
]

export default class Guest extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
    guest: PropTypes.shape({
      party: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)

    this.pc = null
    this.dc = null

    this._prepareSocket()
    this._sendJoin(props.guest.party, props.guest.password)
  }

  _prepareSocket () {
    this.props.socket.on('signaling/offer', this._onOffer)
    this.props.socket.on('signaling/ice', this._onIceCandidate)
  }

  _prepareDataChannel (channel) {
    console.log(channel)
  }

  _onOffer = async ({ id: remoteId, description }) => {
    console.log('<--- OFFER')
    this.pc = new RTCPeerConnection({ iceServers })

    this.pc.onicecandidate = event => {
      if (!event.candidate) {
        return
      }

      this._sendIceCandidate(remoteId, event.candidate)
    }

    this.pc.ondatachannel = event => {
      this._prepareDataChannel(event.channel)
    }

    await this.pc.setRemoteDescription(description)

    const answer = await this.pc.createAnswer()
    this.pc.setLocalDescription(answer)

    this._sendAnswer(remoteId, answer)
  }

  _onIceCandidate = ({ candidate }) => {
    console.log('<--- ICE')
    this.pc.addIceCandidate(candidate)
  }

  _sendJoin = (party, password) => {
    console.log('---> JOIN')
    this.props.socket.emit('party/join', { party, password }, (_, err) => {
      console.log('DONE')
    })
  }

  _sendAnswer = (id, description) => {
    console.log('---> ANSWER')
    this.props.socket.emit('signaling/answer', { id, description })
  }

  _sendIceCandidate = (id, candidate) => {
    console.log('---> ICE')
    this.props.socket.emit('signaling/ice', { id, candidate })
  }

  render () {
    return (
      <div>
        <SearchBar />
      </div>
    )
  }
}
