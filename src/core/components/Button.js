import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const typeThemes = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    border: 1px solid rgba(0, 0, 0, .15);
    color: #fff;
    text-decoration: none;
  `,
  secondary: css`
    color: ${({ theme }) => theme.colors.typography};
    border: 1px solid rgba(0, 0, 0, .15);
    text-decoration: none;
  `,
  tertiary: css`
    color: ${({ theme }) => theme.colors.typography};
    text-decoration: underline;
  `
}

export const Button = styled.button`
  display: inline-block;
  font-size: inherit;
  border: none;
  background: none;
  border-radius: 4px;
  text-align: center;
  padding: 12px 16px;
  cursor: pointer;
  min-width: 150px;

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
