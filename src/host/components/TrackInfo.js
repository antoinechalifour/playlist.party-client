import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 16px;
  width: 250px;
`

const TrackName = styled.div`
  font-size: 2rem;
  margin-bottom: 8px;
`

const Artists = styled.div`
  opacity: .65;
`

export default function TrackInfo ({ track }) {
  if (!track) {
    return <div>todo: empty state</div>
  }

  const artistsNames = track.track.artists.map(x => x.name)

  return (
    <Wrapper>
      <TrackName>{track.track.name}</TrackName>
      <Artists>{artistsNames.join(', ')}</Artists>
    </Wrapper>
  )
}
