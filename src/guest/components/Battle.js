import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { withChannel } from './providers/Channel'

const Tracks = styled.ul`
  display: flex;
  flex-direction: column;
  background: #151515;
  color: #fff;
`

const Track = styled.li`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;


  ${({ active, theme }) => active && css`
    ::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border: solid 4px ${theme.colors.primary};
      background: rgba(255, 255, 255, .2);
    }
  `}
  
  > div {
    position: relative;
  }
  
  > :first-child {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    opacity: .2;
  }

  > :nth-child(2) {
    font-size: 2rem;
  }

  > :last-child {
    opacity: .75;
    font-size: 90%;
  }
`

// TODO: Move channel stuff to a guest model.
class Battle extends Component {
  static propTypes = {
    channel: PropTypes.object.isRequired
  }

  state = {
    currentVote: '',
    tracks: []
  }

  constructor (props) {
    super(props)

    props.channel.on('battle/update', this._onBattleUpdate)
  }

  _onBattleUpdate = ({ tracks }) => {
    this.setState({ tracks })
  }

  _renderTrack (track) {
    return (
      <Track
        active={this.state.currentVote === track.id}
        onClick={() => this._vote(track)}
      >
        <div
          style={{
            backgroundImage: `url(${track.album.images[0].url})`
          }}
        />
        <div>{track.name}</div>
        <div>{track.artists.map(x => x.name).join(', ')}</div>
      </Track>
    )
  }

  _vote = track => {
    this.setState({ currentVote: track.id })
    this.props.channel.emit('battle/vote', { trackId: track.id })
  }

  render () {
    if (this.state.tracks.length === 0) {
      return <div>Empty queue</div>
    }

    return (
      <Tracks>
        {this.state.tracks.map(x => this._renderTrack(x))}
      </Tracks>
    )
  }
}

export default withChannel(Battle)
