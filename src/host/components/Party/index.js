import React from 'react'
import styled from 'styled-components'
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

export default function Party () {
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
