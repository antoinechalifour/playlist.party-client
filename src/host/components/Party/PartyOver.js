import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getTracksSummary, getGuests, getBestDJs } from 'host/reducers'
import Typography from 'core/components/Typography'
import {
  getAlbumCover,
  getArtistsAsHumanFormat,
  getCoverAlt
} from 'core/helpers/tracks'
import { GuestPropType } from 'host/propTypes'
import Podium from 'host/components/Party/Podium'

const Outer = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 24px 0;

  background: #151515;
  text-align: center;
`

const Title = styled(Typography).attrs({
  reverse: true,
  variant: 'display1'
})`
  margin: 32px auto;
`

const Headline = styled.div`
  margin: 24px 0;
  padding: 12px;
  background: ${({ theme }) => theme.colors.primary};
`

const Battle = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`

const BattleResult = styled.div`
  flex: 1;

  position: relative;
  height: 8px;
  margin-left: 12px;
  margin-right: 12px;
  border-radius: 10px;
  overflow: hidden;

  background: #e14159;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    ${({ align }) => align}: 0;
    width: ${({ approval }) => `${Math.min(approval * 100, 98)}%`};
    background: ${({ theme }) => theme.colors.primary};
  }
`

const Track = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  padding: 24px 0;
  opacity: ${({ isWinner }) => (isWinner ? 1 : 0.45)};

  > div {
    text-align: ${({ align }) => align};
    flex: 1;
    padding: 0 12px;
  }

  img {
    height: 75px;
  }
`

const NoContender = styled.div`
  flex: 2;
  text-align: left;
`

const Guests = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 700px;
  margin: auto;

  > div {
    flex: 0 0 200px;
    text-align; center;
  }
`

const LetterAvatar = styled.div`
  margin: auto;
  height: 64px;
  width: 64px;
  border-radius: 100%;
  margin-bottom: 12px;
  background: #fff;;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`

const GuestName = styled(Typography).attrs({
  reverse: true
})`
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

function PartyOver ({ scores, guests, summary }) {
  const bestDjs = []

  for (let i = 0; i < 3; i += 1) {
    bestDjs.push(scores[i] || null)
  }

  return (
    <Outer>
      <Title>Party is over!</Title>
      <Headline>
        <Typography variant='display2'>Best DJs</Typography>
      </Headline>

      <Podium guests={bestDjs} />

      <Headline>
        <Typography variant='display2'>Tracks</Typography>
      </Headline>

      <ul>
        {summary.map(tracks => {
          const [track1, track2] = tracks
          const winner = track1.isWinner ? track1 : track2

          return (
            <Battle>
              <Track align='right' isWinner={track1.isWinner}>
                <div>
                  <Typography reverse>{track1.name}</Typography>
                  <Typography reverse type='secondary'>
                    {getArtistsAsHumanFormat(track1)}
                  </Typography>
                </div>
                <img src={getAlbumCover(track1)} alt={getCoverAlt(track1)} />
              </Track>

              <BattleResult
                align={track1.isWinner ? 'left' : 'right'}
                approval={winner.approvalRate}
              />

              {track2
                ? <Track align='left' isWinner={track2.isWinner}>
                  <img
                    src={getAlbumCover(track2)}
                    alt={getCoverAlt(track2)}
                    />
                  <div>
                    <Typography reverse>{track2.name}</Typography>
                    <Typography reverse type='secondary'>
                      {getArtistsAsHumanFormat(track2)}
                    </Typography>
                  </div>
                </Track>
                : <NoContender>
                  <Typography reverse type='secondary'>
                      No contender
                    </Typography>
                </NoContender>}
            </Battle>
          )
        })}
      </ul>

      <Headline>
        <Typography variant='display2'>Guests</Typography>
      </Headline>

      <Guests>
        {guests.map(x => (
          <div>
            <LetterAvatar>{x.name[0]}</LetterAvatar>
            <GuestName>{x.name}</GuestName>
          </div>
        ))}
      </Guests>
    </Outer>
  )
}

PartyOver.propTypes = {
  summary: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
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
        isWinner: PropTypes.bool.isRequired,
        approvalRate: PropTypes.number.isRequired
      })
    )
  ),
  guests: PropTypes.arrayOf(GuestPropType).isRequired,
  scores: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
  })
}

export default connect(state => ({
  guests: getGuests(state),
  summary: getTracksSummary(state),
  scores: getBestDJs(state)
}))(PartyOver)
