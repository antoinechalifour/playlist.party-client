import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { isPartyLocked } from 'host/reducers'
import PartyLocked from './PartyLocked'
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

function PartyDelegate ({ isLocked }) {
  if (isLocked) {
    return <PartyLocked />
  } else {
    return <Party />
  }
}

PartyDelegate.propTypes = {
  isLocked: PropTypes.bool.isRequired
}

export default connect(state => ({
  isLocked: isPartyLocked(state)
}))(PartyDelegate)
