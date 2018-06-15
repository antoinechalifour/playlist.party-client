import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Socket from 'socket.io-client'
import { ChannelProvider } from './components/providers/Channel'
import { withGuest } from './components/providers/Guest'
import createSignaling from './network/createSignaling'
import SearchBar from './components/SearchBar'
import Battle from './components/Battle'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  > :last-child {
    flex: 1;
  }
`

class Guest extends Component {
  static propTypes = {
    guest: PropTypes.shape({
      party: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired
    }).isRequired
  }

  state = { channel: null }

  constructor (props) {
    super(props)

    this.socket = Socket(process.env.REACT_APP_SIGNALING_URI)
    this.signaling = createSignaling(this.socket, this._onChannel)

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
    console.log(channel)
    this.setState({ channel })
  }

  render () {
    if (!this.state.channel) {
      return <div>Connecting to party...</div>
    }
    return (
      <ChannelProvider channel={this.state.channel}>
        <Wrapper>
          <SearchBar />
          <Battle />
        </Wrapper>
      </ChannelProvider>
    )
  }
}

export default withGuest(Guest)
