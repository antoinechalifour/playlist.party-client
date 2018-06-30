import React, { Component } from 'react'
import qs from 'querystring'
import styled from 'styled-components'
import Card, { CardContent, CardActions } from 'core/components/Card'
import Typography from 'core/components/Typography'
import TextField from 'core/components/TextField'
import { ExternalLinkButton, LinkButton } from 'core/components/Button'
import Divider from 'core/components/Divider'
import { formatPartyName } from 'home/helpers/party'

const Outer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${Card} {
    width: 98%;
    max-width: 500px;
    margin: auto;
  }
`

const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
  padding: 16px;
  background: rgba(0, 0, 25, .08);
  font-size: 1.8rem;
  color: rgba(0, 0, 0, .65);
`

export default class App extends Component {
  state = {
    partyName: '',
    partyCode: ''
  }

  get partyUrl () {
    return `/${this.state.partyName}/${this.state.partyCode}`
  }

  get spotifyOauthUrl () {
    const query = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      response_type: 'token',
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      state: qs.stringify({
        party: this.state.partyName,
        code: this.state.partyCode
      }),
      scope: 'streaming user-read-birthdate user-read-email user-read-private'
    }
    return `https://accounts.spotify.com/authorize?${qs.stringify(query)}`
  }

  onPartyNameChange = partyName =>
    this.setState({ partyName: formatPartyName(partyName) })

  render () {
    return (
      <Outer>
        <Card>
          <Title>Playlist party!</Title>

          <CardContent>
            <Typography>
              In order to create a party, you must first login with a Spotify premium account.
            </Typography>
            <Divider />
            <TextField
              label='Party name'
              name='guestname'
              value={this.state.partyName}
              onChange={this.onPartyNameChange}
            />
            <TextField
              label='Pass code'
              name='guestcode'
              value={this.state.partyCode}
              onChange={partyCode => this.setState({ partyCode })}
            />
            <CardActions>
              <LinkButton variant='secondary' to={this.partyUrl}>
                Join a party
              </LinkButton>
              <ExternalLinkButton variant='primary' href={this.spotifyOauthUrl}>
                Create a party
              </ExternalLinkButton>
            </CardActions>
          </CardContent>
        </Card>
      </Outer>
    )
  }
}
