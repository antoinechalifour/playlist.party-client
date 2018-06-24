import React from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import MdFav from 'react-icons/lib/md/favorite'
import { getContenders } from 'host/reducers'

const opacityAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const translateAnimation = keyframes`
  from {
    transform: scale(1) translateY(0);
  }
  to {
    transform: scale(0.5) translateY(100px);
  }
`

const Outer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
`

const Zone = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
`

const HeartIcon = styled(MdFav)`
  color: red;
  position: absolute;
  display: inline;
  animation: ${opacityAnimation} 1.5s ease forwards, ${translateAnimation} 1.5s ease forwards;
`

function randomIntFromInterval (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function VoteReactions ({ contenders }) {
  return (
    <Outer>
      {contenders.map((track, index) => (
        <Zone key={track.id} style={{ [index === 0 ? 'left' : 'right']: 0 }}>
          {track.votes.map(x => {
            const r = randomIntFromInterval(0, 255)
            const g = randomIntFromInterval(0, 255)
            const b = randomIntFromInterval(0, 255)

            return (
              <HeartIcon
                key={x}
                style={{
                  fontSize: `${randomIntFromInterval(32, 64)}px`,
                  color: `rgb(${r}, ${g}, ${b})`,
                  top: `${randomIntFromInterval(10, 90)}%`,
                  left: `${randomIntFromInterval(10, 90)}%`
                }}
              />
            )
          })}
        </Zone>
      ))}
    </Outer>
  )
}

export default connect(state => ({
  contenders: getContenders(state)
}))(VoteReactions)
