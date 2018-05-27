import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import createSignaling from './signaling'
import { ChannelProvider } from 'components/ChannelContext'
import SearchBar from './SearchBar'
import Battle from './Battle'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  > :last-child {
    flex: 1;
  }
`

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
