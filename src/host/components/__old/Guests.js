import React from 'react'
import PropTypes from 'prop-types'
import SectionTitle from 'core/components/SectionTitle'
import Section from 'core/components/Section'
import { connectToHost } from './providers/Host'

function Guests ({ guests }) {
  return (
    <Section>
      <SectionTitle>Guests</SectionTitle>
      <ul>
        {guests.map(x => <li>{x.name || 'Anonymous'}</li>)}
      </ul>
    </Section>
  )
}

Guests.propTypes = {
  guests: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ).isRequired
}

export default connectToHost(Guests, state => ({
  guests: state.guests
}))
