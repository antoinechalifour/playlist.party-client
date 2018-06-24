import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { isPartyLocked, isPartyOver } from 'host/reducers'
import PartyLocked from './PartyLocked'
import PartyOver from './PartyOver'
import Background from './Background'
import Contenders from './Contenders'
import Message from './Message'
import Queue from './Queue'

const Wrapper = styled.div`
  flex: 1;

  display: flex;
  position: relative;
`

const Main = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  position: relative;
`

function Party () {
  return (
    <Wrapper>
      <Background />
      <Main>
        <Contenders />
        <Message />
      </Main>
      <Queue />
    </Wrapper>
  )
}

function PartyDelegate ({ isLocked, isOver }) {
  if (isLocked) {
    return <PartyLocked />
  } else if (isOver) {
    return <PartyOver />
  } else {
    return <Party />
  }
}

PartyDelegate.propTypes = {
  isLocked: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired
}

export default connect(state => ({
  isLocked: isPartyLocked(state),
  isOver: isPartyOver(state)
}))(PartyDelegate)
