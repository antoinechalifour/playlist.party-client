import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card, { CardContent, CardActions } from 'core/components/Card'
import TextField from 'core/components/TextField'
import { Button } from 'core/components/Button'

const Outer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .75);

  display: flex;
  align-items: center;
  justify-content: center;
`

export default class UserModal extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired
  }

  state = { username: '' }

  onUsernameChange = username => this.setState({ username })

  render () {
    return (
      <Outer>
        <Card>
          <CardContent>
            <TextField
              label='My username'
              name='username'
              value={this.state.username}
              onChange={this.onUsernameChange}
            />
            <CardActions>
              <Button onClick={this.props.onDismiss}>Cancel</Button>
              <Button
                variant='primary'
                onClick={() => this.props.onSave(this.state.username)}
              >
                Save
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Outer>
    )
  }
}
