import styled, { css } from 'styled-components'

const typographyThemes = {
  default: css``,
  secondary: css`
    opacity: .65;
  `
}

const variantThemes = {
  default: css``,
  display1: css`
    font-size: 2.5rem;
  `,
  display2: css`
    font-size: 2rem;
  `,
  h2: css`
    font-size: 1.3rem;
    font-weight: bold;
  `
}

const Typography = styled.p`
  line-height: 1.6;
  color: ${({ theme, reverse }) => (reverse ? '#fff' : theme.colors.typography)};

  ${({ type }) => typographyThemes[type]}
  ${({ variant }) => variantThemes[variant]}
`

Typography.defaultProps = {
  reverse: false,
  type: 'default',
  variant: 'default'
}

export default Typography
