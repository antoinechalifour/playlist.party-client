import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Typography from 'core/components/Typography'

const Outer = styled.div`
  text-align: center;
  width: 250px;
  position: relative;
  
  p {
    text-shadow: 0 1px 3px rgba(0, 0, 0, .5);
  }
`

const Cover = styled.img`
  display: block;
  margin: auto;
  width: 100%;
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, .35);
`

const Information = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
`

export default function Contender ({ name, album, artists }) {
  return (
    <Outer>
      <Cover src={album.images[0].url} />
      <Information>
        <Typography reverse variant='display2'>{name}</Typography>
        <Typography reverse type='secondary'>
          {artists.map(x => x.name).join(', ')}
        </Typography>
      </Information>
    </Outer>
  )
}

Contender.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  album: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  artists: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired })
  ).isRequired
}
