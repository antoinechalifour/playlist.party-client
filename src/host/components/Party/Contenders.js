import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getContenders } from 'host/reducers'
import Contender from './Contender'
import { SpotifyTrack } from 'core/propTypes'

const Wrapper = styled.div`
  flex: 1;

  display: flex;
`

function Contenders ({ contenders }) {
  const _contenders = []

  for (let i = 0; i < 2; i += 1) {
    _contenders.push(contenders[i] || null)
  }

  return (
    <Wrapper>
      {_contenders.map(contender => (
        <Contender
          key={contender ? contender.id : undefined}
          contender={contender}
        />
      ))}
    </Wrapper>
  )
}

Contenders.propTypes = {
  contenders: PropTypes.arrayOf(SpotifyTrack).isRequired
}

export default connect(state => ({
  contenders: getContenders(state)
}))(Contenders)
