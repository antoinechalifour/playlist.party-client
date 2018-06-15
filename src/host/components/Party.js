import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { isPlayerAvailable, getContenders, getParty } from 'host/reducers'
import Header from './Header'
import Player from 'host/components/Player'
import Contender from './Contender'
import Background from './Background'
import StartPartyButton from 'host/components/StartPartyButton'
import Queue from 'host/components/Queue'

const Outer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #151515;
`

const Main = styled.main`
  position: relative;
  flex: 1;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Body = styled.div`
  flex: 1;
  display: flex;
`

function Party ({ isPlayerAvailable, contenders, party }) {
  const [contender1, contender2] = contenders

  return (
    <Outer>
      <Background sources={contenders.map(x => x.album.images[0].url)} />

      <Header />

      <Body>
        <Queue />

        <Main>
          <div>
            {contender1 && <Contender {...contender1} />}
            {contender2 && <Contender {...contender2} />}
          </div>
          {!party.isStarted &&
            <div>
              <StartPartyButton />
            </div>}
        </Main>
      </Body>

      {isPlayerAvailable && <Player />}
    </Outer>
  )
}

Party.propTypes = {
  isPlayerAvailable: PropTypes.bool.isRequired,
  party: PropTypes.shape({
    isStarted: PropTypes.bool.isRequired
  }).isRequired,
  contenders: PropTypes.arrayOf(
    PropTypes.shape({
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
        PropTypes.shape({
          name: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired
}

export default connect(state => ({
  isPlayerAvailable: isPlayerAvailable(state),
  contenders: getContenders(state),
  party: getParty(state)
}))(Party)
