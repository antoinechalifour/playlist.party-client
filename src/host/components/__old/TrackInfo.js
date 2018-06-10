import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Typography from 'core/components/Typography'

const Wrapper = styled.div`
  padding: 16px;
  text-align: center;
`

const TrackName = styled(Typography)`
  margin: 12px 0;
`

const AlbumCover = styled.img`
  display: block;
  width: 150px;
  margin: auto;
`

export default function TrackInfo ({ track }) {
  if (!track) {
    return <div>todo: empty state</div>
  }

  const artistsNames = track.track.artists.map(x => x.name)

  return (
    <Wrapper>
      <AlbumCover src={track.track.album.images[0].url} />
      <TrackName reverse variant='display2'>{track.track.name}</TrackName>
      <Typography reverse type='secondary'>
        {artistsNames.join(', ')}
      </Typography>
    </Wrapper>
  )
}

TrackInfo.propTypes = {
  track: PropTypes.shape({
    track: PropTypes.shape({
      name: PropTypes.string.isRequired,
      artists: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired
        })
      ).isRequired,
      album: PropTypes.shape({
        images: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired
          })
        ).isRequired
      }).isRequired
    }).isRequired
  })
}
