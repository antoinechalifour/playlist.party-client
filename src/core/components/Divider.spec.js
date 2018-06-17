import React from 'react'
import renderer from 'react-test-renderer'
import Divider from './Divider'
import 'jest-styled-components'

describe('Divider', () => {
  it('Should render a divider', () => {
    const tree = renderer.create(<Divider />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
