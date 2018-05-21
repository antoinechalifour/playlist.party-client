import React, { Component } from 'react'
import qs from 'querystring'
import TextField from 'components/TextField'
import Grid from 'components/Grid'
import { LinkButton } from 'components/Button'

export default class Guest extends Component {
  state = {
    party: '',
    password: ''
  }

  get url () {
    const params = {
      party: this.state.party,
      password: this.state.password
    }
    return `/guest?${qs.stringify(params)}`
  }

  render () {
    return (
      <div>
        <TextField
          label='Party name'
          name='party'
          value={this.state.party}
          onChange={party => this.setState({ party })}
        />
        <TextField
          label='Password'
          name='password'
          value={this.state.password}
          onChange={password => this.setState({ password })}
          type='password'
        />
        <Grid justify='flex-end'>
          <LinkButton to={this.url} variant='primary'>Join party</LinkButton>
        </Grid>
      </div>
    )
  }
}
