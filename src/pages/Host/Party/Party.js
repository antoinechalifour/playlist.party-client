import React, { Component } from 'react'
import PropTypes from 'prop-types'

const iceServers = [
  { urls: 'stun:stun01.sipphone.com' },
  { urls: 'stun:stun.ekiga.net' },
  { urls: 'stun:stun.fwdnet.net' },
  { urls: 'stun:stun.ideasip.com' },
  { urls: 'stun:stun.iptel.org' },
  { urls: 'stun:stun.rixtelecom.se' }
]

export default class Party extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
    hostContext: PropTypes.shape({
      party: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired
    }).isRequired
  }

  state = {
    socketStatus: 'pending'
  }

  constructor (props) {
    super(props)

    this.pcs = {}
    this.dcs = {}

    this._prepareSocket()

    this._sendCreateParty(props.hostContext.party, props.hostContext.password)
  }

  _prepareSocket () {
    this.props.socket.on('signaling/join', this._onSignalingJoin)
    this.props.socket.on('signaling/answer', this._onSignalingAnswer)
    this.props.socket.on('signaling/ice', this._onIceCandidate)
  }

  _prepareDataChannel (channel) {
    console.log(channel)
  }

  _onSignalingJoin = async ({ id: remoteId }) => {
    console.log('<--- JOIN')
    this.pcs[remoteId] = new RTCPeerConnection({ iceServers })

    const pc = this.pcs[remoteId]

    this.dcs[remoteId] = pc.createDataChannel(`channel${remoteId}`)

    this._prepareDataChannel(this.dcs[remoteId])

    pc.onicecandidate = event => {
      if (!event.candidate) {
        return
      }

      this._sendIceCandidate(remoteId, event.candidate)
    }

    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)

    this._sendOffer(remoteId, offer)
  }

  _onSignalingAnswer = async ({ id: remoteId, description }) => {
    console.log('<--- ANSWER')
    const pc = this.pcs[remoteId]
    await pc.setRemoteDescription(description)
  }

  _onIceCandidate = ({ id: remoteId, candidate }) => {
    console.log('<--- ICE')
    const pc = this.pcs[remoteId]
    pc.addIceCandidate(candidate)
  }

  _sendIceCandidate = (id, candidate) => {
    console.log('---> ICE')
    this.props.socket.emit('signaling/ice', { id, candidate })
  }

  _sendOffer = (id, description) => {
    console.log('---> OFFER')
    this.props.socket.emit('signaling/offer', { id, description })
  }

  _sendCreateParty = (party, password) => {
    console.log('---> CREATE PARTY')
    this.props.socket.emit(
      'party/create',
      {
        party,
        password
      },
      (_, err) => {
        if (err) {
          this.setState({ socketStatus: 'error' })
        }
      }
    )
  }

  componentWillUnmount () {
    // TODO: Remove event listeners
  }

  render () {
    return <div>ezifhzeifh</div>
  }
}
