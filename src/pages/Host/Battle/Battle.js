import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TrackInfo from './TrackInfo'
import TrackCover from './TrackCover'

const Wrapper = styled.div`
  background: #fff;
  color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .5);
  padding: 24px;
  margin-top: -24px;
  margin-bottom: -24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    position: relative;
  }

  > :nth-child(2) {
    text-align: right;
  }
`

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #151515;

  > div {
    opacity: .1;
    filter: blur(10px);
  }
`

const Covers = styled.div`
  position: relative;
  padding-bottom: 100%;
  border-radius: 4px;
  overflow: hidden;
`

const BattleWrapper = styled.div`
  flex: 1;
  max-width: 50%;
`

export default function Battle ({ battle }) {
  const [track1, track2] = battle
  const isBattleEmpty = !track1 && !track2
  let totalVotes = 0

  if (track1) {
    totalVotes += track1.votes.length
  }

  if (track2) {
    totalVotes += track2.votes.length
  }

  return (
    <Wrapper>
      <Background>
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
      </Background>
      <TrackInfo track={battle[0]} />

      <BattleWrapper>
        <Covers>
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
        </Covers>
      </BattleWrapper>

      <TrackInfo track={battle[1]} />
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

Battle.propTypes = {
  battle: PropTypes.arrayOf(TrackType).isRequired
}
