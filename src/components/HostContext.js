import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'

const context = createContext()

export function HostProvider ({ host, children }) {
  return (
    <context.Provider value={host}>
      {children}
    </context.Provider>
  )
}

HostProvider.propTypes = {
  host: PropTypes.object.isRequired
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

export function connectToHost (WrappedComponent, getProps) {
  return withHost(
    class ConnectToHost extends Component {
      static propTypes = {
        host: PropTypes.object.isRequired
      }

      constructor (props) {
        super(props)

        this.state = {
          hostState: props.host.state
        }
        this.actions = props.host.actions

        this.unsubscribe = props.host.subscribe(this._onHostChange)
      }

      _onHostChange = hostState =>
        this.setState({
          hostState
        })

      componentWillUnmount () {
        this.unsubscribe()
      }

      render () {
        const props = getProps(this.state.hostState, this.actions)
        const { host, ...originalProps } = this.props
        return <WrappedComponent {...originalProps} {...props} />
      }
    }
  )
}
