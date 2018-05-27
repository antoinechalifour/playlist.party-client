import React from 'react'
import PropTypes from 'prop-types'
import SectionTitle from 'components/SectionTitle'
import Section from 'components/Section'

export default function Guests ({ guests }) {
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
