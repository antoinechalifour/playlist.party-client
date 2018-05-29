import React, { createContext } from 'react'
import PropTypes from 'prop-types'

const context = createContext()

// TODO: Refactor the guest model into a Store subsclass
export function GuestProvider ({ party, code, children }) {
  return (
    <context.Provider value={{ party, code }}>
      {children}
    </context.Provider>
  )
}

GuestProvider.propTypes = {
  party: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired
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
