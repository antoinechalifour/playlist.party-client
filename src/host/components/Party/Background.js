import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as Vibrant from 'node-vibrant'
import { rgb } from 'polished'
import { getAlbumCover } from 'core/helpers/tracks'
import { getContenders } from 'host/reducers'

const Outer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #0b0b0b;
  transition: background 1s ease;
`

class Background extends Component {
  static propTypes = {
    sources: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  state = { colors: null }

  constructor (props) {
    super(props)

    this.computeColors(props.sources)
  }

  componentDidUpdate (prevProps) {
    const shouldComputeColors =
      prevProps.sources.length !== this.props.sources.length ||
      this.props.sources.some((source, i) => source !== prevProps.sources[i])

    if (shouldComputeColors) {
      this.computeColors(this.props.sources)
    }
  }

  async computeColors (sources) {
    const swatches = (await Promise.all(
      sources.map(x =>
        Vibrant.from(x).getPalette().then(palette => palette.Vibrant)
      )
    ))
      .filter(Boolean)
      .map(x => rgb(Math.floor(x.r), Math.floor(x.g), Math.floor(x.b)))

    const colors = []

    for (let i = 0; i < 2; i += 1) {
      colors[i] = swatches[i] || 'transparent'
    }

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

export default connect(state => ({
  sources: getContenders(state).map(getAlbumCover)
}))(Background)
