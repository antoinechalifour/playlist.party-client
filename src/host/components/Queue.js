import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import Typography from 'core/components/Typography'
import { getQueue } from 'host/reducers'

const Title = styled(Typography).attrs({
  reverse: true,
  variant: 'display2'
})`
  text-align: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, .15);
`

const Outer = styled.div`
  position: relative;
  background: rgba(0, 0, 0, .9);
  padding: 12px;
  width: 250px;
`

const trackEnterAnimation = keyframes`
  from {
    transform: translateY(15px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const Track = styled.li`
  display: flex;
  animation: ${trackEnterAnimation} 1s ease;

  + li {
    margin-top: 12px;
  }

  > div {
    overflow: hidden;
  }

  p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const Cover = styled.img`
  width: 55px;
  align-self: center;
  margin-right: 8px;
`

function Queue ({ tracks }) {
  if (tracks.length === 0) {
    return null
  }

  return (
    <Outer>
      <Title>Up next</Title>
      <ul>
        {tracks.map(track => (
          <Track key={track.id}>
            <Cover src={track.album.images[0].url} />
            <div>
              <Typography reverse>{track.name}</Typography>
              <Typography reverse type='secondary'>
                {track.artists.map(x => x.name).join(', ')}
              </Typography>
            </div>
          </Track>
        ))}
      </ul>
    </Outer>
  )
}

Queue.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      album: PropTypes.shape({
        images: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired
          })
        ).isRequired
      }).isRequired,
      artists: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      )
    })
  ).isRequired
}

export default connect(state => ({
  tracks: getQueue(state)
}))(Queue)
