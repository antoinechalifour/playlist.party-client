import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'
import Typography from 'core/components/Typography'
import { SpotifyTrack } from 'core/propTypes'
import { getAlbumCover, getArtistsAsHumanFormat } from 'core/helpers/tracks'

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  10% { opacity: 0; }
  20% { opacity: 1; }
  30% { opacity: 0; }
  40% { opacity: 1; }
  50% { opacity: 0; }
  60% { opacity: 1; }
  80% { opacity: 0; }
  100% { opacity: 1; }
`

const Outer = styled.div`
  flex: 1;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
    position: relative;
    user-select: none;
    text-shadow: 0 1px 3px rgba(0, 0, 0, .5);
  }

  ${({ active }) => active && css`
    ::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      background: rgba(255, 255, 255, .15);
      border: 4px solid ${({ theme }) => theme.colors.primary};
      animation: ${blinkAnimation} 1s ease;
    }
  `}
`

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: .4;

  background-size: cover;
  background-position: center;
`

export default function Contender ({ track, isVoted, onClick }) {
  const { id, name } = track

  return (
    <Outer onClick={() => onClick(id)} active={isVoted}>
      <Background style={{ backgroundImage: `url(${getAlbumCover(track)})` }} />
      <Typography reverse variant='display2'>{name}</Typography>
      <Typography reverse type='secondary'>
        {getArtistsAsHumanFormat(track)}
      </Typography>
    </Outer>
  )
}

Contender.propTypes = {
  track: SpotifyTrack.isRequired,
  isVoted: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}
