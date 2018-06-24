import React from 'react'
import styled from 'styled-components'
import MdRewind from 'react-icons/lib/md/fast-rewind'
import Typography from 'core/components/Typography'
import { LinkButton } from 'core/components/Button'

const Outer = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #151515;

  a {
    color: #fff;
    opacity: .65;
  }
`

const FailedIcon = styled(MdRewind)`
  font-size: 256px;
  color: #fff;
  margin-bottom: 24px;
  opacity: .25;
`

export default function PartyOverScreen () {
  return (
    <Outer>
      <FailedIcon />
      <Typography reverse variant='display1'>Party is over!</Typography>
      <Typography reverse>
        Hope you had fun. See you soon!
      </Typography>
      <LinkButton to='/home'>Take me back home</LinkButton>
    </Outer>
  )
}
