import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PlayerProvider } from 'components/PlayerContext'
import Party from './Party'

export default class Host extends Component {
  static propTypes = {
    host: PropTypes.shape({
      accessToken: PropTypes.string.isRequired,
      party: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)

    window.onSpotifyWebPlaybackSDKReady = this._setup

    this._injectSpotifySDK()

    this.state = {
      player: null
    }
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
      getOAuthToken: cb => cb(this.props.host.accessToken)
    })

    player.addListener('ready', () => this.setState({ player }))

    player.connect()
  }

  render () {
    return this.state.player
      ? <PlayerProvider player={this.state.player}>
        <Wrapper>
          <Party />
        </Wrapper>
      </PlayerProvider>
      : <div>Waiting for spotiry player...</div>
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;

  > * {
    flex: 1;
  }
`
