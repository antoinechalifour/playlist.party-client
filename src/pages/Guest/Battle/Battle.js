import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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

export default class Battle extends Component {
  static propTypes = {
    channel: PropTypes.object.isRequired
  }

  state = {
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
      <Track onClick={() => this._vote(track)}>
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

  _vote = track => this.props.channel.emit('battle/vote', { trackId: track.id })

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
