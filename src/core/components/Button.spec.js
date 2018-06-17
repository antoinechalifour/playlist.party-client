import React from 'react'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import { Button, LinkButton, ExternalLinkButton } from './Button'
import 'jest-styled-components'

const theme = {
  colors: {
    dark: '#151515',
    danger: '#a63d40',
    primary: '#1db954',
    confirm: '#90a959',
    accent: '#6494aa',
    typography: '#373d3f',
    typographyLight: '#bcbcbc'
  }
}

describe('Button', () => {
  it('Should render a primary button', () => {
    const tree = renderer
      .create(<Button theme={theme} variant='primary'>Click me!</Button>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should render a secondary button', () => {
    const tree = renderer
      .create(<Button theme={theme} variant='secondary'>Click me!</Button>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should render a tertiary button', () => {
    const tree = renderer
      .create(<Button theme={theme} variant='tertiary'>Click me!</Button>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should render a tertiary button by default', () => {
    const tree = renderer
      .create(<Button theme={theme}>Click me!</Button>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('LinkButton', () => {
  it('Should render a primary button', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <LinkButton theme={theme} variant='primary' to='/'>
            Click me!
          </LinkButton>
        </BrowserRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should render a secondary button', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <LinkButton theme={theme} variant='secondary' to='/'>
            Click me!
          </LinkButton>
        </BrowserRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should render a tertiary button', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <LinkButton theme={theme} variant='tertiary' to='/'>
            Click me!
          </LinkButton>
        </BrowserRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should render a tertiary button by default', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <LinkButton theme={theme} to='/'>Click me!</LinkButton>
        </BrowserRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('ExternalLinkButton', () => {
  it('Should render a primary button', () => {
    const tree = renderer
      .create(
        <ExternalLinkButton href='/test' theme={theme} variant='primary'>
          Click me!
        </ExternalLinkButton>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should render a secondary button', () => {
    const tree = renderer
      .create(
        <ExternalLinkButton href='/test' theme={theme} variant='secondary'>
          Click me!
        </ExternalLinkButton>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should render a tertiary button', () => {
    const tree = renderer
      .create(
        <ExternalLinkButton href='/test' theme={theme} variant='tertiary'>
          Click me!
        </ExternalLinkButton>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should render a tertiary button by default', () => {
    const tree = renderer
      .create(
        <ExternalLinkButton href='/test' theme={theme}>
          Click me!
        </ExternalLinkButton>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
