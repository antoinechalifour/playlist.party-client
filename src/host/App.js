import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import Party from './components/Party'
import createStore from './createStore'

export default class Host extends Component {
  static propTypes = {
    party: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.store = createStore({
      initialState: {
        party: {
          name: this.props.party,
          code: this.props.code,
          accessToken: this.props.accessToken
        }
      },
      socket: this.props.socket
    })

    // window.onSpotifyWebPlaybackSDKReady = this._setup

    // TODO: Move plaer creation to a middleware
    // this._injectSpotifySDK()
  }

  // _injectSpotifySDK () {
  //   const script = document.createElement('script')
  //   script.type = 'text/javascript'
  //   script.src = 'https://sdk.scdn.co/spotify-player.js'
  //   document.body.appendChild(script)
  // }

  // _setup = () => {
  //   const player = new window.Spotify.Player({
  //     name: 'PlaylistParty player',
  //     getOAuthToken: cb => cb(this.props.accessToken)
  //   })

  //   player.addListener('ready', () => this.props.setPlayer(player))

  //   player.connect()
  // }

  render () {
    return (
      <Provider store={this.store}>
        {/* <Party /> */}
        <div> hello</div>
      </Provider>
    )
  }
}
