import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connectToHost } from './components/providers/Host'
import Party from './components/Party'

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;

  > * {
    flex: 1;
  }
`

class Host extends Component {
  static propTypes = {
    accessToken: PropTypes.string.isRequired,
    setPlayer: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    window.onSpotifyWebPlaybackSDKReady = this._setup

    this._injectSpotifySDK()
  }

  _injectSpotifySDK () {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    document.body.appendChild(script)
  }

  _setup = () => {
    const player = new window.Spotify.Player({
      name: 'PlaylistParty player',
      getOAuthToken: cb => cb(this.props.accessToken)
    })

    player.addListener('ready', () => this.props.setPlayer(player))

    player.connect()
  }

  render () {
    return (
      <Wrapper>
        <Party />
      </Wrapper>
    )
  }
}

export default connectToHost(Host, (state, actions) => ({
  accessToken: state.accessToken,
  setPlayer: actions.setPlayer
}))
