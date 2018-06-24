import React from 'react'
import styled from 'styled-components'
import Typography from 'core/components/Typography'

const Outer = styled.div`
  position: relative;
  padding-bottom: 25%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: stretch;
`

const Step = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0 8px;
  overflow: hidden;
`

const Bar = styled.div`
  height: ${({ position }) => [25, 75, 50][position]}%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Position = styled.span`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #151515;
  color: #fff;
  border-radius: 100%;
`

const Username = styled(Typography).attrs({ reverse: true })`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 12px;
`

export default function Podium ({ guests }) {
  return (
    <Outer>
      <Wrapper>
        {guests.map((guest, index) => (
          <Step>
            {guest && <Username>{guest.name}</Username>}

            <Bar position={index}>
              <Position>{[3, 1, 2][index]}</Position>
            </Bar>
          </Step>
        ))}
      </Wrapper>
    </Outer>
  )
}
