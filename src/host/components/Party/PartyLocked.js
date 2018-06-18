import React from 'react'
import styled from 'styled-components'
import MdLock from 'react-icons/lib/md/lock-outline'
import Typography from 'core/components/Typography'
import { LinkButton } from 'core/components/Button'

const Outer = styled.div`
  flex: 1;

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

const LockIcon = styled(MdLock)`
  font-size: 256px;
  color: #fff;
  margin-bottom: 24px;
  opacity: .25;
`

export default function PartyLocked () {
  return (
    <Outer>
      <LockIcon />
      <Typography reverse variant='display1'>Oopsie!</Typography>
      <Typography reverse>
        It looks like someone else is using this party name.
      </Typography>
      <LinkButton to='/home'>Take me back home</LinkButton>
    </Outer>
  )
}
