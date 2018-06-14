import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Typography from 'core/components/Typography'
import { getVoteProgress } from 'host/reducers'

const Outer = styled.div`
  text-align: center;
  padding: 16px;
  position: relative;
  
  p {
    text-shadow: 0 1px 3px rgba(0, 0, 0, .5);
  }
`

const Cover = styled.img`
  display: block;
  margin: auto;
  width: 80%;
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, .35);
  transform: scale(1);
`

const Information = styled.div`
  text-align: center;
`

function Contender ({ name, album, artists, voteProgress }) {
  const factor = 0.3 + voteProgress * 0.7
  const transform = `scale(${factor})`
  return (
    <Outer>
      <Cover
        src={album.images[0].url}
        style={{
          transition: 'transform .2s ease',
          transform
        }}
      />
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
  ).isRequired,
  voteProgress: PropTypes.number.isRequired
}

export default connect((state, props) => ({
  voteProgress: getVoteProgress(props.id, state)
}))(Contender)
