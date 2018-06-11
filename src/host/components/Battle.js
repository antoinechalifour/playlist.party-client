import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getContenders } from 'host/reducers'

const CoversContainer = styled.div`
  position: relative;
  width: 500px;
  padding-bottom: 100%;
  background: #151515;
  border: 6px solid rgba(0, 0, 0, .5);
  border-radius: 100%;
  overflow: hidden;
`

const Cover = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  object-fit: cover;
  transition: width .2s ease;
`

const Link = styled.div`
  height: 6px;
  background: rgba(0, 0, 0, .5);;
  width: 100px;
  flex: 0;
  flex-basis: 100px;
`

function Battle ({ contenders }) {
  const totalVotes = contenders.reduce((sum, x) => sum + x.votes.length, 0)
  const covers = contenders.map(x => {
    return {
      image: x.album.images[0].url,
      width: totalVotes === 0 ? 0.5 : x.votes.length / totalVotes
    }
  })

  return (
    <Fragment>
      <Link />
      <div>
        <CoversContainer>
          {covers.map((x, index) => {
            const align = index === 1 ? 'right' : 'left'
            const style = {
              [align]: 0,
              backgroundPosition: `${align} center`,
              backgroundImage: `url(${x.image})`,
              width: `${x.width * 100}%`
            }
            return <Cover style={style} />
          })}
        </CoversContainer>
      </div>
      <Link />
    </Fragment>
  )
}

export default connect(state => ({
  contenders: getContenders(state)
}))(Battle)
