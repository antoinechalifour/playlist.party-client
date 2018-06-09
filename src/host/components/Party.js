import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Player from 'host/components/Player'
import { isPlayerAvailable } from 'host/reducers'

function Party ({ isPlayerAvailable }) {
  return (
    <div>
      {isPlayerAvailable && <Player />}
    </div>
  )
}

Party.propTypes = {
  isPlayerAvailable: PropTypes.bool.isRequired
}

export default connect(state => ({
  isPlayerAvailable: isPlayerAvailable(state)
}))(Party)
