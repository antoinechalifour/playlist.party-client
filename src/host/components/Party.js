import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withSocket } from 'core/components/providers/Socket'
import createSignaling from '../network/createSignaling'
import { connectToHost } from './providers/Host'
import Battle from './Battle'
import Queue from './Queue'
import Guests from './Guests'
import Player from './Player'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #151515;
`

class Party extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
    party: PropTypes.shape({
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired
    }).isRequired,
    player: PropTypes.object,
    addGuest: PropTypes.func.isRequired
  }

  state = {
    socketStatus: 'pending'
  }

  constructor (props) {
    super(props)

    this.signaling = createSignaling(props.socket, this.onGuest)

    this.signaling.subscribe()

    this.signaling.init(
      props.party.name,
      props.party.code,
      this._onSignalingReady
    )
  }

  _onSignalingReady = err => {
    if (err) {
      console.log('@Party: error during signaling:', err)
    } else {
      console.log('@Party: Done creating party.')
    }
  }

  onGuest = (connection, dataChannel) =>
    this.props.addGuest(connection, dataChannel)

  componentWillUnmount () {
    this.signaling.unsubscribe()
  }

  render () {
    return (
      <Wrapper>
        {this.props.player && <Player />}
        <Battle />
      </Wrapper>
    )
  }
}

export default withSocket(
  connectToHost(Party, (state, actions) => ({
    party: state.party,
    player: state.player,
    addGuest: actions.addGuest
  }))
)
