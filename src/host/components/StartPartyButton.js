import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'core/components/Button'
import * as actions from '../actions/party'

function StartPartyButton ({ startParty }) {
  return (
    <Button variant='primary' onClick={startParty}>
      Start partying!
    </Button>
  )
}

StartPartyButton.propTypes = {
  startParty: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(null, mapDispatchToProps)(StartPartyButton)
