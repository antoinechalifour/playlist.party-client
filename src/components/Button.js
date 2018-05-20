import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const typeThemes = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.typography};
    box-shadow: 0 1px 6px rgba(0, 0, 0, .45);
    text-decoration: none;
  `,
  secondary: css`
    color: ${({ theme }) => theme.colors.typography};
    box-shadow: 0 1px 6px rgba(0, 0, 0, .35);
    text-decoration: none;
  `,
  tertiary: css`
    color: ${({ theme }) => theme.colors.typography};
    text-decoration: underline;
  `
}

export const Button = styled.button`
  padding: 12px 16px;
  cursor: pointer;
  font-size: inherit;
  background: none;
  border-radius: 4px;

  ${({ variant }) => typeThemes[variant]}
`

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary'])
}

Button.defaultProps = {
  variant: 'tertiary'
}

export const LinkButton = Button.withComponent(Link)

export const ExternalLinkButton = Button.withComponent('a')
