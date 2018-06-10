import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connectToHost } from './providers/Host'
import BattleBackground from './BattleBackground'
import TrackInfo from './TrackInfo'
import TrackCover from './TrackCover'

const Inner = styled.div`
  flex: 1;
  color: #fff;
  padding: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    flex: 1;
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
  max-width: 33%;
`

function Battle ({ battle }) {
  const [track1, track2] = battle
  let totalVotes = 0

  if (track1) {
    totalVotes += track1.votes.length
  }

  if (track2) {
    totalVotes += track2.votes.length
  }

  return (
    <Fragment>
      <BattleBackground track1={track1} track2={track2} />

      <Inner>

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
      </Inner>
    </Fragment>
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

export default connectToHost(Battle, state => ({
  battle: state.queue.filter(x => x.role === 'battle')
}))
