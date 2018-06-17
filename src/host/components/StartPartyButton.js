import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'core/components/Button'
import * as actions from '../actions/party'
import { isPartyReady } from 'host/reducers'

function StartPartyButton ({ disabled, text, startParty }) {
  return (
    <Button disabled={disabled} variant='primary' onClick={startParty}>
      {text}
    </Button>
  )
}

StartPartyButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  startParty: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const isDisabled = !isPartyReady(state)
  const text = isDisabled ? 'Waiting for tracks...' : 'Start partying!'

  return {
    disabled: isDisabled,
    text
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StartPartyButton)
