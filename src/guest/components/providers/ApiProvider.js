import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import Socket from 'socket.io-client'
import createSignaling from 'guest/network/createSignaling'

const { Provider, Consumer } = createContext()

export class ApiProvider extends Component {
  static propTypes = {
    party: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.socket = Socket(process.env.REACT_APP_SIGNALING_URI)
    this.signaling = createSignaling(this.socket, this.onConnection)
    this.listeners = {}
    this.state = {
      isConnectedToSignaling: false,
      isConnected: false,
      party: this.props.party,
      code: this.props.code,
      battle: [],
      searchTracks: this.searchTracks,
      submitTrack: this.submitTrack,
      vote: this.vote,
      rename: this.rename
    }

    this.signaling.subscribe()
    this.signaling.init(
      this.props.party,
      this.props.code,
      this.onSignalingResult
    )
  }

  componentWillUnmount () {
    this.signaling.unsubscribe()
  }

  onSignalingResult = err => {
    if (err) {
    } else {
      this.setState({ isConnectedToSignaling: true })
    }
  }

  onConnection = connection => {
    this._connection = connection

    this._connection.on('battle/update', this._onBattleUpdate)

    this.setState({ isConnected: true })
  }

  _onBattleUpdate = ({ tracks: battle }) => this.setState({ battle })

  searchTracks = query =>
    new Promise(resolve => {
      this._connection.emit('search', { q: query }, ({ results }) =>
        resolve(results)
      )
    })

  submitTrack = trackId => this._connection.emit('track/add', { trackId })

  vote = trackId => this._connection.emit('battle/vote', { trackId })

  rename = username => this._connection.emit('guest/rename', { username })

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
