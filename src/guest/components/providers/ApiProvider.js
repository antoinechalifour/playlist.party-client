import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import Socket from 'socket.io-client'
import createSignaling from 'guest/network/createSignaling'

const { Provider, Consumer } = createContext()

export const STATUS_CONNECTING_TO_SERVER = 'CONNECTING_TO_SERVER'
export const STATUS_CONNECTING_TO_HOST = 'CONNECTING_TO_HOST'
export const STATUS_READY = 'READY'
export const STATUS_PARTY_OVER = 'PARTY_OVER'
export const STATUS_ERROR = 'ERROR'

export class ApiProvider extends Component {
  static propTypes = {
    party: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      status: STATUS_CONNECTING_TO_SERVER,
      signalingError: null,
      party: this.props.party,
      code: this.props.code,
      battle: [],
      searchTracks: this.searchTracks,
      submitTrack: this.submitTrack,
      vote: this.vote,
      rename: this.rename
    }
    this.emitQueue = []

    this.startSignaling()
  }

  componentWillUnmount () {
    this.signaling.unsubscribe()
    this.socket.disconnect()
  }

  startSignaling = () => {
    if (this.socket) {
      this.socket.disconnect()
    }

    this.socket = Socket(process.env.REACT_APP_SIGNALING_URI)
    this.signaling = createSignaling(
      this.socket,
      this.onConnection,
      this.onPartyOver
    )
    this.signaling.subscribe()
    this.signaling.init(
      this.props.party,
      this.props.code,
      this.onSignalingResult
    )
  }

  onSignalingResult = err => {
    if (err) {
      this.setState({
        status: STATUS_ERROR,
        signalingError: err
      })
    } else {
      this.setState({ status: STATUS_CONNECTING_TO_HOST })
    }
  }

  onConnection = connection => {
    this._connection = connection

    this._connection.on('battle/update', this._onBattleUpdate)

    this.setState({ status: STATUS_READY })

    let args
    while ((args = this.emitQueue.shift())) {
      this._connection.emit(...args)
    }
  }

  onPartyOver = () => this.setState({ status: STATUS_PARTY_OVER })

  _onBattleUpdate = ({ tracks: battle }) => this.setState({ battle })

  searchTracks = query =>
    new Promise(resolve => {
      this.safeEmit('search', { q: query }, ({ results }) => resolve(results))
    })

  submitTrack = trackId => this.safeEmit('track/add', { trackId })

  vote = trackId => this.safeEmit('battle/vote', { trackId })

  rename = username => this.safeEmit('guest/rename', { username })

  safeEmit = (...args) => {
    if (this._connection.status === 'closed') {
      this.emitQueue.push(args)
      this.startSignaling()
    } else {
      this._connection.emit(...args)
    }
  }

  render () {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}

export function withApi (WrappedComponent) {
  return function WithApi (props) {
    return (
      <Consumer>
        {api => <WrappedComponent {...props} api={api} />}
      </Consumer>
    )
  }
}
