import styled from 'styled-components'

const Card = styled.div`
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .25);
  border-radius: 4px;
  box-sizing: border-box;
`

export const CardContent = styled.div`
  padding: 16px;
  color: ${({ theme }) => theme.colors.typography};
`

export const CardActions = styled.div`
  text-align: right;
  padding: 24px 0;

  > * + * {
    margin-left: 8px;
  }
`

export default Card
