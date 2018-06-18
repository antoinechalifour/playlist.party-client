import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'core/components/Button'
import * as actions from 'host/actions/party'
import { getPartyStatus, getContenders } from 'host/reducers'
import {
  STATUS_WAITING_FOR_TRACKS,
  STATUS_WAITING_TO_START,
  STATUS_STARTED
} from 'host/reducers/party'

const Wrapper = styled.div`
  position: relative;
  text-align: center;

  color: #fff;
  padding: 12px;
`

const WaitingForTracks = connect(state => ({
  contenders: getContenders(state)
}))(({ contenders }) => `Waiting for ${2 - contenders.length} more tracks...`)

const WaitingToStart = connect(null, dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(({ actions }) => (
  <Button variant='primary' onClick={actions.startParty}>
    Start partying!
  </Button>
))

const PartyStarted = () => `Grab your phone and add your favorite tracks!`

function MessageDelegate ({ status }) {
  return (
    <Wrapper>
      {(function () {
        switch (status) {
          case STATUS_WAITING_FOR_TRACKS:
            return <WaitingForTracks />

          case STATUS_WAITING_TO_START:
            return <WaitingToStart />

          case STATUS_STARTED:
            return <PartyStarted />

          default:
            return null
        }
      })()}
    </Wrapper>
  )
}

MessageDelegate.propTypes = {
  status: PropTypes.string.isRequired
}

export default connect(state => ({
  status: getPartyStatus(state)
}))(MessageDelegate)
