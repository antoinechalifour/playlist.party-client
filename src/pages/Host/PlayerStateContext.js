import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'

const context = createContext()

export class PlayerStateProvider extends Component {
  static propTypes = {
    player: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.state = { playerState: null }

    props.player.getCurrentState().then(this._updateState)
    props.player.addListener('player_state_changed', this._updateState)
  }

  _updateState = playerState => this.setState({ playerState })

  render () {
    return (
      <context.Provider value={this.state.playerState}>
        {this.props.children}
      </context.Provider>
    )
  }
}

export function withPlayerState (WrappedComponent) {
  return function WithPlayerState (props) {
    return (
      <context.Consumer>
        {playerState => (
          <WrappedComponent {...props} playerState={playerState} />
        )}
      </context.Consumer>
    )
  }
}
