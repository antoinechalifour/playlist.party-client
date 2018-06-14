import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getContenders, getParty } from 'host/reducers'
import StartPartyButton from './StartPartyButton'

const CoversContainer = styled.div`
  position: relative;
  width: 500px;
  padding-bottom: 100%;
  background: #151515;
  border: 6px solid rgba(0, 0, 0, .5);
  border-radius: 100%;
  overflow: hidden;
  margin-bottom: 16px;
`

const BattleWrapper = styled.div`
  text-align: center;
`

const Cover = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  object-fit: cover;
  transition: width .2s ease;
`

const Link = styled.div`
  height: 6px;
  background: rgba(0, 0, 0, .5);;
  width: 100px;
  flex: 0;
  flex-basis: 100px;
`

function Battle ({ contenders, party }) {
  const totalVotes = contenders.reduce((sum, x) => sum + x.votes.length, 0)
  const covers = contenders.map(x => {
    return {
      image: x.album.images[0].url,
      width: totalVotes === 0 ? 0.5 : x.votes.length / totalVotes
    }
  })

  return (
    <Fragment>
      {contenders[0] && <Link />}

      <BattleWrapper>
        <CoversContainer>
          {covers.map((x, index) => {
            const align = index === 1 ? 'right' : 'left'
            const style = {
              [align]: 0,
              backgroundPosition: `${align} center`,
              backgroundImage: `url(${x.image})`,
              width: `${x.width * 100}%`
            }
            return <Cover style={style} />
          })}
        </CoversContainer>
        {!party.isStarted && <StartPartyButton />}
      </BattleWrapper>
      {contenders[1] && <Link />}

    </Fragment>
  )
}

Battle.propTypes = {
  contenders: PropTypes.arrayOf(PropTypes.object).isRequired,
  party: PropTypes.shape({
    isStarted: PropTypes.bool.isRequired
  }).isRequired
}

export default connect(state => ({
  contenders: getContenders(state),
  party: getParty(state)
}))(Battle)
