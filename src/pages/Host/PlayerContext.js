import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'

const context = createContext()

export class PlayerProvider extends Component {
  static propTypes = {
    player: PropTypes.object.isRequired
  }

  render () {
    return (
      <context.Provider value={this.props.player}>
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
