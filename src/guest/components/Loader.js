import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

const Box = styled.div`
  width: 40px;
  margin-left: auto;
  margin-right: auto;
`

const Wrapper = styled.div`
  position: relative;

  padding-bottom: 80%;
`

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: space-between;

  > * {
    background: ${({ color }) => color};
  }
`

const animation = keyframes`
  0% {
    opacity: 1;
    transform: scaleY(1.0);
  }
  50% {
    opacity: 0.7;
    transform: scaleY(0.4);
  }
  100% {
    opacity: 1;
    transform: scaleY(1.0);
  }
`

const Bar = styled.div`
  width: 10%;
  animation: ${animation} 1s ease-in-out infinite;
`

export default function Loader ({ className, color }) {
  // eslint-disable-next-line
  const bars = Array.from([, , , ,], (_, index) => (
    <Bar key={index} style={{ animationDelay: `.${index}s` }} />
  ))
  return (
    <Box className={`loader ${className}`}>
      <Wrapper>
        <Container color={color}>

          {bars}
        </Container>
      </Wrapper>
    </Box>
  )
}

Loader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string.isRequired
}

Loader.defaultProps = {
  color: '#fff'
}
