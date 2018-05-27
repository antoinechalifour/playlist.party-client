import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { PlayerProvider } from 'components/PlayerContext'
import Party from './Party'

export default class Host extends Component {
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

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;

  > * {
    flex: 1;
  }
`
