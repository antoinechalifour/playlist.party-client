import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createSignaling from './signaling'
import SearchBar from './SearchBar'

export default class Guest extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
    guest: PropTypes.shape({
      party: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)

    this.signaling = createSignaling(props.socket)

    this.signaling.subscribe()
    this.signaling.init(
      props.guest.party,
      props.guest.code,
      this._onSignalingReady
    )
  }

  _onSignalingReady = err => {
    if (err) {
      // TODO: Handle error state
    }

    // TODO: Handle normal state
  }

  render () {
    return (
      <div>
        <SearchBar />
      </div>
    )
  }
}
