import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { isPlayerAvailable, getContenders } from 'host/reducers'
import Player from 'host/components/Player'
import Contender from './Contender'
import Background from './Background'
import Battle from './Battle'

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
  align-items: center;
  justify-content: center;
`

function Party ({ isPlayerAvailable, contenders }) {
  const [contender1, contender2] = contenders

  return (
    <Outer>
      <Background sources={contenders.map(x => x.album.images[0].url)} />
      {isPlayerAvailable && <Player />}

      <Main>
        {contender1
          ? <Contender {...contender1} />
          : <div style={{ width: '250px' }} />}
        <Battle />
        {contender2
          ? <Contender {...contender2} />
          : <div style={{ width: '250px' }} />}
      </Main>
    </Outer>
  )
}

Party.propTypes = {
  isPlayerAvailable: PropTypes.bool.isRequired,
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
  contenders: getContenders(state)
}))(Party)
