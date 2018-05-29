import React, { Component } from 'react'
import qs from 'querystring'
import TextField from 'core/components/TextField'
import Grid from 'core/components/Grid'
import { LinkButton } from 'core/components/Button'

export default class Guest extends Component {
  state = {
    party: '',
    code: ''
  }

  get url () {
    const params = {
      party: this.state.party,
      code: this.state.code
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
          label='Pass code'
          name='code'
          value={this.state.code}
          onChange={code => this.setState({ code })}
          type='text'
        />
        <Grid justify='flex-end'>
          <LinkButton to={this.url} variant='primary'>Join party</LinkButton>
        </Grid>
      </div>
    )
  }
}
