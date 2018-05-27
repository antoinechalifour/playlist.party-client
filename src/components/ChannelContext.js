import React, { createContext } from 'react'

const context = createContext()

export function ChannelProvider ({ channel, children }) {
  return (
    <context.Provider value={channel}>
      {children}
    </context.Provider>
  )
}

export function withChannel (WrappedComponent) {
  return function WithChannel (props) {
    return (
      <context.Consumer>
        {channel => <WrappedComponent {...props} channel={channel} />}
      </context.Consumer>
    )
  }
}
