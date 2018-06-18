import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  getCurrentTrack,
  getCurrentAlbum,
  getCurrentArtists,
  getProgress
} from 'host/reducers'
import Typography from 'core/components/Typography'
import { Container } from './components'

const Outer = styled(Container)`
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 12px;
  width: 100%;
`

const Cover = styled.img`
  max-width: 75px;
  margin-right: 12px;
`

const Progress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background: ${({ theme }) => theme.colors.primary};
  width: 0;
  transition: width .2s ease;
`

function Player ({ track, album, artists, progress }) {
  return (
    <Outer>
      <Progress style={{ width: `${progress * 100}%` }} />
      <Cover src={album.cover} alt={`Album cover for "${album.name}"`} />
      <div>
        <Typography reverse>{track.name}</Typography>
        <Typography reverse type='secondary'>
          {artists.map(x => x.name).join(', ')}
        </Typography>
      </div>
    </Outer>
  )
}

Player.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  album: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired
  }).isRequired,
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  progress: PropTypes.number.isRequired
}

export default connect(state => ({
  track: getCurrentTrack(state),
  album: getCurrentAlbum(state),
  artists: getCurrentArtists(state),
  progress: getProgress(state)
}))(Player)
