import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 24px;
  padding-top: 48px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .5);
  background: ${({ theme }) => theme.colors.dark};
  color: #fff;
`

export default function Player () {
  return (
    <Wrapper>
      player here
    </Wrapper>
  )
}
