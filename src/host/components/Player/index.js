import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isPlayerAvailable } from 'host/reducers'
import Player from './Player'
import Placeholder from './Placeholder'

const PlayerDelegate = ({ isPlayerAvailable }) =>
  (isPlayerAvailable ? <Player /> : <Placeholder />)

PlayerDelegate.propTypes = {
  isPlayerAvailable: PropTypes.bool.isRequired
}

export default connect(state => ({
  isPlayerAvailable: isPlayerAvailable(state)
}))(PlayerDelegate)
