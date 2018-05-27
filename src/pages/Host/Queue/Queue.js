import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Section from 'components/Section'
import SectionTitle from 'components/SectionTitle'

const Track = styled.li`
  padding: 4px 0;

  div:last-child {
    opacity: .65;
    font-size: 80%;
  }
`

export default function Queue ({ battle, queue }) {
  return (
    <Section>
      <SectionTitle>Up next</SectionTitle>
      <ul>
        {queue.map(({ track }) => (
          <Track key={track.id}>
            <div>{track.name}</div>
            <div>{track.artists.map(x => x.name).join(',')}</div>
          </Track>
        ))}
      </ul>
    </Section>
  )
}

const TrackType = PropTypes.shape({
  track: PropTypes.shape({
    album: PropTypes.shape({
      name: PropTypes.string.isRequired,
      images: PropTypes.arrayOf({
        url: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    artists: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  votes: PropTypes.arrayOf(PropTypes.string).isRequired
})

Queue.propTypes = {
  queue: PropTypes.arrayOf(TrackType).isRequired
}
