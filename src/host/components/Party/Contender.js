import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import Typography from 'core/components/Typography'
import { getVoteProgress } from 'host/reducers'
import { ContenderPropType } from 'host/components/propTypes'

const enterAnimation = keyframes`
  from {
    transform: perspective(500px) translateZ(40px);
  }
  to {
    transform: perspective(500px) translateZ(0px);
  }
`

const BaseWrapper = styled.div`
  flex: 1;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 16px;
`

const BaseTrackName = styled(Typography).attrs({
  reverse: true,
  variant: 'display2'
})``

const BaseArtists = styled(Typography).attrs({
  reverse: true,
  type: 'secondary'
})``

const BaseCover = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  width: 80%;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, .35);
  transition: transform .2s ease;
`

const placeholderComponents = {
  Wrapper: BaseWrapper,
  Cover: BaseCover.extend`
    background: rgba(255, 255, 255, .15);
    padding-bottom: 80%;
    overflow: hidden;

    ::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(-220deg, transparent 50%, rgba(255, 255, 255, .05) 50%);
    }
  `,
  TrackName: BaseTrackName.extend`
    color: transparent;
    text-shadow: 0 0 17px rgba(255, 255, 255, 1);
  `,
  Artists: BaseArtists.extend`
    color: transparent;
    text-shadow: 0 0 17px rgba(255, 255, 255, 1);
  `
}

const contenderComponents = {
  Wrapper: BaseWrapper.extend`
    animation: ${enterAnimation} .5s cubic-bezier(.17,.67,.87,.31);
    
    p {
      text-shadow: 0 1px 3px rgba(0, 0, 0, .5);
    }
  `,
  Cover: BaseCover.withComponent('img').extend`
    display: block;
    transform: scale(1);
  `,
  TrackName: BaseTrackName,
  Artists: BaseArtists
}

function Contender ({ contender, getVoteProgress }) {
  const { Wrapper, Cover, TrackName, Artists } = contender
    ? contenderComponents
    : placeholderComponents

  const voteProgress = contender ? getVoteProgress(contender) : 0.5
  const factor = 0.3 + voteProgress * 0.7
  const transform = `scale(${factor})`

  return (
    <Wrapper>
      <Cover
        src={contender ? contender.album.images[0].url : null}
        style={{ transform }}
      />
      <div>
        <TrackName>
          {contender ? contender.name : 'Lorem Ipsum Dolores'}
        </TrackName>
        <Artists reverse type='secondary'>
          {contender
            ? contender.artists.map(x => x.name).join(', ')
            : 'Lorem Ipsum'}
        </Artists>
      </div>
    </Wrapper>
  )
}

Contender.propTypes = {
  contender: ContenderPropType,
  getVoteProgress: PropTypes.func.isRequired
}

export default connect((state, props) => ({
  getVoteProgress: contender => getVoteProgress(contender.id, state)
}))(Contender)
