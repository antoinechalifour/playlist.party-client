import React from 'react'
import styled from 'styled-components'
import MdClear from 'react-icons/lib/md/clear'
import Typography from 'core/components/Typography'
import { LinkButton } from 'core/components/Button'

const Outer = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #b44343;

  a {
    color: #fff;
    opacity: .65;
  }
`

const FailedIcon = styled(MdClear)`
  font-size: 256px;
  color: #fff;
  margin-bottom: 24px;
  opacity: .25;
`

export default function InvalidPasscodeScreen () {
  return (
    <Outer>
      <FailedIcon />
      <Typography reverse variant='display1'>Oopsie!</Typography>
      <Typography reverse>
        It looks like someone you entered the wrong pass code.
      </Typography>
      <LinkButton to='/home'>Take me back home</LinkButton>
    </Outer>
  )
}
