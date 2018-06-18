import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import MdFullscreenExit from 'react-icons/lib/md/fullscreen-exit'
import MdFullscreen from 'react-icons/lib/md/fullscreen'

const style = css`
  cursor: pointer;
  font-size: 24px;
`

const ExitButton = styled(MdFullscreenExit)`
  ${style}
`

const FsButton = styled(MdFullscreen)`
  ${style}
`

export default class FullscreenButton extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isFullscreen: this.isCurrentlyFullscreen()
    }

    document.onfullscreenchange = this.onfullscreenchange
    document.addEventListener('fullscreenchange', this.onfullscreenchange)
    document.addEventListener('webkitfullscreenchange', this.onfullscreenchange)
    document.addEventListener('mozfullscreenchange', this.onfullscreenchange)
    document.addEventListener('MSFullscreenChange', this.onfullscreenchange)
  }

  onfullscreenchange = () => {
    this.setState({
      isFullscreen: this.isCurrentlyFullscreen()
    })
  }

  requestFullscreen = () => {
    const element = document.querySelector('body')

    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
  }

  exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }

  isCurrentlyFullscreen () {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    )
  }

  isFullscreenAvailable () {
    return (
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    )
  }

  render () {
    if (this.isFullscreenAvailable()) {
      return this.state.isFullscreen
        ? <ExitButton onClick={this.exitFullscreen} />
        : <FsButton onClick={this.requestFullscreen} />
    } else {
      return null
    }
  }
}
