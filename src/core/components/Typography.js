import styled, { css } from 'styled-components'

const typographyThemes = {
  default: css`
    color: ${({ theme }) => theme.colors.typography};
  `,
  light: css`
    color: ${({ theme }) => theme.colors.typographyLight};
  `
}

const variantThemes = {
  default: css``,
  display1: css`
    font-size: 2.5rem;
  `
}

const Typography = styled.p`
  line-height: 1.6;
  
  ${({ type }) => typographyThemes[type]}
  ${({ variant }) => variantThemes[variant]}
`

Typography.defaultProps = {
  type: 'default',
  variant: 'default'
}

export default Typography
