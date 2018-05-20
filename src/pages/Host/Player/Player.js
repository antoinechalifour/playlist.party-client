import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Grid from 'components/Grid'
import Typography from 'components/Typography'

const Empty = styled(Grid)`
  background: rgba(0, 0, 0, .05);
`

const Wrapper = styled(Grid)`
  position: relative;
  background: ${({ theme }) => theme.colors.dark};
`

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  background: url(${({ cover }) => cover});
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  opacity: 0.15;
`

const Content = styled.div`
  position: relative;
  text-align: center;
  color: #fff;
`

const AlbumCover = styled.img`
  max-width: 250px;
  display: block;
  margin: 32px auto;
  border-radius: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .75);
`

const SongTitle = styled(Typography)`
  color: #fff;
  margin: 16px auto;
`

const Artists = styled.p`
  color: #fff;
  opacity: .65;
`

export default function Player ({ playerState }) {
  if (playerState === null) {
    return (
      <Empty align='center' justify='center'>
        <Typography type='light'>No music playing atm.</Typography>
      </Empty>
    )
  }
  const { current_track } = playerState.track_window

  return (
    <Wrapper align='center' justify='center'>
      <Content>
        <AlbumCover src={current_track.album.images[0].url} />
        <SongTitle variant='display1'>{current_track.name}</SongTitle>
        <Artists>
          {current_track.artists.map(x => x.name).join(' • ')}
        </Artists>
      </Content>
      <Background cover={current_track.album.images[0].url} />
    </Wrapper>
  )
}

Player.propTypes = {
  playerState: PropTypes.shape({
    paused: PropTypes.bool.isRequired,
    position: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    track_window: PropTypes.shape({
      current_track: PropTypes.shape({
        album: PropTypes.shape({
          name: PropTypes.string.isRequired,
          images: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string.isRequired
            })
          ).isRequired
        }).isRequired,
        artists: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired
          })
        ).isRequired,
        duration_ms: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired
      })
    }).isRequired
  }).isRequired
}
