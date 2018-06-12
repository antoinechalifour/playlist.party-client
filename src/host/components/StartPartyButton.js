import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import PlayIcon from 'react-icons/lib/md/play-circle-outline'
import * as actions from '../actions/party'

const PlayButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20rem;
  color: #fff;
  line-height: 1;
  opacity: .5;
  transition: opacity .3s ease;
  outline: none;
  box-sizing: border-box;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  :hover {
    opacity: 1;
  }

  svg {
    display: block;
  }
`

function StartPartyButton ({ startParty }) {
  return (
    <PlayButton onClick={startParty}>
      <PlayIcon />
    </PlayButton>
  )
}

StartPartyButton.propTypes = {
  startParty: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(null, mapDispatchToProps)(StartPartyButton)
