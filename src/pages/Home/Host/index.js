import React from 'react'
import { Switch, Route } from 'react-router-dom'
import qs from 'querystring'
import Grid from 'components/Grid'
import { ExternalLinkButton } from 'components/Button'
import PartyDetails from './PartyDetails'

export default function Host () {
  const query = {
    client_id: process.env.REACT_APP_CLIENT_ID,
    response_type: 'token',
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    scope: 'streaming user-read-birthdate user-read-email user-read-private'
  }
  return (
    <Switch>
      <Route path='/home/login/host/callback' component={PartyDetails} />
      <Grid justify='center'>
        <ExternalLinkButton
          variant='primary'
          href={`https://accounts.spotify.com/authorize?${qs.stringify(query)}`}
        >
          Login with Spotify
        </ExternalLinkButton>
      </Grid>
    </Switch>
  )
}
