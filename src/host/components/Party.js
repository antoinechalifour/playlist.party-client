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
`

const Header = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.dark};
  padding: 24px;
  padding-bottom: 48px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .25);
`

const Body = styled.main`
  flex: 1;
  display: flex;

  > :nth-child(2) {
    flex: 1;
  }

  > :first-child,
  > :last-child {
    width: 300px;
  }
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
        <Header>{this.props.party.name} / {this.props.party.code}</Header>
        <Body>
          <Guests />
          <Battle />
          <Queue />
        </Body>
        {this.props.player && <Player />}
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
