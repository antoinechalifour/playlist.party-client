import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'

const context = createContext()

export class PlayerProvider extends Component {
  static propTypes = {
    player: PropTypes.shape({
      getCurrentState: PropTypes.func.isRequired,
      addListener: PropTypes.func.isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      player: props.player
    }
  }

  render () {
    return (
      <context.Provider value={this.state}>
        {this.props.children}
      </context.Provider>
    )
  }
}

export function withPlayer (WrappedComponent) {
  return function WithPlayer (props) {
    return (
      <context.Consumer>
        {player => <WrappedComponent {...props} player={player} />}
      </context.Consumer>
    )
  }
}
