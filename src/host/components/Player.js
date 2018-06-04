import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Typography from 'core/components/Typography'
import { connectToHost } from './providers/Host'

const Wrapper = styled.div`
  padding: 24px;
  color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .5);
  background: rgba(0, 0, 0, .8);
  text-align: center;
  position: relative;
  z-index: 1;

  > :last-child {
    font-size: 90%;
    opacity: .75;
  }
`

const Progress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: #1db954;
  transition: width .1s ease-out;
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

    // TODO: Move the player logic outside of this component
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
            <Progress
              style={{
                width: `${this.state.playerState.position / this.state.playerState.duration * 100}%`
              }}
              />
            <Typography reverse>
              {this.state.playerState.track_window.current_track.name}
            </Typography>
            <Typography reverse type='secondary'>
              {this.state.playerState.track_window.current_track.artists
                  .map(x => x.name)
                  .join(', ')}
            </Typography>
          </Fragment>
          : <Typography reverse type='secondary'>Nothing playing</Typography>}
      </Wrapper>
    )
  }
}

export default connectToHost(Player, (state, actions) => ({
  player: state.player,
  spotify: state.spotify,
  processVote: actions.processVote
}))
