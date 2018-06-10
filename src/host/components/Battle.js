import React, { Fragment } from 'react'
import styled from 'styled-components'

const CoversContainer = styled.div`
  position: relative;
  width: 500px;
  padding-bottom: 100%;
  background: #151515;
  border: 6px solid rgba(0, 0, 0, .5);
  border-radius: 100%;
`

const Link = styled.div`
  height: 6px;
  background: rgba(0, 0, 0, .5);;
  width: 100px;
  flex: 0;
  flex-basis: 100px;
`

export default function Battle () {
  return (
    <Fragment>
      <Link />
      <div>
        <CoversContainer />
      </div>
      <Link />
    </Fragment>
  )
}
