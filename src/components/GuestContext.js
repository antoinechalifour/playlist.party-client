import React, { Component, createContext } from 'react'
import qs from 'querystring'

const context = createContext()

export class GuestProvider extends Component {
  constructor (props) {
    super(props)

    const params = qs.parse(window.location.search.substr(1))

    this.state = {
      party: params.party,
      password: params.password
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

export function withGuest (WrappedComponent) {
  return function WithGuest (props) {
    return (
      <context.Consumer>
        {guest => <WrappedComponent {...props} guest={guest} />}
      </context.Consumer>
    )
  }
}
