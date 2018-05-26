import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'

const context = createContext()

export function HostProvider ({ party, code, accessToken, children }) {
  return (
    <context.Provider value={{ party, code, accessToken }}>
      {children}
    </context.Provider>
  )
}

HostProvider.propTypes = {
  party: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired
}

export function withHost (WrappedComponent) {
  return function WithHost (props) {
    return (
      <context.Consumer>
        {host => <WrappedComponent {...props} host={host} />}
      </context.Consumer>
    )
  }
}
