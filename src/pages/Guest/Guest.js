import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createSignaling from './signaling'
import { ChannelProvider } from 'components/ChannelContext'
import SearchBar from './SearchBar'

export default class Guest extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
    guest: PropTypes.shape({
      party: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired
    }).isRequired
  }

  state = { channel: null }

  constructor (props) {
    super(props)

    this.signaling = createSignaling(props.socket, this._onChannel)

    this.signaling.subscribe()
    this.signaling.init(
      props.guest.party,
      props.guest.code,
      this._onSignalingReady
    )
  }

  _onSignalingReady = err => {
    if (err) {
      // TODO: Handle error state
    }

    // TODO: Handle normal state
  }

  _onChannel = channel => {
    this.setState({ channel })
  }

  render () {
    if (!this.state.channel) {
      return <div>Connecting to party...</div>
    }
    return (
      <ChannelProvider channel={this.state.channel}>
        <SearchBar />
      </ChannelProvider>
    )
  }
}
