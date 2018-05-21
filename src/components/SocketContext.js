import React, { createContext } from 'react'
import PropTypes from 'prop-types'

const context = createContext()

export function SocketProvider ({ socket, children }) {
  return (
    <context.Provider value={socket}>
      {children}
    </context.Provider>
  )
}

SocketProvider.propTypes = {
  socket: PropTypes.object.isRequired
}

export function withSocket (WrappedComponent) {
  return function WithSocket (props) {
    return (
      <context.Consumer>
        {socket => <WrappedComponent {...props} socket={socket} />}
      </context.Consumer>
    )
  }
}
