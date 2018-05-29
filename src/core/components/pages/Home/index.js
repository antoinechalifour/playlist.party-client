import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Card, { CardContent } from 'core/components/Card'
import Grid from 'core/components/Grid'
import { LinkButton } from 'core/components/Button'
import Guest from './Guest'
import Host from './Host'

const Wrapper = styled(Grid)`
  min-height: 100vh;
  background: #151515;
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    top: 50%;
    left: 0;
    right: 0;
    background: #151515;
    opacity: .8;
    box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.25);
  }
`

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url(https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1526f9922846871b29cbdacf259c5449&auto=format&fit=crop&w=1267&q=80);
  background-size: cover;
  opacity: .05;
`

const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
  padding: 16px;
  background: rgba(0, 0, 25, .08);
  font-size: 1.8rem;
  color: rgba(0, 0, 0, .65);
`

const Content = styled.div`
  margin: 0 auto;
  width: 98%;
  max-width: 600px;
  position: relative;
  z-index: 1;

  a {
    margin-top: 24px;
    margin-bottom: 24px;
  }
`

export default function Home () {
  return (
    <Wrapper align='center' justify='center'>
      <Background />
      <Content>
        <Card>
          <Title>Playlist party</Title>
          <CardContent>
            <Switch>
              <Route path='/home/login/guest' component={Guest} />
              <Route path='/home/login/host' component={Host} />
              <Grid justify='center'>
                <LinkButton variant='primary' to='/home/login/guest'>
                  Join a party
                </LinkButton>
                <LinkButton variant='secondary' to='/home/login/host'>
                  Create a party
                </LinkButton>
              </Grid>
            </Switch>
          </CardContent>
        </Card>
      </Content>

    </Wrapper>
  )
}
