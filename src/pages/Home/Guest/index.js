import React, { Component } from 'react'
import TextField from 'components/TextField'
import Grid from 'components/Grid'
import { Button } from 'components/Button'

export default class Guest extends Component {
  state = {
    party: '',
    password: ''
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
          <Button variant='primary'>Join party</Button>
        </Grid>
      </div>
    )
  }
}
