import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TrackCover from './TrackCover'

const Wrapper = styled.div`
  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #151515;

  > div {
    opacity: .05;
    filter: blur(10px);
  }
`

export default function BattleBackground ({ track1, track2 }) {
  let totalVotes = 0

  if (track1) {
    totalVotes += track1.votes.length
  }

  if (track2) {
    totalVotes += track2.votes.length
  }

  return (
    <Wrapper>
      {track1 &&
        <TrackCover
          cover={track1.track.album.images[0].url}
          votes={track1.votes.length}
          totalVotes={totalVotes}
          align='left'
        />}
      {track2 &&
        <TrackCover
          cover={track2.track.album.images[0].url}
          votes={track2.votes.length}
          totalVotes={totalVotes}
          align='right'
        />}
    </Wrapper>
  )
}

const TrackType = PropTypes.shape({
  track: PropTypes.shape({
    album: PropTypes.shape({
      name: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired
        }).isRequired
      ).isRequired
    }).isRequired,
    artists: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  votes: PropTypes.arrayOf(PropTypes.string).isRequired
})

BattleBackground.propTypes = {
  track1: TrackType,
  track2: TrackType
}
