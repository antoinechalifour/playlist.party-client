import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getParty } from 'host/reducers'

const Outer = styled.header`
  position: relative;
  color: #fff;
  background: #050505;
  padding: 12px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .8);
`

function Header ({ party }) {
  return (
    <Outer>
      playlist.party/{party.name}/{party.code}
    </Outer>
  )
}

Header.propTypes = {
  party: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  }).isRequired
}

export default connect(state => ({
  party: getParty(state)
}))(Header)
