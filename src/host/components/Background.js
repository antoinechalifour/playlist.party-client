import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as Vibrant from 'node-vibrant'
import { rgb, darken, desaturate } from 'polished'

const Outer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #151515;
`

export default class Background extends Component {
  static propTypes = {
    sources: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  state = { colors: null }

  constructor (props) {
    super(props)

    this.computeColors(props.sources)
  }

  componentDidUpdate (prevProps) {
    const shouldComputeColors = this.props.sources.some(
      (source, i) => source !== prevProps.sources[i]
    )

    if (shouldComputeColors) {
      this.computeColors(this.props.sources)
    }
  }

  async computeColors (sources) {
    const swatches = await Promise.all(
      sources.map(x => Vibrant.from(x).getPalette().then(x => x.Muted))
    )

    const colors = swatches
      .map(x => rgb(Math.floor(x.r), Math.floor(x.g), Math.floor(x.b)))
      .map(darken(0.25))
      .map(desaturate(0.25))

    this.setState({ colors })
  }

  render () {
    if (!this.state.colors) {
      return null
    }

    const background = `linear-gradient(to right, ${this.state.colors.join(', ')})`

    return <Outer style={{ backgroundImage: background }} />
  }
}
