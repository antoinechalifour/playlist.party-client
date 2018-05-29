import React, { Component } from 'react'
import qs from 'querystring'
import TextField from 'core/components/TextField'
import Typography from 'core/components/Typography'
import Grid from 'core/components/Grid'
import { Button } from 'core/components/Button'

export default class PartyDetail extends Component {
  state = {
    party: '',
    code: ''
  }

  constructor (props) {
    super(props)

    const params = qs.parse(window.location.hash.substr(1))

    this.accessToken = params.access_token
  }

  handleSubmit = e => {
    e.preventDefault()
    const params = {
      accessToken: this.accessToken,
      party: this.state.party,
      code: this.state.code
    }

    const uri = `/host?${qs.stringify(params)}`
    this.props.history.push(uri)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <Typography>
          Playlist.party has been linked to your Spotify account! You may now create your party.
        </Typography>
        <TextField
          label='Party name'
          name='party'
          value={this.state.party}
          onChange={party => this.setState({ party })}
        />
        <TextField
          label='Pass code'
          name='code'
          value={this.state.code}
          onChange={code => this.setState({ code })}
        />

        <Grid justify='flex-end'>
          <Button type='submit' variant='primary'>Let's go!</Button>
        </Grid>
      </form>
    )
  }
}
