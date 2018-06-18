import React from 'react'
import styled from 'styled-components'
import Typography from 'core/components/Typography'
import Loader from 'guest/components/Loader'

const Wrapper = styled.div`
  height: 100vh;
  padding: 12px;

  background: #151515;
  color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .loader {
    margin-bottom: 24px;
  }
`

export default function LoadingScreen () {
  return (
    <Wrapper>
      <Loader />
      <Typography reverse>Connecting to party...</Typography>
    </Wrapper>
  )
}
