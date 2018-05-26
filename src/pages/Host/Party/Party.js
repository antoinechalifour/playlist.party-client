import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createSignaling from './signaling'

export default class Party extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
    host: PropTypes.shape({
      party: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired
    }).isRequired
  }

  state = {
    socketStatus: 'pending'
  }

  constructor (props) {
    super(props)

    this.signaling = createSignaling(props.socket)

    this.signaling.subscribe()

    this.signaling.init(
      props.host.party,
      props.host.code,
      this._onSignalingReady
    )
  }

  _onSignalingReady = err => {
    if (err) {
      // TODO: Display an error message
    } else {
      // TODO: Commit state
    }
  }

  componentWillUnmount () {
    this.signaling.unsubscribe()
  }

  render () {
    return <div>ezifhzeifh</div>
  }
}
