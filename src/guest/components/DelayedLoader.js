import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loader from 'guest/components/Loader'
import styled from 'styled-components'
import Typography from 'core/components/Typography'

const Message = styled(Typography)`
  color: ${({ color }) => color};
  margin-top: 24px;
  text-align: center;
  font-size: 80%;
`

export default class DelayedLoader extends Component {
  static propTypes = {
    delay: PropTypes.number.isRequired,
    color: PropTypes.string,
    message: PropTypes.string
  }

  static defaultProps = {
    delay: 1000,
    color: '#fff'
  }

  constructor (props) {
    super(props)

    this.state = { show: false }

    this.timeout = window.setTimeout(
      () => this.setState({ show: true }),
      this.props.delay
    )
  }

  componentWillUnmount () {
    if (this.timeout) {
      window.clearTimeout(this.timeout)
    }
  }

  render () {
    if (!this.state.show) {
      return null
    }

    return (
      <div>
        <Loader color={this.props.color} />
        {this.props.message &&
          <Message color={this.props.color}>{this.props.message}</Message>}
      </div>
    )
  }
}
