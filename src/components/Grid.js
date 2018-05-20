import styled from 'styled-components'

const Grid = styled.div`
  display: flex;
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};

  > * + * {
    margin-left: 16px;
  }
`

Grid.defaultProps = {
  align: 'flex-start',
  justify: 'flex-start'
}

export default Grid
