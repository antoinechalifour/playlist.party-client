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

const Outer = styled.div`
  background: #212121;
  color: #fff;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .35);

  img {
    max-width: 75px;
    margin-right: 12px;
  }
`

const Progress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: #1db954;
  width: 0;
  transition: width .2s ease;
`

function Player ({ track, album, artists, progress }) {
  return (
    <Outer>
      <img src={album.cover} />
      <div>
        <Typography reverse>{track.name}</Typography>
        <Typography reverse type='secondary'>
          {artists.map(x => x.name).join(', ')}
        </Typography>
      </div>
      <Progress style={{ width: `${progress * 100}%` }} />
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
