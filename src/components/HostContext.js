import React, { createContext, Component } from 'react'

const context = createContext()

export class HostContextProvider extends Component {
  constructor (props) {
    super(props)

    const params = new URLSearchParams(window.location.search.substr(1))

    this.state = {
      accessToken: params.get('accessToken'),
      party: params.get('party'),
      password: params.get('password'),
      startParty: this._startParty
    }
  }

  _startParty = (accessToken, party, password) =>
    this.setState({
      accessToken,
      party,
      password
    })

  render () {
    return (
      <context.Provider value={this.state}>
        {this.props.children}
      </context.Provider>
    )
  }
}

export function withHostContext (WrappedComponent) {
  return function WithHostContext (props) {
    return (
      <context.Consumer>
        {hostContext => (
          <WrappedComponent {...props} hostContext={hostContext} />
        )}
      </context.Consumer>
    )
  }
}
