import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/party'

function StartPartyButton ({ startParty }) {
  return (
    <div>
      <button onClick={startParty}>Start</button>
    </div>
  )
}

StartPartyButton.propTypes = {
  startParty: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(null, mapDispatchToProps)(StartPartyButton)
