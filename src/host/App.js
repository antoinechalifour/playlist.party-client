import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import createStore from './createStore'
import Party from './components/Party'

export default class Host extends Component {
  static propTypes = {
    party: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.store = createStore({
      initialState: {
        party: {
          name: this.props.party,
          code: this.props.code,
          accessToken: this.props.accessToken
        }
      },
      socket: this.props.socket
    })
  }

  render () {
    return (
      <Provider store={this.store}>
        <Party />
      </Provider>
    )
  }
}
