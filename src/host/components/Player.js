import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connectToHost } from './providers/Host'

const Wrapper = styled.div`
  padding: 24px;
  padding-top: 48px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .5);
  background: rgba(0, 0, 0, .1);
  text-align: center;

  > :last-child {
    font-size: 90%;
    opacity: .75;
  }
`

class Player extends Component {
  static propTypes = {
    player: PropTypes.object.isRequired,
    spotify: PropTypes.object.isRequired,
    processVote: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)

    this.state = {
      playerState: null
    }

    props.player.addListener('player_state_changed', this._updatePlayerState)
    props.player.getCurrentState().then(this._updatePlayerState)

    this._fetchPlayerState()
    props.spotify.player.transferPlayback(props.player._options.id)

    this.interval = window.setInterval(() => this._fetchPlayerState(), 500)
  }

  _fetchPlayerState = () =>
    this.props.player.getCurrentState().then(this._updatePlayerState)

  _updatePlayerState = playerState => this.setState({ playerState })

  componentWillUnmount () {
    if (this.interval) {
      window.clearInterval(this.interval)
    }

    if (this.timeout) {
      window.clearTimeout(this.timeout)
    }
  }

  componentDidUpdate (_, prevState) {
    if (!this.state.playerState) {
      return
    } else {
      if (this.state.playerState.position === 0) {
        this.timeout = null
      }
      if (this.timeout) {
        return
      }
    }

    const { duration, position } = this.state.playerState
    const timeLeft = duration - position

    console.log(timeLeft)

    if (timeLeft < 2000) {
      this.timeout = window.setTimeout(() => {
        this.props.processVote()
      }, 1500)
    }
  }

  render () {
    return (
      <Wrapper>
        {this.state.playerState
          ? <Fragment>
            <div>
              {this.state.playerState.track_window.current_track.name}
            </div>
            <div>
              {this.state.playerState.track_window.current_track.artists
                  .map(x => x.name)
                  .join(', ')}
            </div>
          </Fragment>
          : <div>Nothing playing</div>}
      </Wrapper>
    )
  }
}

export default connectToHost(Player, (state, actions) => ({
  player: state.player,
  spotify: state.spotify,
  processVote: actions.processVote
}))
