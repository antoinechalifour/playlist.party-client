import React from 'react'
import renderer from 'react-test-renderer'
import Typography from './Typography'
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

describe('Typography', () => {
  it('Should render default typography', () => {
    const tree = renderer
      .create(<Typography theme={theme}>Hello world :D</Typography>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Should render secondary typography', () => {
    const tree = renderer
      .create(
        <Typography type='secondary' theme={theme}>Hello world :D</Typography>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  const reverse = [true, false]
  const types = ['default', 'secondary']
  const variants = ['default', 'display1', 'display2', 'h2']

  reverse.forEach(isReverse =>
    types.forEach(type =>
      variants.forEach(variant =>
        it(`Should render ${isReverse ? 'reverse' : 'normal'} ${type} ${variant} typography`, () => {
          const tree = renderer
            .create(
              <Typography
                theme={theme}
                reverse={isReverse}
                type={type}
                variant={variant}
              >
                Hello world ;)
              </Typography>
            )
            .toJSON()

          expect(tree).toMatchSnapshot()
        })
      )
    )
  )
})
