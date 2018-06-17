import React from 'react'
import renderer from 'react-test-renderer'
import Card, { CardContent, CardActions } from './Card'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'

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

describe('Card', () => {
  it('Should render a Card', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Card>
            <CardContent>
              <p>This is my test card content</p>
            </CardContent>
            <CardActions>
              <button>Click me!</button>
            </CardActions>
          </Card>
        </ThemeProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
