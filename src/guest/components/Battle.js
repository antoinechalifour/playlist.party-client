import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import MdFavorite from 'react-icons/lib/md/favorite'
import Typography from 'core/components/Typography'
import { withApi } from 'guest/components/providers/ApiProvider'
import Contender from 'guest/components/Contender'

const Outer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
`

const Hint = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

// From: https://codepen.io/tvweinstock/pen/MOBXyO?page=1&
const heartAnimation = keyframes`
  0% { transform: scale3d( .75, .75, .75 ); }
  10% { transform: scale3d( .75, .75, .75 ); }
  20% { transform: scale3d( 1, 1, 1 ); }
  30% { transform: scale3d( .75, .75, .75 ); }
  40% { transform: scale3d( 1, 1, 1 ); }
  50% { transform: scale3d( .75, .75, .75 ); }
  60% { transform: scale3d( .75, .75, .75 ); }
  80% { transform: scale3d( .75, .75, .75 ); }
  100% { transform: scale3d( .75, .75, .75 ); }
`

const FavIcon = styled(MdFavorite)`
  font-size: 48px;
  margin-bottom: 24px;
  color: #fff;

  opacity: .25;
  animation: ${heartAnimation} 1.5s ease infinite;
`

class Battle extends Component {
  static propTypes = {
    api: PropTypes.shape({
      battle: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired
  }

  state = { currentVote: '' }

  onContenderClick = trackId => {
    this.setState({ currentVote: trackId })

    this.props.api.vote(trackId)
  }

  render () {
    const tracks = this.props.api.battle
    const displayHint = tracks.length < 2

    return (
      <Outer>
        {tracks.map(x => (
          <Contender
            key={x.id}
            track={x}
            isVoted={this.state.currentVote === x.id}
            onClick={this.onContenderClick}
          />
        ))}
        {displayHint &&
          <Hint>
            <FavIcon />
            <Typography reverse type='secondary'>
              Add your favorite track!
            </Typography>
          </Hint>}
      </Outer>
    )
  }
}

export default withApi(Battle)
